<template>
  <div class="settings">
    <div class="container">
      <div class="personal">
        <div class="left">
          <img
            class="avatar"
            :src="userData.user?.avatarUrl"
            alt=""
            loading="lazy"
          />
          <div class="info">
            <div class="name">{{ userData.user?.nickname }}</div>
            <div class="vip">黑胶vip</div>
          </div>
        </div>
        <div class="right">
          <mybutton symbolId="icon-logout"> 
            登出
          </mybutton>
        </div>
      </div>
      <div class="global">
        <!-- i18国际化  -->
        <div class="item">
            <div class="left">
              语言
            </div>
            <div class="right">
              <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
        </div>
        <!-- 黑暗模式 -->
        <div class="item">
            <div class="left">
              外观
            </div>
            <div class="right">
                <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
        </div>
      </div>
      <div class="music-quality">
        <div class="title">音质</div>
        <hr>
        <div class="item">
            <div class="left">
              音质选择
            </div>
            <div class="right">
              <select v-model="level">
                <option value="standard">标准</option>
                <option value="higher">较高</option>
                <option value="exhigh">极高</option>
                <option value="lossless">无损</option>
                <option value="hires">Hi-Res</option>
                <option value="jyeffect">高清环绕声</option>
                <option value="sky">沉浸环绕声</option>
                <option value="jymaster">超清母带</option>
              </select>
            </div>
        </div>
      </div>
      <div class="lyric">
        <div class="title">歌词</div>
        <hr>
        <div class="item">
            <div class="left">
              歌词字体大小
            </div>
            <div class="right">
              <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
        </div>
        <div class="other">
          <mybutton :iconButton="true" @click="clearLocal"> 
            清空本地存储
          </mybutton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import Mybutton from "../components/Mybutton.vue";
export default {
  components: { Mybutton },
  name: "settings",
  computed: {
    ...mapState(['userData','settings']),
    level:{
      get() {
        return this.settings.level ?? 'exhigh'
      },
      set(value) {
        if(value === this.settings.level) return;
        this.updateSettings({key: 'level', value })
      }
    }
  },
  methods: {
    ...mapMutations(['updateSettings']),
    clearLocal() {
      localStorage.clear()
    }
  }
};
</script>

<style lang="scss" scoped>
.settings {
  min-height: calc(100vh - 133px);
  padding: 0 10vw;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    max-width: 800px;
    padding: 16px 24px;
    .personal {
      display: flex;
      align-items: center;
      background: var(--color-secondary-bg-for-transparent);
      padding: 12px 24px;
      border-radius: 16px;
      .left {
        flex: 1;
        display: flex;
        justify-content: left;
        align-items: center;
        .avatar {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .info {
            .name {
                font-size: 20px;
                font-weight: 600;  
                margin-bottom: 4px;
            }
            font-size: 14px;
            font-weight: 200;
        }
      }
      .right {
        display: flex;
        justify-content: right;
      }
    }
  }
  .global,
  .music-quality,
  .lyric,
  .other {
    margin-top: 16px;
    .title {
        font-size: 24px;
        font-weight: 600;
    }
    .item {
        display: flex;
        padding: 16px 24px;
        font-size: 16px;
        font-weight: 300;
        .left {
          flex: 1;
          display: flex;
          align-items: center;
        }
        .right {
          flex: 1;
          display: flex;
          justify-content: right;
          align-items: center;
        } 
    }
  }
  .other {
    display: flex;
    justify-content: center;
  }
  select {
            background: var(--color-secondary-bg-for-transparent);
            color: var(--color-text);
            min-width: 150px;
            padding: 8px 12px;
            border-radius: 8px;
            border: none;
            appearance: none;
            outline: none;
          }
  hr {
    opacity: 0.3;
  }
}
</style>