/** 站点级常量：品牌名、版本、外部链接 */
const GITHUB_REPO = 'https://github.com/zhaoyh603/gwork';

export const SITE = {
  name: 'Gwork',
  version: '0.9.0',
  /** GitHub 仓库地址：用于外链源码、README 与 Releases。 */
  github: GITHUB_REPO,
  /** 文档外链：第一版仍提供仓库 README 作为补充阅读入口。 */
  docsUrl: `${GITHUB_REPO}#readme`,
  /** 下载发布页：统一指向 GitHub Releases。 */
  releaseUrl: `${GITHUB_REPO}/releases`,
  /** 问题反馈入口：用于安装问题、需求建议与缺陷提交。 */
  issuesUrl: `${GITHUB_REPO}/issues/new/choose`,
} as const;
