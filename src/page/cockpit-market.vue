<template>
  <div id="index">
    <div class = "main">
      <el-row>
        <el-col :span="6">
          <div class = "chart_main">
            <div class = "chart_child" style="margin: 0vh 1vh 0 2vh">
              <div class="pop_col_tit">
                <i class="tit_icon icon-tit-line"></i>
                <h3>规模以上工业企业单位数</h3>
              </div>
              <div class = "chart" id = "chart1"></div>
            </div>
            <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
              <div class="pop_col_tit">
                <i class="tit_icon icon-tit-line"></i>
                <h3>规模以上工业总产值占GDP比重</h3>
              </div>
              <div class = "chart" id = "chart2"></div>
            </div>
            <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
              <div class="pop_col_tit">
                <i class="tit_icon icon-tit-line"></i>
                <h3>人均GDP</h3>
              </div>
              <div class = "chart" id = "chart3"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class = "chart_main">
            <el-row>
              <el-col :span="24">
                <div class="map_title map_tab">
                  <div><h4>市场环境</h4></div>
                  <el-select class="selectbox" popper-class="selectpop" v-model="radio" placeholder="请选择" clearable size="mini" @change="map">
                    <el-option
                      v-for="(item,index) in mapDim"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </div>
                <div  id = "map" class = "chart_map  main_map"></div>
              </el-col>
              <el-col :span="24">
                <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
                  <div class="pop_col_tit">
                    <i class="tit_icon icon-tit-line"></i>
                    <h3>市场环境构成指标因子贡献</h3>
                  </div>
                  <div class = "chart" id = "chart7"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class = "chart_main">
            <div class = "chart_child" style="margin: 0vh 1vh 0 2vh">
              <div class="pop_col_tit">
                <i class="tit_icon icon-tit-line"></i>
                <h3>全社会固定资产投资额</h3>
              </div>
              <div class = "chart" id = "chart4"></div>
            </div>
            <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
              <div class="pop_col_tit">
                <i class="tit_icon icon-tit-line"></i>
                <h3>实际利用外资金额占GDP比重</h3>
              </div>
              <div class = "chart" id = "chart5"></div>
            </div>
            <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
              <div class="pop_col_tit">
                <i class="tit_icon icon-tit-line"></i>
                <h3>社会消费品额</h3>
              </div>
              <div class = "chart" id = "chart6"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import 'font-awesome/css/font-awesome.min.css';
    import {config} from '../../static/js/config/chartConfig.js';
    var echarts = require('echarts');
    import hainan from '../../static/js/json/hainan.json';
    export default {
      name: "cockpit-market",
      data(){
        return{
          pop_month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          radio:0,
          mapDim:[
            '规模以上工业企业单位数',
            '规模以上工业总产值占GDP比重',
            '人均GDP',
            '全社会固定资产投资额',
            '实际利用外资金额占GDP比重',
            '社会消费品额',
          ]
        }
      },
      components: {
      },
      mounted () {
        this.$index('规模以上工业企业单位数').then(this.chart1);
        this.chart2();
        this.map();
        this.chart3();
        this.chart4();
        this.chart5();
        this.chart6();
        this.chart7();
      },
      methods: {
        chart1(data){
          var store = this.convertData(data)
          var chart=echarts.init(document.getElementById('chart1'));
          var option = {
            tooltip: {
              trigger: 'axis',
              textStyle: config().textStyle,
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '8%',
              top:'20%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: store.xdata,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle:config().textStyle,
              },
            }],
            yAxis: [{
              axisLabel: {
                formatter: '{value}',
                textStyle:config().textStyle,
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
                }
              }
            }],
            series: [{
              type: 'bar',
              data: store.sdata[0],
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: '#0263FF',
                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                }
              }
            }]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
        chart2(){
          var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
          var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
          var chart=echarts.init(document.getElementById('chart2'));
          var unit1 = '%';
          var option = {
            tooltip : {
              trigger: 'axis',
              textStyle: config().textStyle,
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function(params) {
                var result = params[0].name
                result +=
                  '<br/>' + params[0].data+ unit1
                return result
              }
            },
            grid:{
              top:'20%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              axisLabel: {
                margin: config().fontSize,
                textStyle: config().textStyle,
              },
              data:xData
            }],
            yAxis: [{
              type: 'value',
              name: unit1,
              nameTextStyle:{
                color:config().textStyle.color,
                fontSize:config().textStyle.fontSize,
                padding:[0,26,0,0]
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              axisLabel: {
                margin: config().fontSize,
                textStyle: config().textStyle,
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
              }
            }],
            series: [{
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 2
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(16,97,204,.2)'
                  }, {
                    offset: 1,
                    color:'rgba(16,97,204,.2)'
                  }], false),
                  shadowColor:  'rgba(17,235,210,.2)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#0e55b7'
                  }, {
                    offset: 1,
                    color: '#0fd9c7'
                  }])
                },
                emphasis: {
                  color: 'rgb(0,196,132)',
                  borderColor: 'rgba(0,196,132,0.2)',
                  extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                  borderWidth: 10,

                },
              },
              data:data1
            }, ]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
        mapChange(val){
          this.radio = val
          this.map();
        },
        map(){
          var map=echarts.init(document.getElementById('map'));
          let geoCoordMap= {
            '海口市': [110.326837, 20.031624],
            '三亚市': [109.524255, 18.256929],
            '三沙市': [112.351689, 16.838364],
            '儋州市': [109.565074, 19.533091],
            '五指山市': [109.52483, 18.780731],
            '文昌市': [110.932715, 19.616634],
            '琼海市': [110.480832, 19.255009],
            '万宁市': [110.396559, 18.802845],
            '东方市': [108.65629, 19.100448],
            '定安县': [110.359209, 19.683308],
            '屯昌县': [110.108546, 19.357035],
            '澄迈县': [110.010062, 19.744893],
            '临高县': [109.688244, 19.916212],
            '白沙黎族自治县': [109.455171, 19.233017],
            '昌江黎族自治县': [109.063039, 19.30236],
            '乐东黎族自治县': [109.179933, 18.756966],
            '陵水黎族自治县': [110.042739, 18.512332],
            '保亭黎族自治县': [109.706931, 18.647458],
            '琼中黎族自治县': [109.846811, 19.038617]
          }
          let data=[]
          var tip = this.mapDim[this.radio]
          if(this.radio==1||this.radio==3||this.radio==5||this.radio==7){
            data = [
              {name: '海口市', value: 1 },
              {name: '三亚市', value: 2 },
              {name: '三沙市', value: 3 },
              {name: '儋州市', value: 4 },
              {name: '五指山市', value: 5 },
              {name: '文昌市', value: 6 },
              {name: '琼海市', value: 7 },
              {name: '万宁市', value: 8 },
              {name: '东方市', value: 9 },
              {name: '定安县', value: 10 },
              {name: '屯昌县', value: 11 },
              {name: '澄迈县', value: 12 },
              {name: '临高县', value: 13 },
              {name: '白沙黎族自治县',value: 14 },
              {name: '昌江黎族自治县', value: 15 },
              {name: '乐东黎族自治县', value: 16 },
              {name: '陵水黎族自治县', value: 17 },
              {name: '保亭黎族自治县', value: 18 },
              {name: '琼中黎族自治县', value: 19 },

            ];
          }else{
            data = [
              {name: '海口市', value: 2 },
              {name: '三亚市', value: 4 },
              {name: '三沙市', value: 6 },
              {name: '儋州市', value: 12 },
              {name: '五指山市', value: 24 },
              {name: '文昌市', value: 48 },
              {name: '琼海市', value: 96 },
              {name: '万宁市', value: 192 },
              {name: '东方市', value: 96 },
              {name: '定安县', value: 48 },
              {name: '屯昌县', value: 24 },
              {name: '澄迈县', value: 12 },
              {name: '临高县', value: 6 },
              {name: '白沙黎族自治县',value: 4 },
              {name: '昌江黎族自治县', value: 3 },
              {name: '乐东黎族自治县', value: 2 },
              {name: '陵水黎族自治县', value: 1 },
              {name: '保亭黎族自治县', value: 18 },
              {name: '琼中黎族自治县', value: 19 },
            ];
          }
          let dataValues=[];

          for(let i=0;i<data.length;i++){
            dataValues.push(data[i]['value']);
          }
          let max = Math.max.apply(null, dataValues);
          let min = Math.min.apply(null, dataValues);

          //取得json的样式，读取json文件
          echarts.registerMap('hainan', hainan)
          let handleData = function(data) {
            let list = [];
            for (let i = 0; i < data.length; i++) {
              let geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                list.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return list;
          };
          let option = {
            baseOption: {
              timeline: {
                show: false,
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b}<br/> '+tip+': {c} 万人',
                textStyle: config().textStyle,
              },
            },
            options: [{
              visualMap: {
                min: min,
                max: max,
                left: '8%',
                bottom: '2%',
                text: [max, min],
                calculable: true,
                inRange: {
                  color: ['#4887FE', '#235ECD', '#0138A1']
                },
                textStyle: config().textStyle,
                itemWidth: 20,
                itemHeight: 150,
              },
              geo: {
                show: true,
                map: 'hainan',
                layoutSize: "300%",
                zoom:9,
                //top:'-3%',
                center: [109.68983,19.13139],
                label: {
                  normal: {
                    show: true,
                    textStyle: config().textStyle
                  },
                  emphasis: {
                    show: true,
                    textStyle: config().textStyle,
                  }
                },
                roam: true,
                itemStyle: {
                  normal: {
                    areaColor: 'transparent',
                    borderColor: '#02308d',
                    borderWidth: 1,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 30
                  },
                  emphasis: {
                    areaColor: '#e2d445',
                  }
                }
              },
              "series": [
                {
                  name: "mapSer",
                  type: "map",
                  roam: false,
                  geoIndex: 0,
                  data: data
                }
              ]
            }]
          }
          map.setOption(option);
          window.onresize = map.resize;
        },
        chart3() {
          var yData = ['海口市', '三亚市', '三沙市', '儋州市', '五指山市', '文昌市', '琼海市', '万宁市',
            '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙', '昌江', '乐东', '陵水', '保亭', '琼中'];
          var chart = echarts.init(document.getElementById('chart3'));
          var lengendData = ['人均GDP']
          var datamax = [100,100,100,100,100,100],
            data1 = [96, 94, 92, 91, 90, 85, 82, 82, 81, 80, 76, 75, 73, 71, 66, 64, 62, 61, 58],
            data2 = [96, 94, 92, 91, 90, 85, 82, 82, 81, 80, 76, 75, 73, 71, 66, 64, 62, 61, 58];
          var option = {
            color: ['#3D91F7', '#61BE67'],
            tooltip: {
              trigger: 'item',
              textStyle: config().textStyle
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '8%',
              top:'5%',
              containLabel: true
            },
            angleAxis: {
              type: 'category',
              data: yData,
              axisLabel:{
                fontSize:config().fontSize,
                color:'#fff'
              },
              axisTick:{
                lineStyle:config().lineStyle
              }
            },
            radiusAxis: {
              type: 'value',
              axisLabel:{
                fontSize:config().fontSize,
                color:'#fff'
              },
              axisTick:{
                lineStyle:config().lineStyle
              }
            },
            polar: {
            },
            series: [
              {
                coordinateSystem: 'polar',
                type: 'line',
                data: data1,
                areaStyle: {
                  normal: {
                    color: 'rgba(54,107,175,.3)'
                  },
                },
              }
            ]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
        chart4(){
          var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
          var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
          var chart=echarts.init(document.getElementById('chart4'));
          var unit1 = '亿元';
          var option = {
            tooltip : {
              trigger: 'axis',
              textStyle: config().textStyle,
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function(params) {
                var result = params[0].name
                result +=
                  '<br/>' + params[0].data+ unit1
                return result
              }
            },
            grid:{
              top:'20%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              axisLabel: {
                margin: config().fontSize,
                textStyle: config().textStyle,
              },
              data:xData
            }],
            yAxis: [{
              type: 'value',
              name: unit1,
              nameTextStyle:{
                color:config().textStyle.color,
                fontSize:config().textStyle.fontSize,
                padding:[0,26,0,0]
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              axisLabel: {
                margin: config().fontSize,
                textStyle: config().textStyle,
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
              }
            }],
            series: [{
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 2
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(16,97,204,.2)'
                  }, {
                    offset: 1,
                    color:'rgba(16,97,204,.2)'
                  }], false),
                  shadowColor:  'rgba(17,235,210,.2)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#0e55b7'
                  }, {
                    offset: 1,
                    color: '#0fd9c7'
                  }])
                },
                emphasis: {
                  color: 'rgb(0,196,132)',
                  borderColor: 'rgba(0,196,132,0.2)',
                  extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                  borderWidth: 10,

                },
              },
              data:data1
            }, ]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
        chart5(){
          var chart=echarts.init(document.getElementById('chart5'));
          var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
          var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
          var option = {
            tooltip: {
              trigger: 'axis',
              textStyle: config().textStyle,
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '8%',
              top:'20%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: xData,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle:config().textStyle,
              },
            }],
            yAxis: [{
              axisLabel: {
                formatter: '{value}',
                textStyle:config().textStyle,
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
                }
              }
            }],
            series: [{
              type: 'bar',
              data: data1,
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: '#0263FF',
                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                }
              }
            }]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
        chart6(){
          var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
          var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
          var chart=echarts.init(document.getElementById('chart6'));
          var unit1 = '亿元';
          var option = {
            tooltip : {
              trigger: 'axis',
              textStyle: config().textStyle,
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function(params) {
                var result = params[0].name
                result +=
                  '<br/>' + params[0].data+ unit1
                return result
              }
            },
            grid:{
              top:'20%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              axisLabel: {
                margin: config().fontSize,
                textStyle: config().textStyle,
              },
              data:xData
            }],
            yAxis: [{
              type: 'value',
              name: unit1,
              nameTextStyle:{
                color:config().textStyle.color,
                fontSize:config().textStyle.fontSize,
                padding:[0,26,0,0]
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.5)'
                }
              },
              axisLabel: {
                margin: config().fontSize,
                textStyle: config().textStyle,
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
              }
            }],
            series: [{
              type: 'line',
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 2
                }
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#0e55b7'
                  }, {
                    offset: 1,
                    color: '#0fd9c7'
                  }])
                },
                emphasis: {
                  color: 'rgb(0,196,132)',
                  borderColor: 'rgba(0,196,132,0.2)',
                  extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                  borderWidth: 10,

                },
              },
              data:data1
            }, ]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
        chart7(){
          var chart=echarts.init(document.getElementById('chart7'));
          var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
          var data1 = [96,35,65,51,44,67,66,17,17,15,7,13,24,29,33,47,59,66,81];
          var data2 = [96,75,34,44,54,78,20,22,9,23,8,13,20,29,39,40,57,61,51];
          var data3 = [96,65,32,38,40,80,34,33,16,7,22,13,33,29,51,42,63,56,71];
          var data4 = [66,55,17,96,11,34,72,12,11,12,12,13,45,29,35,55,70,46,31];
          var data5 = [46,35,67,78,19,58,19,21,29,21,16,13,16,29,49,67,69,49,51];
          var option = {
            tooltip: {
              trigger: 'axis',
              textStyle: config().textStyle,
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: { //图例的设置
              show: true, //是否显示图例
              //icon: 'circle',//图例形状，示例为原型
              top: '2%',//图例离底部的距离
              right:"4%",
              itemWidth: config().fontSize, // 图例标记的图形宽度。
              itemHeight: config().fontSize, // 图例标记的图形高度。
              itemGap: config().fontSize, // 图例每项之间的间隔。
              textStyle: config().textStyle,
              data: ['财政能力', '人力资源','市场环境','基础设施','公共服务'],//图例的名称数据
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '8%',
              top:'20%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: xData,
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle:config().textStyle,
              },
            }],
            yAxis: [{
              name:'',
              nameTextStyle: {
                color: '#fff',
                fontSize: config().fontSize,
                padding: [0, 0, 0, -config().fontSize*2.5],
              },
              axisLabel: {
                formatter: '{value}',
                textStyle:config().textStyle,
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,0.12)'
                }
              }
            }],
            series: [{
              name:'财政能力',
              type: 'bar',
              data: data1,
              stack:'1',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: '#388BFF',
                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                }
              }
            },
              {
                name:'人力资源',
                type: 'bar',
                data: data2,
                stack:'1',
                barWidth: '40%',
                itemStyle: {
                  normal: {
                    color: '#0263FF',
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                  }
                }
              },
              {
                name:'市场环境',
                type: 'bar',
                data: data3,
                stack:'1',
                barWidth: '40%',
                itemStyle: {
                  normal: {
                    color: '#F6931C',
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                  }
                }
              },
              {
                name:'基础设施',
                type: 'bar',
                data: data4,
                stack:'1',
                barWidth: '40%',
                itemStyle: {
                  normal: {
                    color: '#FFD52E',
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                  }
                }
              },
              {
                name:'公共服务',
                type: 'bar',
                data: data5,
                stack:'1',
                barWidth: '40%',
                itemStyle: {
                  normal: {
                    color: '#00FFFF',
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                  }
                }
              }]
          };
          chart.setOption(option);
          window.onresize = chart.resize;
        },
      }
    }
</script>

<style lang="scss" scoped>
  $h-full: 88vh;
  body{
    background-position:right;
    background-size: 80% 100%;
  }
  #index{
    .chart_main{
      height: $h-full;
      width: 100%;
    }
    .chart_child{
      height: 28vh;
      background-color: #0C1752;
    }
    .chart{
      width: 100%;
      height: 23vh;
    }
    .main_map{
      background-image:url('../../static/img/map-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .chart_map{
      height: 58vh;
    }
    .map_title{
      position: absolute;
      width: 30vh;
      top: 6vh;
      left: 3vw;
      z-index: 10;
      color: #fff;
      div:nth-child(1) h4{
        font-size: 2.5vh;
        color: #fff;
        font-weight: bold;
        margin-left: 5%;
        line-height: 6vh;
      }
      div:nth-child(2) h4{
        font-size: 2.2vh;
        font-weight: bold;
        margin-left: 21%;
        line-height: 4vh;
        margin-top: 2vh;
      }
    }
    /deep/ .selectbox{
      .el-input .el-input__inner{
        font-size: 2vh;
        line-height: 4vh;
        color:#fff;
        border-radius: 2vh;
        background-color: #001DD0;
        border-color: #001DD0;
      }
    }

  }
</style>
<style lang="scss">
  .selectpop{
    color: #fff;
    background-color: #021274;
    border:none;
    font-size: 2vh;
    line-height: 4vh;
    &.el-popper > .popper__arrow, &.el-popper > .popper__arrow::after{
      border-bottom-color:#021274;
    }
    .el-select-dropdown__list {
      & > .el-select-dropdown__item {
        color: #fff;
      }

      & > .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background-color: #001DD0;
      }
    }
  }
</style>
