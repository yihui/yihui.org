options(stringsAsFactors = FALSE)

files = read.csv('data/external_Rmd.csv', strip.white = TRUE)
for (i in seq_len(nrow(files))) {
  io = unlist(files[i, ])
  if (!file.exists(io[1]) && Sys.getenv('USER') != 'yihui') {
    warning('File ', io[1], ' does not exist')
    next
  }
  # if output is newer than input, skip the compilation
  if (file_test('-nt', io[2], io[1])) next

  if (blogdown:::Rscript(shQuote(c('R/build_one.R', io))) != 0) {
    unlink(io[2])
    stop('Failed to compile ', io[1], ' to ', io[2])
  }
}
