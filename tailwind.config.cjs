/** 独立 Tailwind 配置：自包含政企蓝白色板 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './features.html', './download.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4f6ef7',        // 主色（政企蓝，沿 gwork 应用浅色主题 accent）
        'brand-hover': '#3d5ce5',
        'brand-dark': '#1e3a8a', // 标题深蓝
        'brand-soft': '#eef2ff', // 浅蓝底（安全区/徽标）
        ink: '#374151',          // 正文
        'ink-soft': '#6b7280',   // 辅助文字
        line: '#e5e7eb',         // 边框
        paper: '#fafafa',        // 背景
      },
    },
  },
  plugins: [],
};
