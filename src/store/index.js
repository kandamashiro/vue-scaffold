import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
// import wechatMessage from './modules/wechat/message'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    // wechatMessage,
  },
  strict: debug,
});

if (module.hot) {
  module.hot.accept([
    './actions',
    './getters',
    // './modules/wechat/message',
  ], () => {
    const actions = require('./actions').default;
    const getters = require('./getters').default;
    // const wechatMessage = require('./modules/wechat/message').default

    store.hotUpdate({
      actions,
      getters,
      modules: {
        // bettingInfo,
      }
    });
  });
}

export default store;
