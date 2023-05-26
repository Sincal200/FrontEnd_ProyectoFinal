/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import "primevue/resources/themes/lara-light-indigo/theme.css";       //theme
import "primevue/resources/primevue.min.css";             //core css
import "primeicons/primeicons.css";                        //icons

Vue.config.productionTip = false
Vue.component('DataTable',DataTable);
Vue.component('Column',Column);
Vue.component('Panel',Panel);
Vue.component('Menubar',Menubar);
Vue.component('Dialog',Dialog);
Vue.component('InputText',InputText);
Vue.component('Button',Button);
Vue.use(ToastService);
Vue.component('Toast',Toast);

new Vue({
  render: h => h(App),
}).$mount('#app')
