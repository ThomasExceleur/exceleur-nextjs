#!/usr/bin/env node
/**
 * QA Pipeline Orchestrator
 * Runs all 6 agents in 3 sequential groups, generates consolidated report.
 *
 * Usage:
 *   node scripts/run-qa.mjs                         # Full suite
 *   node scripts/run-qa.mjs --slug=mon-article       # Single article
 *   node scripts/run-qa.mjs --scripts-only            # No WP API calls
 *   node scripts/run-qa.mjs --agent=5                 # Single agent
 *   node scripts/run-qa.mjs --no-html                 # Skip HTML report
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  fetchAllWpPosts, buildWpCategoryMap,
  REPORT_DIR, listMdxFiles, slugFromPath,
} from './agents/utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── CLI Args ───────────────────────────────────────────────────────────────────

function parseOrchestratorArgs() {
  const args = {
    slug: null,
    scriptsOnly: false,
    agent: null,
    noHtml: false,
    help: false,
  };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--slug=')) args.slug = arg.slice(7);
    else if (arg === '--scripts-only') args.scriptsOnly = true;
    else if (arg.startsWith('--agent=')) args.agent = parseInt(arg.slice(8), 10);
    else if (arg === '--no-html') args.noHtml = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

// ─── Agent Registry ─────────────────────────────────────────────────────────────

const AGENTS = [
  { id: 1, name: 'content-diff', file: 'agent1-content-diff.mjs', group: 2, needsWp: true },
  { id: 2, name: 'link-checker', file: 'agent2-link-checker.mjs', group: 3, needsWp: false },
  { id: 3, name: 'seo',          file: 'agent3-seo.mjs',          group: 2, needsWp: true },
  { id: 4, name: 'images',       file: 'agent4-images.mjs',       group: 3, needsWp: false },
  { id: 5, name: 'formatting',   file: 'agent5-formatting.mjs',   group: 1, needsWp: false },
  { id: 6, name: 'routing',      file: 'agent6-routing.mjs',      group: 1, needsWp: false },
];

// ─── Run a single agent ─────────────────────────────────────────────────────────

async function runAgent(agent, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Running Agent ${agent.id}: ${agent.name}`);
  console.log('='.repeat(60));

  try {
    const agentPath = path.join(__dirname, 'agents', agent.file);
    const mod = await import(pathToFileURL(agentPath).href);
    const result = await mod.run(options);
    return { agent: agent.name, ...result };
  } catch (err) {
    console.error(`  Agent ${agent.name} failed: ${err.message}`);
    return {
      agent: agent.name,
      status: 'fail',
      timestamp: new Date().toISOString(),
      summary: { total: 1, fail: 1, warn: 0, info: 0 },
      issues: [{ file: '', check: '', severity: 'fail', message: `Agent crashed: ${err.message}` }],
    };
  }
}

// ─── Consolidate Reports ────────────────────────────────────────────────────────

function consolidate(agentResults) {
  // Overall status
  let overall = 'pass';
  const agents = {};

  for (const r of agentResults) {
    agents[r.agent] = {
      status: r.status,
      issues: r.summary?.total || 0,
    };
    if (r.status === 'fail') overall = 'fail';
    else if (r.status === 'warn' && overall !== 'fail') overall = 'warn';
  }

  // Build per-article health map
  const articles = {};
  for (const r of agentResults) {
    for (const issue of (r.issues || [])) {
      const slug = issue.file ? issue.file.replace('.mdx', '') : '_global';
      if (!articles[slug]) {
        articles[slug] = { status: 'pass', checks: {}, issues: [] };
      }
      articles[slug].issues.push({
        agent: r.agent,
        severity: issue.severity,
        message: issue.message,
        check: issue.check,
      });
      if (issue.severity === 'fail') articles[slug].status = 'fail';
      else if (issue.severity === 'warn' && articles[slug].status !== 'fail') {
        articles[slug].status = 'warn';
      }
      articles[slug].checks[r.agent] = articles[slug].status;
    }
  }

  // Fill in pass status for articles with no issues for a given agent
  const allArticleSlugs = Object.keys(articles);
  for (const slug of allArticleSlugs) {
    for (const r of agentResults) {
      if (!articles[slug].checks[r.agent]) {
        articles[slug].checks[r.agent] = 'pass';
      }
    }
  }

  const mdxFiles = listMdxFiles();

  return {
    timestamp: new Date().toISOString(),
    overall_status: overall,
    summary: {
      total_articles: mdxFiles.length,
      pass: Object.values(articles).filter(a => a.status === 'pass').length,
      warn: Object.values(articles).filter(a => a.status === 'warn').length,
      fail: Object.values(articles).filter(a => a.status === 'fail').length,
    },
    agents,
    articles,
  };
}

// ─── HTML Report ────────────────────────────────────────────────────────────────

function generateHtml(report, agentResults) {
  const statusColor = s => s === 'pass' ? '#22c55e' : s === 'warn' ? '#eab308' : '#ef4444';
  const statusBg = s => s === 'pass' ? '#f0fdf4' : s === 'warn' ? '#fefce8' : '#fef2f2';
  const statusEmoji = s => s === 'pass' ? 'PASS' : s === 'warn' ? 'WARN' : 'FAIL';

  const allIssues = agentResults.flatMap(r =>
    (r.issues || []).map(i => ({ ...i, agent: r.agent }))
  );
  const failIssues = allIssues.filter(i => i.severity === 'fail');
  const warnIssues = allIssues.filter(i => i.severity === 'warn');

  const articleEntries = Object.entries(report.articles)
    .sort(([, a], [, b]) => {
      const order = { fail: 0, warn: 1, pass: 2 };
      return (order[a.status] || 2) - (order[b.status] || 2);
    });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>QA Report — Migration WordPress → Next.js</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.6; }
  .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
  header { background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; padding: 40px 20px; text-align: center; }
  header h1 { font-size: 2rem; margin-bottom: 8px; }
  header p { opacity: 0.8; }
  .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 1.2rem; margin-top: 12px; }
  .counters { display: flex; gap: 20px; justify-content: center; margin-top: 20px; flex-wrap: wrap; }
  .counter { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 12px 24px; border-radius: 12px; text-align: center; }
  .counter .value { font-size: 1.5rem; font-weight: 700; }
  .counter .label { font-size: 0.85rem; opacity: 0.8; }
  section { margin-top: 32px; }
  section h2 { font-size: 1.4rem; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; }
  .agent-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .agent-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid; }
  .agent-card h3 { font-size: 1.1rem; margin-bottom: 8px; }
  .agent-card .badge { display: inline-block; padding: 2px 10px; border-radius: 10px; font-size: 0.8rem; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  th { background: #f1f5f9; text-align: left; padding: 12px 16px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
  td { padding: 10px 16px; border-top: 1px solid #f1f5f9; font-size: 0.9rem; }
  tr:hover { background: #f8fafc; }
  .filter-bar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
  .filter-bar input { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; min-width: 240px; }
  .filter-bar select { padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; }
  .sev-fail { color: #dc2626; font-weight: 600; }
  .sev-warn { color: #ca8a04; font-weight: 600; }
  .sev-info { color: #2563eb; }
  .actions-list { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .actions-list li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
  .actions-list li:last-child { border-bottom: none; }
  .timestamp { margin-top: 32px; text-align: center; color: #94a3b8; font-size: 0.85rem; }
</style>
</head>
<body>

<!-- 1. Header -->
<header>
  <h1>QA Report — Migration WordPress to Next.js</h1>
  <p>exceleur.fr — ${new Date(report.timestamp).toLocaleDateString('fr-FR', { dateStyle: 'full' })}</p>
  <div class="status-badge" style="background:${statusColor(report.overall_status)}; color: white;">
    ${statusEmoji(report.overall_status)}
  </div>
  <div class="counters">
    <div class="counter"><div class="value">${report.summary.total_articles}</div><div class="label">Articles</div></div>
    <div class="counter"><div class="value" style="color:#86efac">${report.summary.pass}</div><div class="label">Pass</div></div>
    <div class="counter"><div class="value" style="color:#fde047">${report.summary.warn}</div><div class="label">Warn</div></div>
    <div class="counter"><div class="value" style="color:#fca5a5">${report.summary.fail}</div><div class="label">Fail</div></div>
  </div>
</header>

<div class="container">

<!-- 2. Agent Cards -->
<section>
  <h2>Agents</h2>
  <div class="agent-grid">
    ${Object.entries(report.agents).map(([name, data]) => `
    <div class="agent-card" style="border-color:${statusColor(data.status)}">
      <h3>${name}</h3>
      <span class="badge" style="background:${statusBg(data.status)}; color:${statusColor(data.status)}">
        ${statusEmoji(data.status)}
      </span>
      <span style="margin-left:8px; color:#64748b">${data.issues} issue${data.issues !== 1 ? 's' : ''}</span>
    </div>`).join('')}
  </div>
</section>

<!-- 3. Issues Detail -->
<section>
  <h2>Issues (${allIssues.length})</h2>
  <div class="filter-bar">
    <input type="text" id="issueFilter" placeholder="Filter by file or message..." oninput="filterIssues()">
    <select id="severityFilter" onchange="filterIssues()">
      <option value="">All severities</option>
      <option value="fail">Fail only</option>
      <option value="warn">Warn only</option>
      <option value="info">Info only</option>
    </select>
  </div>
  <table>
    <thead><tr><th>Severity</th><th>Agent</th><th>Check</th><th>File</th><th>Message</th></tr></thead>
    <tbody id="issuesBody">
      ${[...failIssues, ...warnIssues, ...allIssues.filter(i => i.severity === 'info')]
        .map(i => `
      <tr class="issue-row" data-severity="${i.severity}" data-file="${i.file || ''}" data-message="${(i.message || '').replace(/"/g, '&quot;')}">
        <td><span class="sev-${i.severity}">${i.severity.toUpperCase()}</span></td>
        <td>${i.agent}</td>
        <td>${i.check || ''}</td>
        <td>${i.file || ''}</td>
        <td>${i.message || ''}</td>
      </tr>`).join('')}
    </tbody>
  </table>
</section>

<!-- 4. Article Health -->
<section>
  <h2>Article Health (${articleEntries.length} articles with issues)</h2>
  <div class="filter-bar">
    <input type="text" id="articleFilter" placeholder="Filter by slug..." oninput="filterArticles()">
    <select id="articleStatusFilter" onchange="filterArticles()">
      <option value="">All statuses</option>
      <option value="fail">Fail only</option>
      <option value="warn">Warn only</option>
      <option value="pass">Pass only</option>
    </select>
  </div>
  <table>
    <thead><tr><th>Slug</th><th>Status</th><th>Issues</th></tr></thead>
    <tbody id="articlesBody">
      ${articleEntries.map(([slug, data]) => `
      <tr class="article-row" data-slug="${slug}" data-status="${data.status}">
        <td>${slug}</td>
        <td><span class="sev-${data.status}">${data.status.toUpperCase()}</span></td>
        <td>${data.issues.length}</td>
      </tr>`).join('')}
    </tbody>
  </table>
</section>

<!-- 5. Actions Required -->
${failIssues.length > 0 ? `
<section>
  <h2>Actions Required</h2>
  <div class="actions-list">
    <ol>
      ${failIssues.map(i => `<li><span class="sev-fail">[${i.agent}]</span> ${i.file ? `<strong>${i.file}</strong> — ` : ''}${i.message}</li>`).join('')}
    </ol>
  </div>
</section>` : ''}

<p class="timestamp">Generated: ${report.timestamp}</p>
</div>

<script>
function filterIssues() {
  const text = document.getElementById('issueFilter').value.toLowerCase();
  const sev = document.getElementById('severityFilter').value;
  document.querySelectorAll('.issue-row').forEach(row => {
    const matchText = !text || row.dataset.file.toLowerCase().includes(text) || row.dataset.message.toLowerCase().includes(text);
    const matchSev = !sev || row.dataset.severity === sev;
    row.style.display = matchText && matchSev ? '' : 'none';
  });
}
function filterArticles() {
  const text = document.getElementById('articleFilter').value.toLowerCase();
  const status = document.getElementById('articleStatusFilter').value;
  document.querySelectorAll('.article-row').forEach(row => {
    const matchText = !text || row.dataset.slug.toLowerCase().includes(text);
    const matchStatus = !status || row.dataset.status === status;
    row.style.display = matchText && matchStatus ? '' : 'none';
  });
}
</script>
</body>
</html>`;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseOrchestratorArgs();

  if (args.help) {
    console.log(`
QA Pipeline Orchestrator

Usage:
  node scripts/run-qa.mjs                         Full suite
  node scripts/run-qa.mjs --slug=mon-article       Single article
  node scripts/run-qa.mjs --scripts-only            No WP API calls
  node scripts/run-qa.mjs --agent=5                 Single agent
  node scripts/run-qa.mjs --no-html                 Skip HTML report
`);
    return;
  }

  console.log('\n' + '='.repeat(60));
  console.log('  QA PIPELINE — WordPress → Next.js Migration');
  console.log('='.repeat(60));

  // If --slug, inject it into process.argv for agents
  if (args.slug) {
    if (!process.argv.includes(`--slug=${args.slug}`)) {
      process.argv.push(`--slug=${args.slug}`);
    }
    console.log(`  Mode: single article "${args.slug}"`);
  }

  // Filter agents if --agent specified
  let agentsToRun = AGENTS;
  if (args.agent) {
    agentsToRun = AGENTS.filter(a => a.id === args.agent);
    if (agentsToRun.length === 0) {
      console.error(`  Unknown agent ID: ${args.agent}`);
      process.exit(1);
    }
  }

  // Skip WP-dependent agents if --scripts-only
  if (args.scriptsOnly) {
    agentsToRun = agentsToRun.filter(a => !a.needsWp);
    console.log('  Mode: scripts-only (no WP API calls)');
  }

  const start = Date.now();
  const allResults = [];

  // ─── Group 1: Local only (parallel, fast) ──────────────────────────────────
  const group1 = agentsToRun.filter(a => a.group === 1);
  if (group1.length > 0) {
    console.log('\n--- Group 1: Local checks ---');
    const results = await Promise.all(group1.map(a => runAgent(a)));
    allResults.push(...results);
  }

  // ─── Group 2: WP API (parallel, shared data) ──────────────────────────────
  const group2 = agentsToRun.filter(a => a.group === 2);
  if (group2.length > 0) {
    console.log('\n--- Group 2: WordPress API checks ---');

    // Shared WP data fetch
    let wpPostMap, wpCategoryMap;
    try {
      console.log('  Fetching shared WP data...');
      const wpPosts = await fetchAllWpPosts('id,title,slug,date,content,excerpt,categories');
      wpPostMap = new Map();
      wpPosts.forEach(p => wpPostMap.set(p.slug, p));
      wpCategoryMap = await buildWpCategoryMap();
      console.log(`  Shared WP data: ${wpPostMap.size} posts, ${wpCategoryMap.size} categories`);
    } catch (err) {
      console.error(`  Failed to fetch WP data: ${err.message}`);
      console.error('  Set WORDPRESS_USER and WORDPRESS_APP_PASSWORD env vars.');
      // Create fail results for WP-dependent agents
      for (const a of group2) {
        allResults.push({
          agent: a.name,
          status: 'fail',
          timestamp: new Date().toISOString(),
          summary: { total: 1, fail: 1, warn: 0, info: 0 },
          issues: [{ file: '', check: '', severity: 'fail', message: `WP API unavailable: ${err.message}` }],
        });
      }
      wpPostMap = null;
    }

    if (wpPostMap) {
      const results = await Promise.all(
        group2.map(a => runAgent(a, { wpPostMap, wpCategoryMap }))
      );
      allResults.push(...results);
    }
  }

  // ─── Group 3: External HTTP (parallel, slow) ──────────────────────────────
  const group3 = agentsToRun.filter(a => a.group === 3);
  if (group3.length > 0) {
    console.log('\n--- Group 3: External HTTP checks ---');
    const results = await Promise.all(group3.map(a => runAgent(a)));
    allResults.push(...results);
  }

  // ─── Consolidate ──────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('  CONSOLIDATING RESULTS');
  console.log('='.repeat(60));

  const report = consolidate(allResults);

  // Write JSON
  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  const jsonPath = path.join(REPORT_DIR, 'report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`  JSON report: ${jsonPath}`);

  // Write HTML
  if (!args.noHtml) {
    const htmlPath = path.join(REPORT_DIR, 'report.html');
    fs.writeFileSync(htmlPath, generateHtml(report, allResults), 'utf-8');
    console.log(`  HTML report: ${htmlPath}`);
  }

  // Final summary
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const color = report.overall_status === 'pass' ? '\x1b[32m'
    : report.overall_status === 'warn' ? '\x1b[33m' : '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`\n${'='.repeat(60)}`);
  console.log(`  OVERALL: ${color}${report.overall_status.toUpperCase()}${reset}`);
  console.log(`  Articles: ${report.summary.total_articles} total | ${report.summary.pass} pass | ${report.summary.warn} warn | ${report.summary.fail} fail`);
  console.log(`  Duration: ${elapsed}s`);
  console.log('='.repeat(60) + '\n');

  // Exit with non-zero if fail
  if (report.overall_status === 'fail') process.exit(1);
}

main().catch(err => {
  console.error('Orchestrator failed:', err);
  process.exit(1);
});
