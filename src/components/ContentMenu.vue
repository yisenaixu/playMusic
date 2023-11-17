<template>
  <div class="content-menu">
    <div 
      v-if="isOpen"
      tabindex="-1"
      ref="menu" 
      class="menu"
      :style="{top:top, left: left}"
      @blur='closeMenu'
      @click="closeMenu"
      >
       <slot></slot>
    </div> 
  </div>
</template>

<script>
import { nextTick } from 'vue';
export default {
    data() {
        return {
            isOpen: false,
            top: '0px',
            left: '0px'
        }
    },
    methods: {
      closeMenu() {
        console.log('modal close');
        this.isOpen = false
      },
      setMenu(top, left) {
        this.top = top + 'px';
        this.left = left + 'px'
      },
      async openMenu(e) {
        this.setMenu(e.y, e.x);
        this.isOpen = true;
        await nextTick();
        console.log(this.$refs.menu);
        console.log(this.$refs);
        this.$refs.menu.focus();
        console.log('focus');
      }
    }
}
</script>

<style scoped>
    .menu {
        position: fixed;
        user-select: none;
        cursor: pointer;
        min-width: 128px;
        max-width: 256px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        padding: 0px;
        z-index: 1000;
        box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.08);
    }
    .menu:focus {
        outline: none;
    }
    :slotted(.menu .item){
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 800;
        padding: 8px;
        /* margin: 4px 0; */
  }
  :slotted(.menu .item:hover) {
    background: var(--color-primary-bg);
  }
  :slotted(.menu .item .svg-icon) {
    width: 16px;
    height: 16px;
    margin-right: 8px;
 }
</style>