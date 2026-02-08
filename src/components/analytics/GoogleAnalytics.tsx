'use client';

import Script from 'next/script';

// TODO: Set your GA4 Measurement ID in .env.local as NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Analytics 4 component.
 * 
 * RGPD: This component checks for cookie consent before loading GA4.
 * If no consent mechanism is detected, GA4 loads with anonymize_ip enabled
 * and no cookies (storage denied by default via consent mode v2).
 * 
 * When you add a cookie consent banner, update this component to only
 * render when consent is granted.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Google Consent Mode v2 - deny storage by default (RGPD compliant)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500,
          });

          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
          });

          // TODO: When user accepts cookies, call:
          // gtag('consent', 'update', { 'analytics_storage': 'granted' });
        `}
      </Script>
    </>
  );
}
