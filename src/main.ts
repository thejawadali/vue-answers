import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import router from "./router";
import { createPinia } from "pinia"
import BaseInupt from "./components/Base/BaseInupt.vue";

const app = createApp(App)
app.use(createPinia())
app.component('base-input', BaseInupt)
app.use(router)
app.mount('#app')
