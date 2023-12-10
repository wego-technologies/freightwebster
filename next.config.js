/** @type {import('next').NextConfig} */
const nextConfig = {}
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')([
    '@react95/core',
    '@react95/icons',
]);

module.exports = withTM(withFonts(nextConfig));