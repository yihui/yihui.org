if (file.exists('~/.Rprofile')) sys.source('~/.Rprofile', envir = environment())

options(
  blogdown.method = 'custom', blogdown.author = NULL,
  digits = 4, formatR.indent = 2, blogdown.yaml.empty = FALSE,
  blogdown.title_case = function(x) {
    if (is.na(iconv(x, to = 'ASCII'))) return(x)
    # if the title is pure ASCII, use title case
    tools::toTitleCase(x)
  },
  blogdown.subdir = 'cn', blogdown.generator.server = TRUE,
  blogdown.hugo.server = c('-D', '-F', '--navigateToChanged')
)
