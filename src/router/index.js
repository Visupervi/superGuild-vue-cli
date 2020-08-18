import Vue from 'vue';
import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);
let routes = [];
const routerContext = require.context(
  // 其组件目录的相对路径
  '../pages',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.router.js/
);
routerContext.keys().forEach((router)=>{
  // console.log(router)
  if(router.startsWith("./myStudy") || router.startsWith("./mobileMap")) return;
  const routerModule = routerContext(router);
  // routes = routes.concat(routerModule.default)
  routes = [...routes,...(routerModule.default||routerModule)]
  // routes.push(...routes)
});

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});
export default router
