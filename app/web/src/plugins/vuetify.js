/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/custom.css'

// Composables
import { createVuetify } from 'vuetify'

const iJuiceTheme = {
  dark: false,
  colors: {
    backgroud: '#000000',
    error: '#EF5350',
    guava: '#f26d60'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'iJuiceTheme',
    themes: {
      iJuiceTheme,
    }
  }
})
