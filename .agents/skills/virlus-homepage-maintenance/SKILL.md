---
name: virlus-homepage-maintenance
description: 维护 Wenye Yu 的 Virlus.github.io 学术主页与项目页面。修改论文、项目、个人资料、媒体、布局或发布网站，以及记录用户对此仓库的长期维护要求时使用；保证同一项目在所有相关 URL 的属性与行为一致。
---

# Virlus 学术主页维护

## 同一项目，所有展示入口一致

用户要求：同一项目可能出现在多个 URL。任何项目相关属性的修改，都必须检查它在各个入口的呈现；不能只改或只验证 Selected publications。

1. 修改前搜索项目名称、BibTeX key、媒体路径及组件调用，列出受影响的页面。以下是当前入口，不能当作永久完整清单：

   | 入口 | URL | 源码 |
   | --- | --- | --- |
   | 首页 Selected publications | `/` | `src/pages/index.astro` |
   | 完整论文列表 All Publications / Publications | `/publications/` | `src/pages/publications.astro` |
   | 项目列表 Projects | `/projects/` | `src/pages/projects/index.astro` |
   | 独立项目网站，例如 ARMADA | `/armada/` | `armada/index.html` |

2. 三个列表页共用 `src/components/publications/PubCard.astro`，论文数据统一来自 `src/content/publications/main.bib`，经过 `src/lib/publications/` 加载。内容属性在共享数据中修改，列表展示和交互在共享组件中修改，避免逐页复制独立实现。
3. 检查本次修改涉及的标题、作者及贡献标记、会议信息、年份、简介、奖项、链接、图片、视频及交互行为。共享组件相同只是源码证据，不能替代逐 URL 的运行验证。
4. 独立项目网站可能有自己的内容副本，也必须查找和同步本次改动涉及的共同事实。摘要与长篇说明、预览视频与完整讲解视频可以有不同用途；不把不同用途的内容机械改成完全相同。第三方托管页面无法随本仓库更新时，在结果中说明未覆盖项。
5. 页面可以有不同的项目子集、排序和布局；同一项目的共同属性及同用途媒体行为应一致。检查新增入口、移动路由或分页是否扩大了验证范围。

## 已确认的界面偏好

- 论文直接展示标题、作者与会议信息、简介和普通文字链接。简介不需要点击展开。
- 不增加论文标签、标签筛选、BibTeX 复制、邮箱复制等冗余操作。
- Email、Scholar、GitHub、Twitter / X 以并排文字链接呈现，手机宽度也应检查。
- 项目卡片中的视频预览静音、自动、循环、行内播放：`autoplay muted loop playsinline`，保留手动暂停能力。ARMADA 使用 `previewvideo` 字段；此规则适用于所有同用途项目预览，不限于 ARMADA。
- 上述是本仓库的长期偏好；用户后续明确改变要求时同步更新。

## 检查与发布

- 使用 `corepack pnpm`，遵循 `package.json` 锁定的版本。项目通过 GitHub Actions 发布到 `https://virlus.github.io/`，当前部署分支为 `master`，工作流为 `.github/workflows/deploy.yml`。
- 修改源文件，不直接改 `dist/` 或构建生成的 `public/` 副本。独立项目站及媒体的原始目录见根目录 README；例如 `armada/`、`images/`，由 `scripts/sync-legacy-assets.mjs` 复制。
- 执行与改动相关的检查并 `corepack pnpm build`，通过本地 preview 检查所有受影响 URL，至少覆盖桌面和手机尺寸。对同一项目比对变更后的属性、链接目标、媒体来源与行为。
- 自动播放检查必须在未点击播放、未调用 `video.play()` 的情况下，将预览滚动至可见区域，确认 `paused === false`、`currentTime` 随时间增长、`muted`、`loop` 和 `playsInline` 为真。仅检查 HTML 中有 `autoplay` 不算通过；逐个 URL 验证。
- 在当前任务已有发布授权时推送，等待对应提交的 Pages 工作流成功，再逐个线上 URL 验证受影响内容。skill 本身不提供新的发布授权。
- 用户报告页面不一致时，先检查普通 URL 的实际行为及部署提交；必要时对比带版本参数的新请求。不要未经验证便断言是缓存，也不要在实际已一致时声称修复了不存在的代码差异。若不能复现，说明已检查的 URL 和环境，再针对用户仍遇到的现象排查。
- 结果只报告实际验证过的入口；未验证项和受浏览器策略限制的播放行为应如实说明。手机尺寸模拟不能说成真实手机实测。

## 持续维护这些规则

用户明确提出本仓库的长期约定、反复使用的要求或需要记住的维护经验时，在同一任务中更新本 skill，而不是仅在对话中承诺记住。合并到相关条目，替换过时规则，不堆叠重复说明。只有出现独立且可复用的工作流程时才另建 skill，并在根目录 `AGENTS.md` 增加对应入口。

本仓库中的本文件是唯一维护源；本机全局 skills 目录可通过符号链接发现它，避免维护两份规则。根目录 `AGENTS.md` 保证新会话进入此仓库时也能找到并读取规则。更新后使用 `skill-creator` 的 `quick_validate.py` 验证 skill，并确认入口链接仍有效。
