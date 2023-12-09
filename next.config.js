/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    experimental: {
      scrollRestoration: true,
    },
    compiler: { styledComponents: true },
  }
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')([
    '@react95/core',
    '@react95/icons',
]);

module.exports = withTM(withFonts(nextConfig));