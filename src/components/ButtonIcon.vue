<template>
  <button>
      <slot></slot>
  </button>
</template>

<script>
  export default {
    name:'ButtonIcon'
  }
</script>

<style lang="scss" scoped>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin: 4px;
    cursor: pointer;
    border-radius: 25%;
    border: none;
    background: #fff;
    &:hover {
      background: var(--color-secondary-bg-for-transparent);
    }
    :slotted( .svgIcon ) {
    width: 15px;
    height: 15px;
   }
  }
</style>