<template>
  <div id="index">
    <div class = "chart_main">
      <el-row>
        <el-col :span="7">
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
        <el-col :span="10">
          <div class = "chart_main">
            <el-row>
              <el-col :span="24">
                <div class="map_title map_tab">
                  <div><h4>市场环境</h4></div>
                  <div v-for="(item,index) in mapDim" ><p :class = "radio == index?'p_active':''" @click = "mapChange(index)">{{item}}</p></div>
                </div>
                <div  id = "map" class = "chart_map  main_map"></div>
              </el-col>
              <el-col :span="24">
                <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
                  <div class="pop_col_tit">
                    <i class="tit_icon icon-tit-line"></i>
                    <h3>市场环境构成指标因子贡献</h3>
                  </div>
                  <div id = "chart7"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
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
    import '../../static/js/map/hainan.js';
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
        this.chart1();
        this.chart2();
        this.map();
        this.chart3();
        this.chart4();
        this.chart5();
        this.chart6();
        this.chart7();
      },
      methods: {
        chart1(){
          var chart=echarts.init(document.getElementById('chart1'));
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
          var tip = '财政收支规模'
          if(this.radio=='1'){
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
            tip = '财政收支平衡度'
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

          console.log(max, min) // 55,6
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
        chart7(){},
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
    .map_tab{
       div{
         margin-top: 2vh;
         p{
           width: 80%;
           margin-left: 5%;
           border-radius: 2vh;
           background-color: #021274;
           font-size: 2vh;
           line-height: 4vh;
           text-align: center;
         }
         p:hover{
           background-color: #001DD0;
         }
         .p_active{
           background-color: #001DD0;
         }
       }
     }
  }
</style>
