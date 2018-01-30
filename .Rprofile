if (file.exists('~/.Rprofile')) sys.source('~/.Rprofile', envir = environment())

options(
  blogdown.method = 'custom', blogdown.author = NULL,
  digits = 4, servr.daemon = TRUE, formatR.indent = 2,
  blogdown.publishDir = '../yihui-public', blogdown.yaml.empty = FALSE,
  blogdown.title_case = function(x) {
    !is.na(iconv(x, to = 'ASCII'))  # if the title is pure ASCII, use title case
  },
  blogdown.subdir = 'cn', blogdown.generator.server = TRUE,
  blogdown.hugo.server = c('-D', '-F', '--navigateToChanged')
)
