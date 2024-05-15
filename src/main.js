import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { setupPlugin } from './plugin'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  
  app.use(Pinia.createPinia())
  app.use(setupPlugin)

  return {
    app,
    Pinia,
  }
}
