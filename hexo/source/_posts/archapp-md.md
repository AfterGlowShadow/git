---
title: archapp.md
author: 余晖残影
tags:
  - 系统
  - linux
  - windows
categories:
  - 系统
  - linux
date: 2021-07-23 11:45:33
description: arch 常用应用
---

## 社交
### 微信（用的深度的）
1. 先修改系统配置（按照lib包用）
打开 /etc/pacman.conf文件中的multilib的注释
2. 先安装深度的wine
```shell
  sudo pacman -S deepin-wine
  yay -S deepin-wine
```
3. 安装深度wechat
```shell
  yay -S com.qq.weixin.spark
```
4. 安装tim
```shell
 yay -S com.qq.tim.spark
```
