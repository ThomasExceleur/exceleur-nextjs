// Wrapper to run agent1 with WP credentials
process.env.WORDPRESS_USER = 'Fonzy59';
process.env.WORDPRESS_APP_PASSWORD = 'siww aoCm ShPj B3iV jtiF MmDZ';
const { run } = await import('./agents/agent1-content-diff.mjs');
const result = await run();
console.log('\n=== Summary ===');
console.log(JSON.stringify(result.summary, null, 2));
