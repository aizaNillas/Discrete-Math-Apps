// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: [],

    css: ['app.scss'],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },

      vueRouterMode: 'hash'
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},
      plugins: []
    },

    animations: [],

    ssr: {
      pwa: false
    },

    // ✅✅✅ PWA CONFIG — THIS IS THE FIX ✅✅✅
    pwa: {
      workboxMode: 'GenerateSW',

      swFilename: 'sw.js',

      manifest: {
        name: 'Math Application',
        short_name: 'MathApp',
        description: 'Offline Math Learning App',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        start_url: '.',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      // ✅ FORCE CACHING EVERYTHING (IMPORTANT)
      extendGenerateSWOptions (cfg) {
        cfg.skipWaiting = true
        cfg.clientsClaim = true
        cfg.navigateFallback = '/index.html'
        // ✅ ADD THIS - Include all image formats in cache
        cfg.globPatterns = ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,gif}']
      }
    },

    capacitor: {
      hideSplashscreen: true
    }
  }
})