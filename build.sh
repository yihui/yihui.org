#!/bin/sh

set -e

# check out latest books (litedown, bookdown, blogdown, etc.)
git submodule update --remote --init --force --depth 1

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
