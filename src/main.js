// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import  'echarts/theme/macarons.js'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import httpRequest from './utils/httpRequest';
import vueSeamlessScroll from 'vue-seamless-scroll';
import tagCloud from 'v-tag-cloud'

Vue.prototype.axios=axios;
Vue.prototype.vueSeamlessScroll=vueSeamlessScroll;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(tagCloud)

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法

//指标请求

Vue.prototype.$index = function(indName,prtName){
  var $this = this
  return new Promise((resolve, reject) => {
    this.$http({
      url: $this.$http.adornUrl("/t08basicesdata/list"),
      method: 'get',
      params: $this.$http.adornParams({
        indexName:encodeURIComponent(indName),
        parentIndexName:encodeURIComponent(prtName||'')
      })
    }).then(({data}) => {
      if(data.code != 0){
        $this.$message({
          showClose: true,
          message: data.msg,
          type: 'warning'
        });
        return;
      }
      resolve(data.data);
    }).catch(function (error) {
      reject(error);
      console.error(error);
    });
  });
}
Vue.prototype.convertData = function(data, xdim, sarr) {
  xdim = xdim || 'areaName';
  sarr = sarr || ['stateNumGrowth'];
  let store = {xdata:[],sdata:[]};
  store.xdata = Array.from(new Set(data.map(d=>{return d[xdim]})));
  sarr.forEach(name=>{
    let a = data.map(d=>{return d[name]})
    store.sdata.push(a)
  })
  return store
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
