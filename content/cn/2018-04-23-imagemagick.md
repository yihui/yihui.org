---
title: 一些 ImageMagick 命令
date: '2018-04-23'
slug: imagemagick
---

偶尔需要简单处理一下图片，无奈 ImageMagick 功能繁多，实在记不住命令行，每次都得搜一遍。索性开个帖子积累一下笔记：

- 按特定百分比缩放图片：

    ```sh
    convert -resize 25% INPUT OUTPUT
    ```
- [加黑框](http://www.imagemagick.org/discourse-server/viewtopic.php?t=17158)：

    ```sh
    convert INPUT -shave 1x1 -bordercolor black -border 1 OUTPUT
    ```

- [白色转为透明色](https://stackoverflow.com/a/12434319/559676)：

    ```sh
    convert INPUT -fuzz 20% -transparent white OUTPUT.png
    ```

- [横向合并多幅图片](https://stackoverflow.com/a/20749970/559676)：

    ```sh
    # 合并五幅图 0.png, 1.png, ..., 4.png
    montage [0-5].png -tile 5x1 -geometry +0+0 out.png
    ```
