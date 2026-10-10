# 更新日志

本项目所有值得注意的变更都记录在此文件中。

本项目**无 release 产物**，变更按日期分隔，像日记一样记录一天的变更。分类习惯参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，不使用 SemVer 版本号。

## [Unreleased]

## 2026-09-24

### 新增
- 定义 L1 v4 角色分层与缺口诚实规则（`docs/l1-roles.md`、ADR-0008）
- 新增 ErgeMD 适配 profile 与 core / reading 映射
- 新增主题纳入 DoD：来源 pin、值域三态（原文/公式/豁免）、映射可审

### 变更
- OnePage 缺口角色明确标注为「契约兜底」

## 2026-09-14

### 新增
- 预览家族分区与徽标配置生成化进 `preview/data.js`，与索引同源

### 变更
- OnePage 状态色与 ANSI 共 26 行统一为 HEX 显示（DEC-002）
- 预览对比度守卫与 Python 口径对齐，非纯色显示「—」
- 生成器增强健壮性并保证字节级幂等输出

### 修复
- 预览不再把 `var()` 公式值画成透明色块
- OnePage 卡片移除 graph-* 公式角色分区

## 2026-09-13

### 新增
- ThemeVault 初始入库：OnePage 家族（#073 warm-brown、#074 warm-paper）及索引 / 预览 / 文档骨架
