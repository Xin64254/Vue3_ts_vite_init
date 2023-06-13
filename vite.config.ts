import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
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
