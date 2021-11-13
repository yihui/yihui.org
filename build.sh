#!/bin/sh

cd static

# clone js/css from a few other repos
ALL_REPOS="misc.js arith.js zdict.js"
for i in $ALL_REPOS; do
  git clone --depth=1 https://github.com/yihui/$i.git
done


# zdict.js needs a custom build
cd zdict.js
./build.sh
cd ..

for i in $ALL_REPOS; do
  [ -d $i/js ] && cp $i/js/*.js js/
  [ -d $i/css ] && cp $i/css/*.css css/
  rm -rf $i
done

# minify css
npm install clean-css-cli -g
cleancss --batch --batch-suffix '.min' css/*.css

# minify js
npm install terser -g
for i in js/*.js; do
  terser $i --compress --mangle --source-map --output ${i%.js}.min.js
done

# do not index the site on Netlify (only index the one built on Vercel)
if [ $NETLIFY = "true" ]; then
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
