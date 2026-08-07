/** 独立 Tailwind 配置：自包含政企蓝白色板 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './features.html', './download.html', './scenarios.html', './faq.html', './guide.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4c6fff',        // 主色：更明亮的品牌蓝
        'brand-hover': '#3457f4',
        'brand-dark': '#142b6f', // 标题深蓝
        'brand-soft': '#eef3ff', // 主色浅底
        'brand-cyan': '#48c7ff', // 辅助高光
        'brand-glow': '#d7e5ff', // 玻璃发光描边
        ink: '#27314d',          // 正文
        'ink-soft': '#61708f',   // 辅助文字
        line: '#dbe4ff',         // 边框
        paper: '#f7f9ff',        // 页面浅底
        surface: '#ffffff',      // 卡片纯白
        'surface-soft': '#f3f7ff',
      },
    },
  },
  plugins: [],
};
