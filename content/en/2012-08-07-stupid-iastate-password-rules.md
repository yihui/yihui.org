---
title: For the Stupid Password Rules at Iowa State
date: '2012-08-07'
slug: stupid-iastate-password-rules
---

The Fall semester is coming, which means it is time to log into several stupid systems to be prepared for the new semester. Time and time again I'm annoyed by the [bullshit password rules](http://www.it.iastate.edu/news/view/262) at Iowa State University. I wrote to the IT staff once but no one ever responded. Here are their rules:

* Must be 8 characters in length
* Must contain at least one letter (a-z, A-Z) or a supported special character (`@`, `#`, `$` only). All letters are case sensitive.
* Must contain at least one number (0-9)
* Cannot contain spaces or unsupported special characters
* Cannot be re-used after a password expires

OK. Exactly 8 characters. No more. No less. If you are a hacker, you must not try other possibilities.

What the bloody hell makes it difficult to _support_ characters other than `@`, `#`, `$`? Just like "All men were created equal, and some are more equal than others", it seems for our dear IT people, some special characters are more special?

At least one number. You ban most special characters and force us to use at least a number to make the password harder to guess. Thank you.

Cannot contain spaces. You must be bitten hard by spaces. I hope you feel better now.

The last rule finally managed to make me mad, because the password seems to expire randomly (higher probability before a new semester). I have set different new passwords for about 8 times after they expired one after another. I'm exhausted and have ran out of imagination now. What is worse, I often forget which password I'm using this time because I have 8 combinations in mind. After you are wrong for 3 times, you will not be allowed to try further.

I do not want to write down passwords somewhere, but now I have to, otherwise I'll be desparate next semester again. Of course I will not write it down in plain text. There are many password management software packages. The only problem is I have to keep the password database somewhere accessible, and I may not be able to open it on other computers.

Anyway, here is my new password:

```r 
x1 = c(letters, LETTERS) # one letter
x2 = c('@', '#', '$')    # one special char
x3 = 0:9                 # one number
# 8 characters
p = c(sample(x1, 1), sample(x2, 1), sample(x3, 1),
      sample(c(x1, x2, x3), 5))
cat(paste(sample(p), collapse = ''), '\n')
```

I'll probably leave this as an exercise to Stat579 students in the coming semester.

![Password Strength](https://imgs.xkcd.com/comics/password_strength.png)

(via [xkcd](http://xkcd.com/936/))
