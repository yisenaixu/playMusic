<template>
  <div class="library">
    <h1>
      <img class="avatar" src="" alt="" loading="lazy" />
      {{}}的音乐库
    </h1>
    <div class="section-one">
      <div class="flex-wrap">
        <div class="like-songs">
          <div class="lyrics"></div>
          <div class="bottom">
            <div class="text">
              我喜欢的音乐
              <div class="subtext">?首歌</div>
            </div>
            <div class="button">
              <button @click.stop="play" class="play-button">
                <svgIcon symbolId="icon-play" className="svgIcon" />
              </button>
            </div>
          </div>
        </div>
        <div class="tracklist">
          <TrackList
            type="tracklist"
            :columnNumber="4"
            :songs="[{}, {}, {}, {}, {}]"
            :isShowTime="false"
          />
        </div>
      </div>
    </div>
    <div class="section-two">
      <div class="tabs">
        <div class="tab button">
          创建的歌单 &nbsp;
          <SvgIcon
            symbolId="icon-arrow-down"
            className="svgIcon"
            @click.stop="(e) => $refs.playlistTabMenu.openMenu(e)"
          />
        </div>
        <div class="tab button">专辑</div>
        <div class="tab button">艺人</div>
        <div class="tab button">MV</div>
        <div class="tab button">云盘</div>
        <div class="tab button">听歌排行</div>
      </div>
    </div>
    <ContentMenu ref="playlistTabMenu">
      <div class="item">全部歌单</div>
      <div class="item">创建的歌单</div>
      <div class="item">收藏的歌单</div>
    </ContentMenu>
  </div>
</template>

<script>
import ContentMenu from "../components/ContentMenu.vue";
import SvgIcon from "../components/SvgIcon.vue";
import TrackList from "../components/TrackList.vue";
export default {
  name: "library",
  components: { TrackList, SvgIcon, ContentMenu },
  data() {
    return {
      currentTab: "",
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.library {
  padding: 0 10vw;
  min-width: 1320px;
  .section-one {
    height: 280px;
    .flex-wrap {
      height: 100%;
      display: flex;
      .like-songs {
        flex: 3;
        margin-right: 20px;
        border-radius: 16px;
        background: var(--color-primary-bg-for-transparent);

        display: flex;
        flex-direction: column;
        .lyrics {
          flex: 1;
        }
        .bottom {
          display: flex;
          padding: 8px;
          .text {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 600;
            color: var(--color-primary);
            .subtext {
              font-size: 16px;
              font-weight: 400;
            }
          }
          .button {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .play-button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 50px;
              height: 50px;
              color: white;
              backdrop-filter: blur(8px);
              background: var(--color-primary);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 50%;
              cursor: default;
              transition: all 0.2s;
            }
          }
        }
      }
      .tracklist {
        flex: 7;
      }
    }
  }
  .section-two {
    margin-top: 20px;
    .tabs {
      display: flex;
      .active {
        background-color: var(--color-secondary-bg);
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 8px 8px;
        padding: 8px 16px;
        border-radius: 10px;
        user-select: none;
        color: var(--color-secondary);
        transition: 0.2s;
        font-size: 20px;
        font-weight: 700;

        &:hover {
          background-color: var(--color-primary-bg);
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>