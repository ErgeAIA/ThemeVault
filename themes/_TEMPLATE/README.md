# <source>-<theme-id> 主题说明

> 复制 `_TEMPLATE` 目录改名为 `<source>-<theme-id>` 后填写本文件。

## 元信息

- **来源项目**：（如 opensquilla / shadcn-ui / 手动调色）
- **来源仓库/链接**：
- **原始主题 ID**：（如 `dark`）
- **显示名**：
- **协议**：（Apache-2.0 / MIT / 自定义；第三方调色板衍生需标注并保留署名）
- **色彩方案**：light / dark / both
- **主题类型**：value theme（全局）/ expressive skin（路由级叠加）
- **提取方式**：基于真实源码（注明文件路径，如 `src/themes/<id>/tokens.css`）
- **提取日期**：

## 迁移备注（针对本套主题）

- 目标项目命名如何对齐（参考 `docs/migration-guide.md` §4 映射矩阵）：
  - `--bg` → ``
  - `--accent` → ``
  - ...
- 特殊注意点（如第三方署名、world 层装饰、color-mix 依赖等）：

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `_source/` — 原始源码（只读备查）
