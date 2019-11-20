<template>
  <div id="index">
    <div class = "chart_main">
    <el-row>
      1234
    </el-row>
    </div>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css';
  import $ from 'jquery';
  import {config} from '../../static/js/config/chartConfig.js';
  var echarts = require('echarts');
  import '../../static/js/map/hainan.js';
  export default {
    name:"index",
    components: {

    },
  data(){
      return{
        pop_month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        }
    },
    components: {
    },

    mounted () {

    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
  #index{

  }
  </style>
