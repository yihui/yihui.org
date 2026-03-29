---
title: "A CDN-backed CTAN Mirror: `tlnet.yihui.org`"
date: '2026-03-28'
slug: tinytex-ctan-mirror
---

I set up a partial CTAN (Comprehensive TeX Archive Network) mirror this month at
[https://tlnet.yihui.org](https://tlnet.yihui.org/index.html). This post
explains why it exists, what's in it, and how to use it. The short version:
TinyTeX now uses it by default, so many of you are already benefiting from it
without knowing.

## The problem with CTAN mirrors

CTAN has no CDN (Content Delivery Network). There is a mirror multiplexor
service at `mirror.ctan.org` that automatically redirects you to a nearby HTTPS
mirror---at the core sites, `mirrors.ctan.org` sends you to a randomly-selected
official mirror in your region, and there are 90+ mirror sites worldwide. While
this gives you a CDN-like experience of automatic geographic routing, the
underlying infrastructure is a traditional volunteer-run mirror network, not a
commercial CDN like Cloudflare or Fastly with edge caching. The mirrors are
mostly university and institutional servers that pull updates on a daily
schedule rather than serving cached content on demand.

Some mirrors are quick, others are slow, and they are never all in sync at the
same moment. In practice this usually doesn't matter much---but it does create
one genuinely painful situation that recurs every single year.

When TeX Live cuts its annual release and it's synced to your mirror, your old
`tlmgr` essentially breaks when you want to install or update packages, and you
have to reinstall TeX Live from scratch. Here is the catch: after the new TeX
Live is out, the various CTAN mirrors pick it up at different times. If you bite
the bullet and install the new TeX Live while your (default randomly selected)
mirror is still serving the old snapshot, you now have the opposite problem: a
new `tlmgr` staring at an old repository, equally confused. The window can last
days. Every year (around late March and early April when a new release of TeX
Live is made), predictably, we see TinyTeX users bitten by this problem.

## Most of CTAN is irrelevant (for our purposes)

I looked into setting up a proper mirror to solve this. The first thing I
learned is that the full CTAN tree is enormous---[tens of
gigabytes](https://tex.stackexchange.com/q/365675/9128). Most of it appears to
be historical material that, while potentially of interest to someone somewhere,
I doubt people would ever download. The only folder that matters for actually
installing and updating TeX Live packages is `systems/texlive/tlnet/`, which I
have to admit embarrassingly that I never knew before.

So I focused on `tlnet`. Even there, a lot can be thrown away:

-   Documentation packages (`.doc.tar.xz`): few people would read them.
-   Source packages (`.source.tar.xz`): useful for developers, not for users.
-   Binaries for obscure platforms: TeX Live ships compiled binaries for about
    15 platforms. I feel the most useful ones are `x86_64-linux`,
    `aarch64-linux`, `universal-darwin`, `windows`, `x86_64-linuxmusl`. There
    are also binaries for `i386-netbsd`, `x86_64-solaris`, `amd64-freebsd`,
    `x86_64-cygwin`, `x86_64-darwinlegacy`, and friends. Every single package
    that needs to be compiled (e.g., those containing executables) is compiled
    15 times, once per platform. When you cut out the platforms that basically
    nobody is running in 2026, the savings are substantial.

After all the filtering, the entire mirror comes to roughly 8,000 files and 2.3
GB. That is a very manageable size.

## The setup

The mirror lives at
[https://tlnet.yihui.org](https://tlnet.yihui.org/index.html) and is backed by
[Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) with
Cloudflare's CDN in front, so access should be fast regardless of where you are
in the world---no more lottery on which mirror your `tlmgr` happens to hit.

The sync pipeline is straightforward:

1.  A [GitHub Actions
    workflow](https://github.com/yihui/ctan-tlnet/blob/main/.github/workflows/sync-ctan.yml)
    runs daily at midnight UTC.
2.  It uses `rsync` to pull the `tlnet` directory from
    `rsync://rsync.dante.ctan.org/CTAN/systems/texlive/tlnet/`, applying the
    exclusion rules above, into a local staging directory (cached between runs
    so only the daily delta is transferred).
3.  Symlinks in the staging directory---TeX Live uses versioned symlinks like
    `foo.tar.xz -> foo.r12345.tar.xz`---are resolved into plain files, because
    R2 is an object store and doesn't understand symlinks.
4.  Changed files are uploaded to R2 with [rclone](https://rclone.org/),
    followed by a final safety-net sync.
5.  Directory index pages are regenerated from a template.

The whole thing is in the public repo
[yihui/ctan-tlnet](https://github.com/yihui/ctan-tlnet) if you are curious about
the details.

One side note: this was almost entirely worked out through conversations with
Claude. I went in knowing what I wanted and what to throw away; Claude filled in
the gaps on rsync flags, rclone configuration, R2 quirks, and the rest. I'm not
sure I would have had the patience to piece it all together from documentation
alone.

## How to use it

TinyTeX already uses this mirror by default as of the recent builds---you don't
need to do anything if you have installed TinyTeX recently.

If you use vanilla TeX Live and want to point `tlmgr` at this mirror:

``` sh
tlmgr option repository https://tlnet.yihui.org/
```

Or set it for a single command:

``` sh
tlmgr install <package> --repository https://tlnet.yihui.org/
```

Since the mirror is updated daily and served from a single CDN origin, all users
should see the same state at any given time, which finally eliminates the
inter-mirror inconsistency problem. When TeX Live releases its next annual
version, the new repository will be available from this URL within 24 hours of
the canonical CTAN source updating, and everyone pointing here will flip over at
the same moment.

## Everything is free

Cloudflare R2 has a nice free tier: 10 GB of storage and 10 million Class B
(read) operations per month at no cost. With 8,000 files and ~2.3 GB, storage is
well within the limit. The read operation quota is very unlikely to become a
concern because it only applies to the `rclone` operations but not users
accessing the R2 bucket through the domain tlnet.yihui.org. The latter is free
and unlimited.

GitHub Actions provides the compute for the daily sync at no cost as well.

## A call for help

Here's the thing I'm slightly uneasy about: this whole setup lives under my
personal Cloudflare account. If I get hit by a bus, the CDN configuration, the
R2 bucket, and the `tlnet.yihui.org` subdomain may disappear with me someday.
I've automated everything and my domain `yihui.org` is set to auto-renew, so
this service shouldn't go away immediately even if I'm gone, but still, it's not
a good idea to be [that Nebraskan](https://xkcd.com/2347/) in this case. The
code in [yihui/ctan-tlnet](https://github.com/yihui/ctan-tlnet) is public and
anyone could reconstruct the setup (you'd need Cloudflare credentials for
`rclone`, though).

I'd love for an organization---anyone with a stable institutional presence---to
take this over. The operational burden is essentially zero: the GitHub Actions
workflow handles everything automatically, and the Cloudflare costs are
currently nothing. What I'm asking for is just a more permanent home for the R2
bucket and the domain, so that it can outlive my involvement without
interruption.

If your organization is interested, or if you have ideas about how to make this
more robust, please feel free to reach out or open an issue in the
[repo](https://github.com/yihui/ctan-tlnet). Thanks!
