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
  blogdown.subdir = 'cn', blogdown.serve_site.startup = TRUE
)
