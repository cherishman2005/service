import Vue from 'vue'
import Router from 'vue-router'

//const author = resolve => require(['@/components/login/author'], resolve)
const error = resolve => require(['@/page/error.vue'], resolve)
//const route = resolve => require(['@/components/route.vue'], resolve)
const userInfo = resolve => require(['@/components/userInfo.vue'], resolve)
const chat = resolve => require(['@/components/chat.vue'], resolve)
const hummerClient = resolve => require(['@/components/hummer_client.vue'], resolve)
//const quicClient = resolve => require(['@/components/quic_client.vue'], resolve)


Vue.use(Router);
const routes = [
  { path: '*', component: error },
  //{ path: '/author', component: author, name: "author" },
  //{ path: '/route', component: route, name: "route" },
  { path: '/userinfo', component: userInfo, name: "userInfo" },
  { path: '/chat', component: chat, name: "chat" },
  { path: '/hummer-client', component: hummerClient, name: "hummerClient" },
  //{ path: '/quic-client', component: quicClient, name: "quicClient" },
];
const router = new Router({
  mode: 'history',
  base: '/service/',
  scrollBehavior: () => ({y: 0}),
  routes: routes,
});
export default router;

