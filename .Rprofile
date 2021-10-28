if (file.exists('~/.Rprofile')) sys.source('~/.Rprofile', envir = environment())

options(
  servr.port = 4321L, servr.host = '0.0.0.0',
  blogdown.method = 'custom', blogdown.author = '',
  digits = 4, formatR.indent = 2, blogdown.yaml.empty = FALSE,
  blogdown.rename_file = TRUE, blogdown.new_bundle = FALSE,
  blogdown.title_case = function(x) {
    # if the title is pure ASCII, use title case
    if (xfun::is_ascii(x)) tools::toTitleCase(x) else x
  },
  blogdown.subdir_fun = function(x) {
    if (xfun::is_ascii(x)) 'en' else getOption('blogdown.subdir')
  },
  # blogdown.hugo.version = '0.25.1',
  blogdown.subdir = 'cn', blogdown.serve_site.startup = TRUE,
  blogdown.server.first = function() {
    # symlink some js and css files to static/ because Hugo does not allow us to
    # symlink directories
    if (!dir.exists('../misc.js')) return()
    for (i in c('js', 'css')) {
      xfun::dir_create(d <- file.path('static', 'hardlink', i))
      file.remove(list.files(d, full.names = TRUE))
      xfun::in_dir(d, for (r in c('misc.js', 'zdict.js', 'arith.js')) {
        fs = list.files(file.path('../../../..', r, i), full.names = TRUE)
        if (length(fs)) file.link(fs, basename(fs))
      })
    }
  }
)
