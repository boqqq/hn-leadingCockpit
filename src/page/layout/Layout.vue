<template>
    <div id="layout">
        <div class="charts">
          <div class="titleBoxs">

          </div>
            <div class="titleBox">
              <div class = "ind_title">
                <p>{{time}}</p>
              </div>
              <div v-for="(item, index) in nav" @click="routerLink(index, item.path)" class = "ind_title" :class="navIndex === index ? 'ind_title_active' : ''">
                <h4>{{item.title}}</h4>
              </div>
              <div class = "ind_title"></div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
export default {
    data(){
        return{
            time:'',
            nav: [
              {title: '首页', path: '/index'},
              {title: '财政能力', path: '/cockpitFinance'},
              {title: '人力资源', path: '/cockpitHuman'},
              {title: '海南领导人驾驶舱',path:''},
              {title: '市场环境', path: '/cockpitMarket'},
              {title: '基础设施', path: '/cockpitFacilities'},
              {title: '公共服务', path: '/cockpitService'},
            ],
            navIndex:1,
            title:'海南领导人驾驶舱',
            isCollapse:false,
        }
    },
    mounted () {
      this.currentPage()
      var that = this;
      setInterval(function () {
        var date = new Date();
        var h = (date.getHours()>9?date.getHours():"0"+date.getHours());
        var m = (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes());
        var s = (date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds());
        var month = date.getMonth()+1;
        that.time = date.getFullYear()+'年'+ month + '月' + date.getDate() + '日  ' + h +':'+ m +':'+ s+'  周'+"日一二三四五六".charAt(new Date().getDay());
        //alert(this.time)
      },500);
    },
    methods: {
      routerLink(index, path) {
        if(index != 3){
          this.navIndex = index;
          this.$router.push(path)
        }
        //this.threeGo()
      },

      currentPage(){
        var s = 0
        for (let i = 0; i < this.nav.length; i++) {
          if(this.nav[i].path == this.$route.path){
            this.navIndex  =  i;
            this.title = this.nav[i].title
          }
        }
        //return s;
      },
      checkRouterLocal(path) {
        // 查找当前路由下标高亮
        this.navIndex = this.nav.findIndex(item => item.path === path);
        console.log(path,"path")
      },
    },
    watch: {
        // "$route"() {
        //     let path = this.$route.path;
        //   alert(path)
        //     // 检索当前路径
        //     this.checkRouterLocal(path);
        // }
    },
}
</script>

<style lang="scss" scoped>
  .charts{
    overflow:auto;
    width: 100%;
    .selfont{
      background-color: #128eee;
    }
    .titleBoxs {
      width: 100%;
      height: 9.5vh;
      position: fixed;
      top: 0;
      z-index: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image:url('../../../static/img/title-bg.png');
    }

    .titleBox{
      width: 100%;
      height: 7vh;
      position: fixed;
      top: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ind_title{
        width: 7%;
        line-height: 7vh;
      }
      .ind_title:nth-child(1){
        height: 7vh;
        font-size: 2vh;
        color: #fff;
        text-align: center;
        p{
          margin-right: 10%;
          margin-top: 1vh;
        }
      }

      .ind_title:nth-child(2):hover{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title:nth-child(3):hover{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title:nth-child(4):hover{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title:nth-child(6):hover{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title:nth-child(7):hover{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title:nth-child(8):hover{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title_active{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image:url('../../../static/img/active.png');
      }
      .ind_title:nth-child(5){
        width: 20%;
      }
      .ind_title:nth-child(1),.ind_title:nth-child(9){
        width: 17%;
      }
      h4{
        font-size: 2.5vh;
        font-weight: bold;
        font-family: 'ºÚÌå',Verdana, Arial, Helvetica, AppleGothic, sans-serif;
        color: #9CA5D3;
        text-align: center;
      }
      div:nth-child(5) h4{
        font-size: 3.5vh;
        color: #fff;
      }
    }
  }

</style>
<style lang="scss">
  .el-switch__label{-webkit-transition:.2s;transition:.2s;font-size:2.3vh;font-weight:500;vertical-align:middle;color:#AFB8D2}
  .el-switch__label *{line-height: 0; font-size:2.3vh!important;display:inline-block}
  .el-switch__input{position:absolute;width:0;height:0;opacity:0;margin:0}
  .el-switch__core{margin:0;position:relative;width:7vh!important;height:3vh!important;border:1px solid #DCDFE6;outline:0;border-radius:3vh!important;-webkit-box-sizing:border-box;box-sizing:border-box;background:#DCDFE6;-webkit-transition:border-color .3s,background-color .3s;transition:border-color .3s,background-color .3s;vertical-align:middle}
  .el-switch__core:after{content:"";position:absolute;top:0.1vh!important;left:0.1vh!important;border-radius:100%;-webkit-transition:all .3s;transition:all .3s;width:2.6vh!important;height:2.6vh!important;background-color:#FFF}
  .el-switch.is-checked .el-switch__core::after{left:100%;margin-left:4vh!important;}
</style>
