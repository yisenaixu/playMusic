<template>
      <div class="card">
      <div class="container">
         <!-- <img src="/.png" alt=""> -->
         <div class="img-box">
           <div class="img">
             <img src="./png" alt="">
           </div>
         </div>
         <div class="info">
            <div class="info-song">Moon Halo</div>
            <div class="info-singer">茶理理</div>
            <div class="button">
              <button>
                <svg-icon symbolId="icon-thumbs-down" className="svgIcon"></svg-icon>
              </button>
              <button>
                <svg-icon symbolId="icon-play" className="svgIcon"></svg-icon>
              </button>
              <button>
                <svg-icon symbolId="icon-next" className="svgIcon"></svg-icon>
              </button>
            </div>
            <div class="card-name"><svg-icon symbolId="icon-fm" className="svgIcon"/>私人FM</div>
         </div>
      </div>
   </div>
</template>

<script>
import SvgIcon from './SvgIcon.vue';
export default {
    name: 'FMCard',
    components: {SvgIcon}
}
</script>

<style scoped>
      .card {
        width: 80%;
        /* border: 1px solid black; */
        cursor: pointer;
        z-index: 1;
    }
    .container {
        border-radius: 16px;
        display: flex;
        position: relative;
        overflow: hidden;
        background: pink;
    }
    .container>img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%; 
        z-index: -1;
    }
    .img-box {
        flex-grow: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img {
        padding: 16px;
        box-sizing: border-box;
        width: 150px;
        height: 150px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
    }
    .img img {
        width: 100%;
        object-fit: cover;
    }
    .info {
        flex-grow: 2;
        position: relative;
    }
    .info .info-song {
      font-size: 22px;
      font-weight: 800;
      color: white;
      margin-top: 16px;
    }
    .info .info-singer {
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.33);
      margin-top: 8px;
    }
    .button {
        position: absolute;
        left: 16px;
        bottom: 16px;
     }
     .button button {
        margin: 0 8px;
        border: none;
        background: transparent;
     }
     .card-name {
        position: absolute;
        right: 8px;
        bottom: 16px;
        font-size: 14px;
        font-weight: 600;
        user-select: none;
        display: flex;
        align-items: center;
     }
</style>