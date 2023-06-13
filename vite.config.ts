import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // javascriptEnabled: true,
          additionalData: `@import './src/styles/variabless.scss';`
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'cmps': resolve(__dirname, './src/components'),
        'api': resolve(__dirname, './src/api'),
        'view': resolve(__dirname, './src/views'),
        'store': resolve(__dirname, './src/store'),
        'utils': resolve(__dirname, './src/utils'),
        'type': resolve(__dirname, './src/types')
      }
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      host: '0.0.0.0',
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: '',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    }
  }
})
