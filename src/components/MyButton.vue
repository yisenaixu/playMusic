<template>
    <button :style="buttonStyle" :class="color">  
      <svg-icon
        v-if="symbolId !== null"
        :symbolId="symbolId"
        className="svgIcon"
        :style="{ marginRight: iconButton ? '0px' : '8px' }"
      ></svg-icon>
      <slot></slot>
    </button>
  </template>
  
  <script>
import SvgIcon from './SvgIcon.vue';
export default {
    components: { SvgIcon },
    name: 'MyButton',
    props: {
    symbolId: {
      type: String,
      default: null,
    },
    iconButton: {
      type: Boolean,
      default: false,
    },
    horizontalPadding: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: 'blue',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '',
    },
    shape: {
      type: String,
      default: 'square',
    },
  },
    mounted() {
        console.log(this.symbolId);
    },
    computed: {
      buttonStyle() {
        let styles = {
          borderRadius: this.shape === 'round' ? '50%' : '8px',
          padding: `8px ${this.horizontalPadding}px`,
          // height: "38px",
          width: this.shape === 'round' ? '38px' : 'auto',
        };
        if (this.backgroundColor !== '')
          styles.backgroundColor = this.backgroundColor;
        if (this.textColor !== '') styles.color = this.textColor;
        return styles;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  button {
    height: 40px;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    background-color: var(--color-primary-bg);
    color: var(--color-primary);
    margin-right: 12px;
    transition: 0.2s;
    border: none;
    cursor: pointer;
    user-select: none;
    .svgIcon {
      width: 16px;
      height: 16px;
    }
    &:hover {
      transform: scale(1.12);
    }
    &:active {
      transform: scale(0.89);
    }
  }

  button.grey {
    background-color: var(--color-secondary-bg);
    color: var(--color-text);
    opacity: 0.78;
  }
  button.transparent {
    background-color: transparent;
  }
  </style>
  