/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 配置基本路徑，這對於 GitHub Pages 很重要
  basePath: process.env.NODE_ENV === 'production' ? '/greenwatch-ai-demo' : '',
  // 禁用圖像優化，因為靜態導出不支持
  images: {
    unoptimized: true,
  },
  // 確保靜態資源正確加載
  assetPrefix: process.env.NODE_ENV === 'production' ? '/greenwatch-ai-demo' : '',
};

module.exports = nextConfig; 