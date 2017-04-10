options(stringsAsFactors = FALSE)
cargs = commandArgs(TRUE)
local = cargs[1] == 'TRUE'

build_one = function(io, external = FALSE)  {
  if (!file.exists(io[1])) {
    (if (Sys.getenv('USER') == 'yihui') stop else warning)(
      'File ', io[1], ' does not exist'
    )
    return()
  }
  # if output is not older than input, skip the compilation
  if (!blogdown:::require_rebuild(io[2], io[1])) return()

  if (local) message('* knitting ', io[1])
  if (blogdown:::Rscript(shQuote(c('R/build_one.R', io, external))) != 0) {
    unlink(io[2])
    stop('Failed to compile ', io[1], ' to ', io[2])
  }
}

# external Rmd files
files = read.csv('R/external_Rmd.csv', strip.white = TRUE)
files = cbind(as.matrix(files), external = TRUE)
# Rmd files under the content directory
rmds = list.files('content', '[.]Rmd$', recursive = TRUE, full.names = TRUE)
if (length(rmds)) {
  files = rbind(files, cbind(rmds, gsub('.Rmd$', '.md', rmds), FALSE))
}

for (i in seq_len(nrow(files))) {
  build_one(unlist(files[i, 1:2]), files[i, 3])
}

if (!local && Sys.which('sed') != '') for (i in files[, 2]) {
  Sys.chmod(i, '644')  # unlock .md
  # add https://assets.yihui.name to image/video URLs /figures/...
  system2('sed', paste(
    "-i '' 's@\\([(\"]\\)\\(/figures/\\)@\\1https://assets.yihui.name\\2@g'", i
  ))
  Sys.chmod(i, '444')  # lock .md again
}

blogdown:::hugo_build(local = local)

if (!local) {
  message('Optimizing PNG files under static/')
  for (i in list.files('static', '[.]png$', full.names = TRUE, recursive = TRUE)) {
    system2('optipng', shQuote(i), stderr = FALSE)
  }
}
