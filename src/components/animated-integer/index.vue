<template>
  <span>{{ tweeningValue }}</span>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js';

  export default {
    name: "animated-integer",

    props: {
      value: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        tweeningValue: 0
      };
    },
    watch: {
      value(newValue, oldValue) {
        this.tween(Number(oldValue), Number(newValue));
      }
    },
    mounted() {
      this.tween(0, this.value);
    },
    methods: {
      tween(startValue, endValue) {

        let startDecimal = startValue.toString().split('.')[1];
        let endDecimal = endValue.toString().split('.')[1];
        startDecimal = startDecimal ? startDecimal.length : 0;
        endDecimal = endDecimal ? endDecimal.length : 0;
        const digits = startDecimal > endDecimal ? startDecimal : endDecimal;

        function animate() {
          if (TWEEN.update()) {
            requestAnimationFrame(animate);
          }
        }

        new TWEEN.Tween({tweeningValue: startValue})
          .to({tweeningValue: endValue}, 500)
          .onUpdate((obj) => {
            this.tweeningValue = obj.tweeningValue.toFixed(digits);
          })
          .onComplete(() => {
            this.tweeningValue = endValue;
          })
          .start();

        animate();
      }
    }
  };
</script>

<style scoped>

</style>
