local({
  # input/output filenames are passed as command-line arguments
  a = commandArgs(TRUE)
  if (length(a) < 2) stop(
    "The script build_one.R requires at least 2 command-line args"
  )
  unlink(a[2])

  # for external Rmd, '../../foo/bar/hi.Rmd' -> 'hi'; for internal,
  # content/foo/bar/hi.Rmd -> foo/bar/hi
  d = xfun::sans_ext(
    if (a[3] == 'TRUE') basename(a[1]) else gsub('^content/', '', a[1])
  )
  knitr::opts_chunk$set(
    fig.path   = sprintf('figures/%s/', d),
    cache.path = sprintf('blogdown/cache/%s/', d),
    error = FALSE, fig.width = 6, fig.height = 5, dpi = 96, tidy = TRUE
  )
  if (grepl('^content/animation/', a[1])) knitr::opts_chunk$set(
    fig.show = 'animate', ffmpeg.format = 'mp4', dev = 'jpeg',
    aniopts = 'controls loop autoplay'
  )
  knitr::opts_knit$set(
    base.dir = normalizePath('static/', mustWork = TRUE),
    base.url = '/', width = 60
  )
  set.seed(20150723)
  knitr::knit(a[1], a[2], quiet = TRUE, encoding = 'UTF-8', envir = .GlobalEnv)
  if (file.exists(a[2])) {
    x = blogdown:::append_yaml(
      xfun::read_utf8(a[2]), if (a[3] == 'FALSE') list(from_Rmd = TRUE)
    )
    xfun::write_utf8(xaringan:::protect_math(x), a[2])
    Sys.chmod(a[2], '0444')  # read-only (should not edit)
    # keep the animation, and delete all base plots
    r = '[.](gif|mp4)$'
    a = list.files('static/figures/', r, recursive = TRUE, full.names = TRUE)
    for (f in gsub(r, '', a)) {
      imgs = list.files(dirname(f), '.jpeg$', full.names = TRUE)
      unlink(imgs[grep('^-[0-9]+[.]jpeg$', gsub(f, '', imgs))])
    }
  }
})
