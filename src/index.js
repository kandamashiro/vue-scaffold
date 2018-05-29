import './boots';
import store from './store/index';
import App from './App.vue';
import {sync} from 'vuex-router-sync';
import appRouters from './main/app.routers';

import {
  StaticGrid,
  SearchGrid,
  AnimatedInteger,
  XDialog,
  XSelect,
  StatusCell,
  BusPlugin,
  TransferDom,
  Ripple,
} from 'build';

// Object.defineProperty(Vue.prototype, '_', {value: _})
// Object.defineProperty(Vue.prototype, '$', {value: $})

Vue.use(BusPlugin);
Vue.component('static-grid', StaticGrid);
Vue.component('search-grid', SearchGrid);
Vue.component('animated-integer', AnimatedInteger);
Vue.component('x-select', XSelect);
Vue.component('x-dialog', XDialog);
Vue.component('status-cell', StatusCell);
Vue.directive('TransferDom', TransferDom);
Vue.directive('Ripple', Ripple);

// 配置初始化路由（按功能模块）
const router = appRouters.install();

window.store = store;
window.router = router;

sync(store, router);

Vue.config.productionTip = false;

router.onReady(() => {
  $('body').addClass('wm-loaded');
  _.delay(() => {
    $('html').css('overflow', '');
  }, 400);
});

//每次路由变化时调用，切换显示区域
// router.beforeEach((to, from, next) => {
//   if (store.getters.checkPermission(to.path)) {
//     next()
//   } else {
//     let popupLogin = _.getUrlParam('popupLogin')
//     if((to.query && to.query.popupLogin==='true')|| popupLogin=='true' ){
//         store.commit(types.TOGGLE_LOGIN_DIALOG, true)
//       // this.$router.push('/')
//     }
//
//     next({path:'/',query:to.query}) // 否则全部重定向到首页
//   }
// })

// 进行系统OAuth校验

// Global.m.oauth.check()
//   .complete(() => {
window.app = new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
});

/**
 * @deprecated do not use it
 */
window.$route = window.app.$route;
// })
// .done((res) => {
//   if (res && res.result === 0) {
//     window.store.commit(types.USER_LOGIN_SUCCESS, res.root || {})
//   }
// })
