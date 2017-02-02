---
title: MySQL数据库操作笔记若干
date: '2009-05-22'
slug: mysql-database-manipulation-notes
---

学习最好的方法莫过于实践，最快的途径莫过于示例，这段时间网站搬家，迫使我不断去看一些SQL操作方法，最终记载于此，以便将来参考。


# 1、时间操作


例：将GMT时间更改为GMT+8，可用`INTERVAL`把一段时间加到一个字段上。

```sql
UPDATE `wpcn_posts` SET `post_date` = `post_date_gmt` + INTERVAL 8 HOUR
  WHERE `post_date_gmt` = `post_date`
```

本例是为了对付Bo-Blog搬家到WP时大部分时间记录都没有被正确转换到GMT+8时区的问题。


# 2、字符查找替换


例：将某个图片的错误文件名更改为正确文件名。

```sql
UPDATE `wpcn_comments` SET `comment_content` = REPLACE (
`comment_content`,
'emot/ok',
'emot/pig'
)
WHERE `comment_content` LIKE '%emot/ok%'
```

本例是为了对付Bo-Blog的pig.gif图片文件名被错误替换为ok.gif的问题，用到了`REPLACE`函数和`LIKE`操作符，注意`LIKE`后面的字段用`%%`匹配，而非`*`。


# 3、用R帮忙


例：批量更新日志的永久链接。

```r
cat(sprintf("UPDATE `wpen_posts` SET post_name = '%s' WHERE ID =%d;",
    x[, 3], x[, 1]), sep = "\n")
```

由于我不知道SQL里面如何用数组或向量，因此在批量处理的时候就用笨办法执行了，即：写n条SQL语句一起执行。R一向都是向量化操作，因此只需要把日志的ID和post_name准备好，然后用一个`sprintf()`就生成所有的SQL语句了，扔到phpMyAdmin中执行一下，所有的日志链接就更新了，省得把每一篇日志打开依次修改。

以上R语句生成如下结果：

```sql
UPDATE `wpen_posts` SET post_name = 'tidy-up-your-r-code' WHERE ID =1;
UPDATE `wpen_posts` SET post_name = 'dare-be-defeated' WHERE ID =2;
....
```

插一句，对于英文日志，永久链接就是把空格替换为-，用正则表达式删掉不是`[:alnum:]`的字符即可。


# 4、用`mysqldump`备份数据库


这个命令可以以多种形式备份MySQL数据库，这里举例将数据库备份为`*.sql`的SQL语句脚本：

```sh
mysqldump -u db_user -p -r result_filename.sql database_name
```

由于`mysqldump`命令是独立的程序，所以不要先登录进mysql界面，直接在终端或command窗口运行即可。这样的备份文件可以在将来在mysql中用`source`命令导入：

```sql
source result_filename.sql
```

这样看来备份数据库也是很容易的事情，不过导入导出的时候可能会遇到编码问题。
