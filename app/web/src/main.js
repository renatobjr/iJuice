/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import JuiceCard from './components/auth/JuiceCard.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.component('JuiceCard', JuiceCard)

registerPlugins(app)

app.mount('#app')
