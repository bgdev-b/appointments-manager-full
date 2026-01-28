import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/styles/base.css'
import './assets/styles/buttons.css'
import './assets/styles/forms.css'
import './assets/styles/appointments.css'
import './assets/styles/modals.css'
import './assets/styles/navigation.css'

createApp(App)
    .use(router)
    .mount('#app')
