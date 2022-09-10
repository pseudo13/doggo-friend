import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

export function apiInterceptor() {
    axios.interceptors.request.use((request) => {
        if (request && request.headers) {
            request.headers["x-api-key"] = `${process.env.VUE_APP_APIKEY}`;
        }

        return request;
    });
}

createApp(App).use(apiInterceptor).use(store).use(router).mount('#app')
