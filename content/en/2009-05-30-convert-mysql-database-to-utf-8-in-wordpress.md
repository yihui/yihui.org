---
title: Convert MySQL Database to UTF-8 in Wordpress
date: '2009-05-30'
slug: convert-mysql-database-to-utf-8-in-wordpress
---

This plugin is based on the post [Convert MySQL Tables to UTF-8](http://www.sveit.com/forum/viewtopic.php?t=1282#p11543) and an [existing plugin by g30rg3_x](http://wordpress.org/extend/plugins/utf-8-database-converter/). The reason I modified their code is that they will convert _all_ tables in your database to the UTF-8 charset, but what we need is to convert WP tables, so I changed the code `"SHOW TABLES"` to `"SHOW TABLES LIKE " . $table_prefix . "%"`, which will guarantee other tables could stay untouched. Besides, g30rg3\_x's purpose was to alter the charset of old WP databases to new UTF-8 databases, but in fact we also need to change the charset after we moved our DB to a new host when the charset is not UTF-8 by default. Judging from my experience, the default charset/collation for many web hosts is `latin1`/`latin1_swedish_ci` (I don't know why), whereas popular web-buidling systems often use `utf8`/`utf8_general_ci`, thus we need to change the charset before all content could be normally displayed. Without PHP and `SHOW TALBES` / `SHOW COLUMNS`, we will need to write endless code to change all tables and all columns.

```sql 
mysql> select collation('asdf'); # default collation
+-------------------+
| collation('asdf') |
+-------------------+
| latin1_swedish_ci |
+-------------------+
1 row in set (0.00 sec)
```

You can download the [UTF-8 DB Converter for Wordpress](http://wordpress.org/extend/plugins/utf-8-db-converter).

The critical part of this plugin is:

```php 
....
$sql2 = "ALTER TABLE $table DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci";
....
$sql4 = "ALTER TABLE $table CHANGE `$field_name` `$field_name` $field_type
         CHARACTER SET utf8 COLLATE utf8_bin";
....
```

I don't think I need to describe the installation again, but I sould warn you again about possible data lost during the conversion. Do back up early please.

