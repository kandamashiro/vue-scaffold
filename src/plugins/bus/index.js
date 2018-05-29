export default {
  install (Vue) {
    const bus = new Vue({});
    if (!Vue.$global) {
      Vue.$global = {
        bus
      };
    } else {
      Vue.$global.bus = bus;
    }
  }
};
