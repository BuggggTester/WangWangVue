import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/styles/border.css';
import '@/assets/styles/reset.css';
import * as icons from '@element-plus/icons-vue';

const app = createApp(App);

// 使用 Element Plus 插件
app.use(ElementPlus);
// 使用 store 和 router 插件
app.use(store);
app.use(router);

// 将所有 icons 作为全局组件注册
Object.entries(icons).forEach(([name, component]) => {
    app.component(name, component);
});

// 挂载应用
app.mount('#app');