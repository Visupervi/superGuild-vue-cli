<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="primary" size="large">大号按钮</van-button>
  </div>
</template>
<script>
  export default {
    name: 'about',
    data(){
      return{

      }
    },
    created(){},
    mounted(){},
    methods:{

    },
    components: {

    }
  }
</script>
<style lang="less" scoped>
.about{
  .van-button--large{
    height: 2.25rem;
    line-height: 2.25rem;
    width: 90%;
    border-radius: 0.2rem;
  }
}
</style>
