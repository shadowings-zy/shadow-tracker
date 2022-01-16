module.exports = {
  base:"/shadow-tracker/",
  locales: {
    '/': {
      lang: '简体中文',
      title: 'shadow-tracker 文档',
      description: '一款轻量级的前端无感知监控插件',
    },
    '/en/': {
      lang: 'English',
      title: 'shadow-tracker document',
      description: 'a sensorless front-end data tracker',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: '选择语言',
        sidebar: 'auto',
        nav: [
          { text: 'GitHub', link: 'https://github.com/shadowings-zy/shadow-tracker' },
        ],
      },
      '/en/': {
        selectText: 'Languages',
        sidebar: 'auto',
        nav: [
          { text: 'GitHub', link: 'https://github.com/shadowings-zy/shadow-tracker' },
        ],
      },
    },
  },
}
