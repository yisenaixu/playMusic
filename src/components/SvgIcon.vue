<template>
    <svg :class="className">
       <use :href="iconName"></use>
    </svg>
</template>

<script>
  export default {
     name: 'SvgIcon',
     props: {
        symbolId: {
            type:String,
            required:true
        },
        className: {
            type: String,
            default: '',
        },
    },
    computed: {
        iconName() {
            return `#${this.symbolId}`
        }
    }
  }
</script>

<style scoped>
  .svgIcon {
    width: 15px;
    height: 15px;
  }
</style>