#!/bin/sh

set -e

# pin jsdelivr @xiee/utils URLs in themes/ and layouts/ to the latest version
# (CF only, to keep local checkouts clean); skip if none are unpinned, or if
# the API stays down
if [ ! -z "$CF_PAGES" ]; then
  files=$(grep -rlF '@xiee/utils/' themes layouts || true)
  if [ -n "$files" ]; then
    v=$(curl -fsS --retry 5 --retry-delay 2 --retry-all-errors \
      https://data.jsdelivr.com/v1/packages/npm/@xiee/utils/resolved |
      sed -n 's/.*"version": *"\([^"]*\)".*/\1/p')
    if [ -n "$v" ]; then
      echo "$files" | xargs sed -i "s#@xiee/utils/#@xiee/utils@$v/#g"
    else
      echo "warning: failed to get @xiee/utils version; URLs left unpinned" >&2
    fi
  fi
fi

if [ "$CF_PAGES_BRANCH" = "master" ]; then
  # Cloudflare Pages only does a shallow clone, which loses git info
  git fetch --unshallow
  mv static/_redirects_cf static/_redirects
  hugo -F --enableGitInfo
else
  # for preview, build drafts (-D) and use the baseURL from the CI provider
  if [ ! -z "$CF_PAGES_URL" ]; then
    mv static/_redirects_cf static/_redirects
    hugo -F -D -b "$CF_PAGES_URL" --enableGitInfo
  else
    hugo
  fi
fi
