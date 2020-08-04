---
title: 定时任务
author: 余晖残影
tags: 
  - 系统
  - linux
  - windows
categories: 
  - 系统
  - linux
description: Linux 定时任务记录
date: 
---


​crontab 是用来让使用者在固定时间或固定间隔执行程序之用，换句话说，也就是类似使用者的时程表。-u user 是指设定指定 user 的时程表，这个前提是你必须要有其权限(比如说是 root)才能够指定他人的时程表。如果不使用 -u user 的话，就是表示设 定自己的时程表。

## 纯linux定时任务

### 常用参数

​crontab -e : 执行文字编辑器来设定时程表，内定的文字编辑器是 VI，如果你想用别的文字编辑器，则请先设定 VISUAL 环境变数 来指定使用那个文字编辑器(比如说 setenv VISUAL joe)
crontab -r : 删除目前的时程表
crontab -l : 列出目前的时程表
crontab file [-u user]-用指定的文件替代目前的crontab。
crontab file [-u user]-用指定的文件替代目前的crontab。
crontab-[-u user]-用标准输入替代目前的crontab.
crontab-1[user]-列出用户目前的crontab.
crontab-e[user]-编辑用户目前的crontab.
crontab-d[user]-删除用户目前的crontab.
crontab-c dir- 指定crontab的目录。

### Crontab编辑内容格式

![img](http://note.youdao.com/yws/res/335/OFFICE9A2C49ED2B1B4AC6B9286CE505AE9FBD)

| 代表意义 | 分钟 | 小时 | 日期 | 月份 | 周   | 命令     |
| -------- | ---- | ---- | ---- | ---- | ---- | -------- |
| 数字范围 | 0~59 | 0~23 | 1~31 | 1~12 | 0~7  | 就命令啊 |

crontab文件的格式：M H D m d cmd.
M: 分钟（0-59）。
H：小时（0-23）。
D：天（1-31）。
m: 月（1-12）。
d: 一星期内的天（0~6，0为星期天）。
*　　*　　*　　*　　*　　command
分　 时　 日　 月 　周　 命令
第1列表示分钟1～59 每分钟用*或者 */1表示
第2列表示小时1～23（0表示0点）
第3列表示日期1～31
第4列表示月份1～12
第5列标识号星期0～6（0表示星期天）

### 特殊字符:

星号（*）：代表每的意思，例如month字段如果是星号，则表示每月都执行该命令操作。
逗号（,）：表示分隔时段的意思，例如，“1,3,5,7,9”。
中杠（-）：表示一个时间范围，例如“2-6”表示“2,3,4,5,6”。
正斜线（/）：可以用正斜线指定时间的间隔频率，例如“0-23/2”表示每两小时执行一次。同时正斜线可以和星号一起使用，例如*/10，如果用在minute字段，表示每十分钟执行一次。

###  设置大体流程

1、使用xshell 登录linux 服务器
1. 输入以下命令。查看已有的定时任务
crontab -l
1.  输入 以下命令，进入定时任务文件
crontab -e
![img](http://note.youdao.com/yws/res/336/OFFICE3A884FD6E34941478B3D5B44148BF00E)
1. esc 键退出 :wq 保存并退出
举例： 写一个每隔 五分钟 执行的文件
1. */5 * * * * /usr/local/php/bin/php  /home/wwwroot/default/push.php
/usr/local/php/bin/php ： PHP 的安装路径
/home/wwwroot/default/push.php 需要执行的脚本文件
1. 查看结果 命令
crontab -l
![img](http://note.youdao.com/yws/res/337/OFFICE81C2BB2509944CD28D1796456082B618)
至此,每次开机自启的定时任务设置完毕

### 简单示例：

1. 30 21 * * * /usr/local/etc/rc.d/lighttpd restart   //上面的例子表示每晚的21:30重启apache。
2.  45 4 1,10,22 * * /usr/local/etc/rc.d/lighttpd restart //上面的例子表示每月1、10、22日的4 : 45重启apache。
3. 10 1 * * 6,0 /usr/local/etc/rc.d/lighttpd restart  //上面的例子表示每周六、周日的1 : 10重启apache。
4. 0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart  //上面的例子表示在每天18 : 00至23 : 00之间每隔30分钟重启apache
5. 0 23 * * 6 /usr/local/etc/rc.d/lighttpd restart  //上面的例子表示每星期六的11 : 00 pm重启apache。
6. 0 */1 * * * /usr/local/etc/rc.d/lighttpd restart  //每一小时重启apache 
7. 0 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart  //晚上11点到早上7点之间，每隔一小时重启apache 
8. 0 11 4 * mon-wed /usr/local/etc/rc.d/lighttpd restart //每月的4号与每周一到周三的11点重启apache 
9. 0 4 1 jan * /usr/local/etc/rc.d/lighttpd restart  //一月一号的4点重启apache 

### 其他相关常用命令

1. 检查是否安装了crontab，如果提示未安装请自行安装，crontab安装包在系统光盘里面的pacekage文件夹crontabs安装包。
rpm -qa | grep crontab
2. crontab服务启动与关闭。
/etc/init.d/crond stop      --关闭服务
/etc/init.d/crond start      --启动服务
/etc/init.d/crond restart    --重启服务
/etc/init.d/crond reload    --重新载入配置
3. crontab在/etc目录下面存在cron.hourly,cron.daily,cron.weekly,cron.monthly,cron.d五个目录和crontab,cron.deny二个文件。
cron.daily是每天执行一次的job
cron.weekly是每个星期执行一次的job
cron.monthly是每月执行一次的job
cron.hourly是每个小时执行一次的job
cron.d是系统自动定期需要做的任务
crontab是设定定时任务执行文件
cron.deny文件就是用于控制不让哪些用户使用Crontab的功能
4. 用户配置文件：
每个用户都有自己的cron配置文件,通过crontab -e 就可以编辑,一般情况下我们编辑好用户的cron配置文件保存退出后,系统会自动就存放于/var/spool/cron/目录中,文件以用户名命名.linux的cron服务是每隔一分钟去读取一次/var/spool/cron,/etc/crontab,/etc/cron.d下面
