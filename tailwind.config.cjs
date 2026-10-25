/** 独立 Tailwind 配置：自包含政企蓝白色板 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './features.html', './download.html', './scenarios.html', './faq.html', './guide.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 方向一「公文纸面」：纸白底 + 墨蓝字 + 朱砂点睛（键名沿用，全站类名零改动）
        brand: '#9C2B24',        // 强调色：朱砂（CTA、链接、选中态）
        'brand-hover': '#7F211C',
        'brand-dark': '#1B2A4A', // 标题墨蓝
        'brand-soft': '#F5E9E6', // 朱砂浅底
        'brand-cyan': '#B08968', // 旧辅助高光，收敛为暖褐（仅少量使用）
        'brand-glow': '#E0DACC', // 细线 / 弱描边
        ink: '#1B2A4A',          // 正文
        'ink-soft': '#5A6478',   // 辅助文字
        'ink-muted': '#8B8677',  // 更弱的说明文字
        line: '#E0DACC',         // 边框
        paper: '#FBFAF7',        // 页面底（纸白）
        surface: '#FBFAF7',      // 卡片底（同纸白，靠细线分隔）
        'surface-soft': '#F4F1EA', // 区块浅底
      },
      fontFamily: {
        // 标题衬线：系统宋体系，零 webfont
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', 'SimSun', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
