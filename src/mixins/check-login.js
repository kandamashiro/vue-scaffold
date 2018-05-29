export default {

  computed: {
    ...mapGetters([
      'isLogin'
    ]),
  },

  methods: {
    login() {
      window.store.commit(types.TOGGLE_LOGIN_DIALOG, true);
    },
  }
};
