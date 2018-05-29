<template>
  <div class="app-container">
    <div class="main-top">
      <!--<main-header></main-header>-->
    </div>
    <div class="global-main wrapper">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!--<main-footer v-if="footer"></main-footer>-->
    <!--<login v-if="loginDialogStatus"></login>-->
  </div>
</template>

<script>

  export default {
    name: 'app-entry',

    components: {
      // MainHeader,
      // Login,
    },

    data() {
      return {};
    },

    computed: {
      ...mapState({
        footer: state => _.isUndefined(state.route.meta.footer) ? true : state.route.meta.footer,
        toolbar: state => _.isUndefined(state.route.meta.toolbar) ? true : state.route.meta.toolbar,
      }),
      ...mapGetters([
        'loginDialogStatus',
        'logoutDialogStatus',
        'resetPassWordDialogStatus',
        'loginLauncherStatus',
        'freeTrialStatus',
        'getLoginStatus',
        'gameDownLoadStatus',
        'openDeskTopMsgStatus',
        'logoutNoticeStatus',
        'openImDialogStatus',
      ]),
    },
  };
</script>

<style scoped>
  .main-top {
    min-width: 1200px;
  }
</style>
