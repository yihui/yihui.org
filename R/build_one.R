local({
  # input/output filenames are passed as two additional arguments to Rscript
  a = commandArgs(TRUE)
  if (length(a) < 2)
    stop("The script build_one.R requires at least 2 command-line args")
  unlink(a[2])

  d = knitr:::sans_ext(basename(a[1]))  # 'foo/bar/hi.Rmd' -> 'hi'
  knitr::opts_chunk$set(
    fig.path   = sprintf('figure/%s/', d),
    cache.path = sprintf('cache/%s/', d), error = FALSE
  )
  knitr::opts_knit$set(
    base.dir = normalizePath('../../Apps/updog/drop/hugo/', mustWork = TRUE),
    base.url = 'https://db.yihui.name/hugo/'
  )
  knitr::opts_knit$set(width = 70)
  knitr::knit(a[1], a[2], quiet = TRUE, encoding = 'UTF-8', envir = .GlobalEnv)
  if (file.exists(a[2])) {
    x = blogdown:::readUTF8(a[2])
    blogdown:::writeUTF8(xaringan:::protect_math(x), a[2])
    Sys.chmod(a[2], '0444')  # read-only (should not edit)
  }
})
