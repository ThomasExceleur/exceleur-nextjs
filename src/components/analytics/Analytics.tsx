'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from './GoogleAnalytics';

/**
 * Analytics component - loads all tracking scripts.
 * 
 * Includes:
 * - Google Analytics 4 (with Consent Mode v2 for RGPD compliance)
 * - Vercel Analytics (privacy-friendly, no cookies)
 */
export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <VercelAnalytics />
    </>
  );
}
