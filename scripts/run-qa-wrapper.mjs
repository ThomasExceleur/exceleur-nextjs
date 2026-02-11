// Wrapper to run full QA suite with WP credentials
process.env.WORDPRESS_USER = 'Fonzy59';
process.env.WORDPRESS_APP_PASSWORD = 'siww aoCm ShPj B3iV jtiF MmDZ';
const { default: runQA } = await import('./run-qa.mjs');
