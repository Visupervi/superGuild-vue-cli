<template>
    <div class="testWs">
      <button type="button" class="mui-btn mui-btn-primary" @click="clickHandler">蓝色</button>
    </div>
</template>

<script>
  export default {
    name: "testWs",
    data(){
      return{
        count:0
      }
    },
    created(){

    },
    methods:{

      clickHandler(){
        const ws= "ws://localhost:8080/SSMMaven_war_exploded/apis/wsTest";
        this.websock = new WebSocket(ws);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;

      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.heartHandler();
        // this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.clickHandler();
      },
      websocketonmessage(e){ //数据接收
        const redata = JSON.parse(e.data);
        console.log("redata",redata);
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      heartHandler(){
        setInterval(()=>{
          // this.clickHandler();
          this.count++
          this.websocketsend(JSON.stringify({"test":this.count}))
        },3000)
      }
    }
  }
</script>

<style scoped>

</style>
