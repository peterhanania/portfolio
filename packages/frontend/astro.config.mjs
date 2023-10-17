import netlify from '@astrojs/netlify/functions';
import preact from '@astrojs/preact';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({

  integrations: [preact({ compat: true }), compress()],
  vite: {
    ssr: {
      noExternal: ['react-use-lanyard']
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Portfolio',
          short_name: 'Portfolio',
          start_url: '/',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#0F1B1F',
          theme_color: '#4C77E5',
          icons: [
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-72x72.png',
              sizes: '72x72',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-96x96.png',
              sizes: '96x96',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-128x128.png',
              sizes: '128x128',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-144x144.png',
              sizes: '144x144',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-152x152.png',
              sizes: '152x152',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png'
            },
            {
              src: 'images/jAdmakYwaIDgeRlAnTERKl/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globDirectory: 'dist',
          globPatterns: [
            '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'
          ],
          // Don't fallback on document based (e.g. `/some-page`) requests
          // This removes an errant console.log message from showing up.
          navigateFallback: null
        }
      })
    ]
  }
});
