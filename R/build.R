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
  # if output is newer than input, skip the compilation
  if (file_test('-nt', io[2], io[1])) {
    # if an Rmd is currently staged, compile it even if .md is newer than .Rmd
    staged = system2('git', 'diff --name-only --cached', stdout = TRUE)
    if (!io[1] %in% staged) return()
  }

  if (local) message('* knitting ', io[1])
  if (blogdown:::Rscript(shQuote(c('R/build_one.R', io, cargs, external))) != 0) {
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

blogdown:::hugo_build(local = local)

if (!local) {
  message('Optimizing PNG files under static/')
  for (i in list.files('static', '[.]png$', full.names = TRUE, recursive = TRUE)) {
    system2('optipng', shQuote(i), stderr = FALSE)
  }
}
