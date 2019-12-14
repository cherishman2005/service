// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import { getToken,setBeforeLoginUrl } from '@/utils/auth'
import { baseURL } from '@/global.js'
// import * as THREE from "three";

// Vue.use(THREE);

Vue.use(ElementUI);
Vue.use(VueLazyload);

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

function getWxAuth() {
  const appid = '';
  const redirect_uri = encodeURIComponent(`${authURL}/author`);

  const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
  //alert("main href: " + url);
  window.location.href = url;
}

const whiteList = ['/author']

/*
router.beforeEach((to, from, next) => {
  let token = getToken();
  //alert('token: ' + token);
  if (token && store.state.openId.length != 0) {
    if (to.path === '/author') {
      next({ path: '/' });
    } else {
       next();
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      //alert('xxx: ' + to.path)
      next()
    } else {
      //alert('fullPath: ' + to.fullPath)
      setBeforeLoginUrl(to.fullPath)
      next('/author')
      //getWxAuth();
      //alert("uid=" +store.state.openId);
    }
  }
})
*/

/*
let Url = baseURL + '/three_cloud/auth_user_info/select';
axios.post(Url).then((response) => {
  console.log("user_info: " + JSON.stringify(response.data))
  const data = response.data
  store.commit('setOpenId', data.openid)
});
*/

//store.commit('setOpenId', '2314776959');
//console.log("uid=" + store.state.openId);

router.afterEach(() => {
})

Vue.config.productionTip = false;
Vue.use(MintUI)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
