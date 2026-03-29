---
title: "TinyTeX on macOS: No More Messing with `/usr/local/bin`"
date: '2026-03-27'
slug: tinytex-macos-path
---

If you have ever installed TinyTeX on a relatively recent macOS system, you
might have seen an admin password prompt pop up out of nowhere. What was TinyTeX
doing behind the scenes? Well... honestly, something it shouldn't have been
doing. [Issue #463](https://github.com/rstudio/tinytex/issues/463) by
[r2evans](https://github.com/r2evans) gave me a thorough and well-deserved
lecture on it, and I've finally fixed it in [PR
#489](https://github.com/rstudio/tinytex/pull/489).

## How we got here?

I should start with an apology. The old behavior was my fault, born from blindly
following a practice I picked up from Homebrew years ago without keeping up with
how things evolved.

In the early days of Homebrew, it would create symlinks to `/usr/local/bin`, and
back then (pre-Catalina, before 2019 or so) this directory was writable by
default on macOS. When Apple tightened its permissions so that `/usr/local/bin`
was no longer writable without `sudo`, Homebrew's workaround was to ask users to
`sudo chown` the directory. I followed this approach blindly when I first built
TinyTeX's PATH setup---adding a `chown -R <user>:admin /usr/local/bin` step via
`osascript`, followed by `tlmgr path add` to create symlinks from
`/usr/local/bin/` into TinyTeX's bin directory in the user's home folder
(`~/Library/TinyTeX/bin/*/`).

What I failed to notice was that Homebrew itself eventually moved on: on Apple
Silicon Macs, it switched to `/opt/homebrew`, and the current Homebrew installer
creates `/etc/paths.d/homebrew` to register its bin path, relying on macOS's
`/usr/libexec/path_helper` to incorporate it into `PATH` at shell startup. (It
also instructs users to add `eval "$(brew shellenv)"` to `~/.zprofile` for the
full environment---`PATH`, `MANPATH`, `INFOPATH`, and a few Homebrew-specific
variables.) I kept using the old `chown` trick long after it had become outdated
and insecure. I should have updated TinyTeX's approach at the same time. I'm
sorry it took this long.

## What was the problem?

The old approach had two issues from a security standpoint:

1.  **Recursive `chown` on unrelated files.** Running
    `chown -R <user>:admin    /usr/local/bin` recursively changes the ownership
    of *everything* in that directory to the current user. Changing the
    ownership of files unrelated to TinyTeX is overreaching and hard to undo
    (you'd need to remember what the original owners were).

2.  **Symlinks from a system directory into a user's home folder.** Running
    `tlmgr path add` places symlinks from `/usr/local/bin/` into one particular
    user's home directory. If that user's home directory is unavailable or the
    TinyTeX installation moves, those symlinks become stale for anyone on the
    system who relies on `/usr/local/bin`. It also means a system-wide directory
    now depends on a single user's private files, although I guess in most
    cases, you are the only user of your macOS.

r2evans put it plainly: "No R package should *ever* automatically/directly
change permissions on a file/directory outside of the user's home directory."
Hard to argue with that.

## What's the fix?

macOS provides `/etc/paths.d/` as a way to register additional directories for
inclusion in `PATH`. Each file there contains one path per line, and
`/usr/libexec/path_helper` picks them up automatically when a shell starts.
Writing a single file there is narrowly scoped: it doesn't touch any existing
binary, doesn't change any permissions, and doesn't create any cross-user
symlinks. It's exactly what Homebrew does today with
`/etc/paths.d/homebrew`---and it's what TinyTeX should have been doing all
along.

So the new behavior on macOS is:

-   If `/usr/local/bin` is *not writable* (the default on modern macOS): TinyTeX
    writes its bin directory path to `/etc/paths.d/TinyTeX` via `sudo` (still
    using `osascript`, since `/etc/paths.d/` does require admin privileges to
    write). No `chown`, no symlinks, no changes to any existing files. The old
    code that orchestrated the `chown -R` dance is gone entirely.

-   If `/usr/local/bin` *is writable* (meaning you previously went through the
    old setup): TinyTeX falls back to the old `tlmgr path add` behavior. I
    didn't want to force existing users through another `sudo` prompt for
    something they've already set up---but I'd encourage you to clean that up
    (see below).

The same logic applies in both the R functions (e.g., `tlmgr_path()`) and the
shell installer (`install-bin-unix.sh`). On Linux and Windows, nothing changes.

A few smaller improvements came along for the ride:

-   Before running the `osascript` command (which triggers the password prompt),
    TinyTeX now prints a message telling you exactly what `sudo` command it's
    about to run, so the password dialog no longer comes out of nowhere.
-   If the `sudo` operation fails (e.g., you cancelled the password prompt),
    TinyTeX emits a message with the command you can run manually in your
    Terminal if you want.
-   The `.sh` installer gained a `--no-path` flag to skip `PATH` manipulation
    altogether, on any OS. For `tinytex::install_tinytex()`, the existing
    `add_path = FALSE` argument serves the same purpose.

## What does this mean for you?

**Fresh macOS installs**: The next time you run `tinytex::install_tinytex()`,
you'll see a message in the R console telling you the `sudo` command that is
about to run (writing TinyTeX's bin path to `/etc/paths.d/TinyTeX`), followed by
the usual password dialog. No files in `/usr/local/bin` are touched.

**Existing users---please consider cleaning up**: If you previously ran through
the old setup, your `/usr/local/bin` is likely writable and TinyTeX is still
using the old `tlmgr path add` symlink approach. I'd encourage you to restore
the original ownership of `/usr/local/bin` and let TinyTeX switch over to the
new approach. Based on what I can tell from `stat -f "%Su:%Sg" /usr/local` on my
own machine, the command to restore it should be:

``` sh
sudo chown root:wheel /usr/local/bin
```

(Note: some systems may have `root:staff` as the original group; you can check
with `ls -la /usr/local` to see what makes sense for your setup.)

That restores the directory itself, but our `chown -R` also changed the
ownership of files inside it---and we owe a note on those too. On my own Apple
Silicon machine, I can see two kinds of files in `/usr/local/bin`: tools placed
there by official macOS app installers (e.g., R and Rscript, which are
`root:admin`), and tools I installed myself (which are `<user>:admin` and were
not affected by TinyTeX's `chown`). So the practical restoration for
installer-placed tools is `sudo chown root:admin`, not `root:wheel`. After
inspecting with `ls -la /usr/local/bin`, you can restore each affected file
individually, e.g.,

``` sh
sudo chown root:admin /usr/local/bin/R /usr/local/bin/Rscript
```

After doing this, `/usr/local/bin` will no longer be writable, and on the next
call to `tlmgr_path('add')` TinyTeX will automatically write
`/etc/paths.d/TinyTeX` instead. You may also want to first remove the old
symlinks that `tlmgr path add` created:

``` sh
tlmgr path remove
```

And then re-add TinyTeX's path with the new approach:

``` r
if (packageVersion('tinytex') < '0.59')
  install.packages('tinytex')
tinytex::tlmgr_path('add')
```

--------------------------------------------------------------------------------

Again, my sincere apologies for letting this linger for so long. I should have
followed Homebrew's lead when it moved to `/etc/paths.d/` years ago. Better late
than never, I suppose.

My thanks to r2evans for the patient and detailed report. This change is part of
**tinytex** v0.59, which just arrived CRAN last night.

If you run into any surprises with the new PATH setup on macOS, please [file an
issue](https://github.com/rstudio/tinytex/issues). Thanks!
