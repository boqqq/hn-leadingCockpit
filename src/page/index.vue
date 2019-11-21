<template>
  <div id="index">
    <div class = "chart_main">
    <el-row>
      <el-col :span="8">
        <div class = "chart_main">
          <div class = "chart_child" style="margin: 0vh 1vh 0 2vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>财政收入规模</h3>
            </div>
            <div class = "chart" id = "chart1"></div>
          </div>
          <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>财政收支平衡度</h3>
            </div>
            <div class = "chart" id = "chart2"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class = "chart_main">
           <el-row>
             <el-col :span="19">
               <div class="map_title">
                 <div><h4>营商环境总分及排名</h4></div>
                 <div><h4>财政能力</h4></div>
                 <div><p :class = "radio == 1?'p_active':''" @click = "mapChange(1)">财政收支规模&nbsp;&nbsp;</p></div>
                 <div><p :class = "radio == 2?'p_active':''" @click = "mapChange(2)">财政收支平衡度</p></div>
               </div>
               <div  id = "map" class = "chart_map  main_map"></div>
             </el-col>
             <el-col :span="5">
               <div class = "chart_bar" style="margin-right: 2vh">
                 <div class="pop_col_tit">
                   <i class="tit_icon icon-tit-line"></i>
                   <h3>财政能力构成指标因子贡献</h3>
                 </div>
                 <div id = "chart3" style="height: 82vh"></div>
               </div>
             </el-col>
           </el-row>
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
    name:"index",
    components: {

    },
  data(){
      return{
        pop_month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        radio:1,
      }
    },
    components: {
    },

    mounted () {
      this.chart1();
      this.chart2();
      this.map();
      this.chart3();
    },
    methods: {
      chart1(){
        var chart1=echarts.init(document.getElementById('chart1'));
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
        chart1.setOption(option);
        window.onresize = chart1.resize;
      },
      chart2(){
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
          '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var chart2=echarts.init(document.getElementById('chart2'));
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
            yAxis: [
              {
                type: 'value',
                position: 'right',
                splitLine: {
                  lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                  }
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  inside: false,
                  textStyle: config().textStyle
                },
              }
            ],
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#6A989E',
                  }
                },
                axisLabel: {
                  inside: false,
                  textStyle: config().textStyle
                },
                data:xData,
              }
            ],
            series: [
              {
                symbolSize: config().fontSize*12,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
                name: '平衡度',
                type: "line",
                data: data1,
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    color: '#03CDB4',
                  }
                }
              }
            ],
          };
        chart2.setOption(option);
        window.onresize = chart2.resize;
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
       var chart3 = echarts.init(document.getElementById('chart3'));
        var legendData = ['财政收入规模', '财政收支平衡度'];
        var datamax = [100,100,100,100,100,100],
          data1 = [96, 94, 92, 91, 90, 85, 82, 82, 81, 80, 76, 75, 73, 71, 66, 64, 62, 61, 58],
          data2 = [96, 94, 92, 91, 90, 85, 82, 82, 81, 80, 76, 75, 73, 71, 66, 64, 62, 61, 58];
        var option = {
          tooltip: {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            top: '3%',
            left: '10%',
            textStyle: config().textStyle,
            itemWidth: config().fontSize,
            itemHeight: config().fontSize,
            data: legendData
          },
          grid: {
            left: '5%',
            right: '15%',
            bottom: '8%',
            top:'10%',
            containLabel: true
          },
          xAxis: {
            axisLabel: {
              show: false,
              margin: 10,
              textStyle:config().textStyle,
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }

          },
          yAxis: [{
            data: yData,
            axisLabel: {
              textStyle:config().textStyle,
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }],
          series: [{
            type: 'bar',
            name: legendData[0],
            stack: '2',
            legendHoverLink: false,
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: '#7E47FF'
              },
              emphasis: {
                color: '#7E47FF'
              }
            },
            data: data1
          }, {
            type: 'bar',
            name: legendData[1],
            stack: '2',
            legendHoverLink: false,
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: '#FD5916'
              },
              emphasis: {
                color: '#FD5916'
              }
            },
            data: data2
          }]
        };
        chart3.setOption(option);
        window.onresize = chart3.resize;
      }
    }
  }
</script>
<style lang="scss" scoped>
  body{
    background-position:right;
    background-size: 80% 100%;
  }
  #index{
    .chart_main{
      height: 88vh;
      width: 100%;
    }
    .chart_child{
      height: 43vh;
      background-color: #0C1752;
    }
    .chart{
      width: 100%;
      height: 38vh;
    }
    .main_map{
      background-image:url('../../static/img/map-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .chart_map{
      height: 88vh;
    }
    .chart_bar{
      height: 88vh;
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
      div:nth-child(3), div:nth-child(4){
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
