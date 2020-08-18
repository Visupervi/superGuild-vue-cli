<template>
  <div class="home">
    <ul>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
      <li>1212121212</li>
    </ul>
<!--    <vueMiniPlayer ref="vueMiniPlayer" :video="video" :mutex="true" @fullscreen="handleFullscreen"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import myPlayer from '../components/videoPlayer'
export default {
  name: 'home',
  data(){
    return{
      video: {
        url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        cover: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
        muted: false,
        loop: false,
        preload: 'metadata',
        poster: '',
        volume: 1,
        autoplay: false
      },
      playerOptions: {
        // videojs options
        muted: false,
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        // controls:false,
        autoplay:false,
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          // src: require("../assets/video/Smiling.mp4")
        }],
        poster: require("../assets/logo.png"),
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          audio:false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  created(){},
  mounted(){
    // console.log("this.$refs.videoPlayer",this.$refs.videoPlayer);
    window.addEventListener("resize",this.renderResize,false);
    window.addEventListener("resize",this.renderResize,false);
  },
  computed:{
    // player() {
    //   return this.$refs.videoPlayer.player
    // },
  },
  methods:{
    handleFullscreen(){

    },
    onPlayerPlay(player) {
      // console.log('player play!', player)
      console.log("开始")
    },
    // onPlayerPause(player) {
    //   console.log("暂停");
    //   // console.log('player pause!', player)
    // },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      // console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    onPlayTimeupdate(player){
      // console.log("监听播放时间",player);
      // if(player.cache_.currentTime / player.cache_.duration > 0.3){
      //   this.onPlayerPause(player)
      // }
    },
  },
  components: {
    // HelloWorld
    myPlayer
  }
}
</script>
<style lang="less">
  .home{
    position: relative;
    height: 100%;
    overflow-x: scroll;
    .video-js{
      .vjs-big-play-button{
        width: 1.5em;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 50%;
      }
      .vjs-progress-control{
        display: none;
      }
      .vjs-volume-panel{
        display: none;
      }
      .vjs-fullscreen-control{
        right: -15rem;
      }
    }
    ul {
      width: 1000px;
      display: flex;
      li {
        float: left;
      }
    }
  }
</style>
