options(
  blogdown.method = 'custom', digits = 4, servr.daemon = TRUE, formatR.indent = 2,
  blogdown.publishDir = '../yihui-public', blogdown.yaml.empty = FALSE,
  blogdown.subdir = 'cn', blogdown.generator.server = TRUE,
  blogdown.hugo.server = c('-D', '-F', '--navigateToChanged')
)

local({
  pandoc_path = Sys.getenv('RSTUDIO_PANDOC', NA)
  if (Sys.which('pandoc') == '' && !is.na(pandoc_path)) Sys.setenv(PATH = paste(
    Sys.getenv('PATH'), pandoc_path,
    sep = if (.Platform$OS.type == 'unix') ':' else ';'
  ))
})
