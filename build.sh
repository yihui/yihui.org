#!/bin/sh

cd static

# do not index the site on Netlify (only index the one built on Vercel)
if [ "$NETLIFY" = "true" ]; then
  echo 'User-agent: *
Disallow: /' > robots.txt
fi

cd ..
# Netlify uses $CONTEXT and Vercel uses $VERCEL_ENV
if [ "${VERCEL_ENV:-$CONTEXT}" = "production" ]; then
  hugo -F
else
  hugo -F -D -b ${VERCEL_URL:-$DEPLOY_PRIME_URL}
fi
