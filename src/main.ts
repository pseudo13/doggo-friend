import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

export function apiInterceptor() {
    axios.interceptors.request.use((request) => {
        const apiKey =
            "live_lUHCNWGnVxbeYcbG5CpWzgVoIMS6cUxLqxlFWHOh4yP9dCfAyCiglSihaPUOJ0sn";
        if (request && request.headers) {
            request.headers["x-api-key"] = `${apiKey}`;
        }

        return request;
    });
}

createApp(App).use(apiInterceptor).use(store).use(router).mount('#app')
