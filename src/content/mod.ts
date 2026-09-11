import type { ModInfo } from './types'

// 下载渠道：已接入 Modrinth 官方发布页（slug: rainveil_mod）。
// 其余字段（版本号、文件大小、发布日期、更新日志）仍为占位示例，
// 待用户提供真实信息后替换（结构保持即可，页面会自动跟随）。
export const mod: ModInfo = {
  name: 'Rainveil 专属模组',
  tagline: '由服务器团队维护的客户端模组，解锁专属界面、任务提示与资源加载。',
  description:
    '安装专属模组后，你可以看到服务器自定义的 HUD、任务进度提示与专属物品贴图。' +
    '不安装也能正常进入服务器，但部分界面与提示将无法显示。',

  latest: {
    version: '1.0.0',
    mcVersion: '1.21.11',
    loader: 'Fabric',
    fileName: 'rainveil_mod-1.0.0.jar',
    fileSize: '2.4 MB',
    releasedAt: '2026-08-26',
    url: 'https://modrinth.com/mod/rainveil_mod',
  },

  mirrors: [
    { label: 'Modrinth', url: 'https://modrinth.com/mod/rainveil_mod', note: '官方发布页 · 推荐' },
    { label: 'QQ 群文件', url: '', note: '群号见页脚' },
  ],

  requirements: [
    { label: '游戏版本', value: 'Java 1.21.11' },
    { label: '模组加载器', value: 'Fabric Loader 0.19.3+' },
    { label: '前置模组', value: 'Fabric API' },
    { label: '建议内存', value: '4 GB 及以上' },
  ],

  install: [
    { title: '安装 Fabric Loader', detail: '使用 Fabric 官方安装器，为 1.21.11 创建一个 Fabric 配置。' },
    { title: '下载本模组与前置', detail: '下载最新版专属模组，并一并下载 Fabric API。' },
    { title: '放入 mods 目录', detail: '把两个 jar 文件放进 .minecraft/mods 文件夹。' },
    { title: '启动并进入服务器', detail: '选择 Fabric 配置启动游戏，进入服务器即可生效。' },
  ],

  changelog: [
    {
      version: '1.0.0',
      date: '2026-08-26',
      tag: 'feature',
      highlights: [
        '首个公开版本，支持 Java 1.21.11 / Fabric',
        '新增专属 HUD 与任务进度提示',
        '新增服务器专属物品贴图加载',
      ],
    },
    {
      version: '0.9.0',
      date: '2026-08-18',
      tag: 'feature',
      highlights: ['开启 Beta 测试', '加入任务同步接口'],
    },
    {
      version: '0.8.1',
      date: '2026-08-10',
      tag: 'fix',
      highlights: ['修复与部分优化模组同时加载时界面错位的问题'],
    },
    {
      version: '0.8.0',
      date: '2026-08-02',
      tag: 'breaking',
      highlights: ['重构配置格式，旧版配置文件不再兼容，需删除后重新生成'],
    },
  ],

  faq: [
    {
      q: '必须安装模组才能进入服务器吗？',
      a: '不是。不安装也可以正常进入服务器，但专属 HUD、任务提示与自定义贴图不会显示。',
    },
    {
      q: '模组会和其他模组冲突吗？',
      a: '与主流优化模组兼容。若出现不兼容情况，会在更新日志中以「不兼容」标注。',
    },
    {
      q: '如何更新到新版本？',
      a: '删除 mods 目录中的旧版本 jar，放入新版本文件即可，配置会自动迁移。',
    },
    {
      q: '支持哪些启动器？',
      a: '任何支持 Fabric 1.21.11 的启动器都可以，例如官方启动器、PCL2、HMCL。',
    },
  ],
}
