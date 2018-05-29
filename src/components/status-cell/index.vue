<template>
  <transition mode="out-in" v-if="transition"
    enter-active-class="animated-02s fadeIn"
    leave-active-class="animated-02s fadeOut">
    <div class="status-cell" v-if="status === 'loading'" key="status-loading" :style="`height: ${height}`">
      <div class="loading-contianer">
        <div class='gl-loading-main vue-loader'>
          <div class='tri invert'></div>
          <div class='tri invert'></div>
          <div class='tri'></div>
          <div class='tri invert'></div>
          <div class='tri invert'></div>
          <div class='tri'></div>
          <div class='tri invert'></div>
          <div class='tri'></div>
          <div class='tri invert'></div>
        </div>
        <!--<div class="ring"></div>-->
        <p>{{loadingTip}}</p>
      </div>
    </div>
    <div class="status-cell" v-else-if="!hasData" key="status-empty" :style="`height: ${height}`">
      <div class="empty-container">
        <slot name="empty-tip" v-if="emptyTip">
          <div class="empty-icon"></div>
          <p>{{emptyTip}}</p>
        </slot>
      </div>
    </div>
    <component :is="tag" v-else>
      <slot></slot>
    </component>
  </transition>

  <div class="status-cell" v-else-if="status === 'loading'" key="status-loading" :style="`height: ${height}`">
    <div class="loading-contianer">
      <div class='gl-loading-main vue-loader'>
        <div class='tri invert'></div>
        <div class='tri invert'></div>
        <div class='tri'></div>
        <div class='tri invert'></div>
        <div class='tri invert'></div>
        <div class='tri'></div>
        <div class='tri invert'></div>
        <div class='tri'></div>
        <div class='tri invert'></div>
      </div>
      <!--<div class="ring"></div>-->
      <p>{{loadingTip}}</p>
    </div>
  </div>
  <div class="status-cell" v-else-if="!hasData" key="status-empty" :style="`height: ${height}`">
    <div class="empty-container">
      <slot name="empty-tip" v-if="emptyTip">
        <div class="empty-icon"></div>
        <p>{{emptyTip}}</p>
      </slot>
    </div>
  </div>
  <component :is="tag" v-else>
    <slot></slot>
  </component>
</template>

<script>
  export default {
    name: 'status-cell',

    // render(createElement) {
    //   if (this.hasData) {
    //     return createElement(
    //       this.tag
    //     )
    //   } else {
    //     return createElement(
    //       'div', {
    //         'class': {
    //           status: true
    //         }
    //       }
    //     )
    //   }
    // },

    props: {
      hasData: {
        Type: Boolean,
        default: true,
      },
      //loading completed
      status: {
        default: 'loading'
      },
      loadingTip: {
        default: '加载中，请稍后...',
      },
      emptyTip: {
        default: '亲，暂时没有记录!'
      },
      tag: {
        type: String,
        default: 'div'
      },
      height: {
        type: String,
        default: ''
      },

      transition: {
        type: Boolean,
        default: true,
      }
    }
  };
</script>

<style lang="scss" scoped>
  .status-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .partial-loader {
    overflow: hidden;
    font-size: 90px;
    width: 1em;
    height: 1em;
    margin: 40% auto;
    border-radius: 50%;
    animation: loadingA 1.7s infinite ease;
  }


  .vue-loader {
    position: static;
    transform: translate(0, 0);
    margin: 20px 10px;
  }


  $color: #c4c4c4;
  .ring {
    width: 10px;
    height: 10px;
    margin: 15px auto;
    padding: 10px;
    border: 7px dashed $color;
    border-radius: 100%;
    animation: loadingD 1.5s cubic-bezier(.17, .37, .43, .67) infinite;
  }


  @keyframes loadingA {
    0% {
      transform: rotate(0deg);
      box-shadow: -0.11em -0.83em 0 -0.4em $color, -0.11em -0.83em 0 -0.42em $color, -0.11em -0.83em 0 -0.44em $color, -0.11em -0.83em 0 -0.46em $color, -0.11em -0.83em 0 -0.477em $color;
    }
    5%,
    95% {
      box-shadow: -0.11em -0.83em 0 -0.4em $color, -0.11em -0.83em 0 -0.42em $color, -0.11em -0.83em 0 -0.44em $color, -0.11em -0.83em 0 -0.46em $color, -0.11em -0.83em 0 -0.477em $color;
    }
    30% {
      box-shadow: -0.11em -0.83em 0 -0.4em $color, -0.51em -0.66em 0 -0.42em $color, -0.75em -0.36em 0 -0.44em $color, -0.83em -0.03em 0 -0.46em $color, -0.81em 0.21em 0 -0.477em $color;
    }
    55% {
      box-shadow: -0.11em -0.83em 0 -0.4em $color, -0.29em -0.78em 0 -0.42em $color, -0.43em -0.72em 0 -0.44em $color, -0.52em -0.65em 0 -0.46em $color, -0.57em -0.61em 0 -0.477em $color;
    }
    100% {
      transform: rotate(360deg);
      box-shadow: -0.11em -0.83em 0 -0.4em $color, -0.11em -0.83em 0 -0.42em $color, -0.11em -0.83em 0 -0.44em $color, -0.11em -0.83em 0 -0.46em $color, -0.11em -0.83em 0 -0.477em $color;
    }
  }

  @keyframes loadingD {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  //空表单页面
  .empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .empty-icon {
      background-image: url(./empty.png);
      width: 204px;
      height: 174px;
      margin-bottom: 15px;
    }
  }

  p {
    font-size: 14px;
    color: #666666;
  }
</style>
