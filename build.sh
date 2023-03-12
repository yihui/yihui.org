#!/bin/sh
shopt -s dotglob

# do not index the site on Netlify (only index the one built on Vercel)
if [ "$NETLIFY" = "true" ]; then
  cd static
  echo 'User-agent: *
Disallow: /' > robots.txt
  cd ..
fi

# Vercel only does a shallow clone, which loses git info
if [ "$VERCEL_ENV" = "production" ]; then
  rm -rf *
  git clone --recursive -b $VERCEL_GIT_COMMIT_REF https://github.com/$VERCEL_GIT_REPO_OWNER/$VERCEL_GIT_REPO_SLUG.git .
  git config advice.detachedHead false
  git checkout $VERCEL_GIT_COMMIT_SHA
fi

# Netlify uses $CONTEXT and Vercel uses $VERCEL_ENV
if [ "${VERCEL_ENV:-$CONTEXT}" = "production" ]; then
  hugo -F --enableGitInfo
else
  hugo -F -D -b ${VERCEL_URL:-$DEPLOY_PRIME_URL} --enableGitInfo
fi
