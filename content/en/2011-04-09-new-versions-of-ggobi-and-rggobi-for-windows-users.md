---
title: New versions of GGobi and rggobi for Windows users
date: '2011-04-09'
slug: new-versions-of-ggobi-and-rggobi-for-windows-users
---

For those who have been struggling with the installation of [GGobi](http://www.ggobi.org) and the [rggobi package](http://cran.r-project.org/package=rggobi) under Windows: a major update of [GGobi 2.1.9](http://www.ggobi.org/downloads/) is that GTK+ has been bundled with GGobi, so the installation of GTK+ is no longer required (I recommend you to uninstall it if it is not used elsewhere in your system); besides, the **rggobi** package, which interfaces R to GGobi, is now built with the GGobi 2.1.9 on CRAN too. You might know that the Windows binary of rggobi is not available on CRAN in the past (and Prof Ripley kindly provided the binary), but now things have changed. Hopefully this can make our life with GGobi easier.

You may use `install.packages('rggobi')` to install the new version of **rggobi** from CRAN.

Also note that if you are a user of the [RGtk2 package](http://cran.r-project.org/package=RGtk2), you don't need a standalone installation of GTK+ either if you have already installed GGobi 2.1.9, because the path of GGobi will be written in the PATH variable of your system and **RGtk2** can load the required dll's from GGobi's directory.
