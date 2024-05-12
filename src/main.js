import { createSSRApp } from "vue";
import * as Pinia from 'pinia'
import App from "./App.vue";
import initPlugin from "./plugin"
import initConfig from './config'

import 'uno.css'

export function createApp() {
	const app = createSSRApp(App);
  app.use(Pinia.createPinia())
  
  initPlugin(app)
  initConfig(app)

	return {
		app,
    Pinia
	};
}