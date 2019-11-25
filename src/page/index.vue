<template>
  <div id="index">
    <div class = "main">
    <el-row>
      <el-col :span="6">
        <div class = "chart_child" style="margin: 1vh 1vh 0 2vh">
          <div class="pop_col_tit">
            <i class="tit_icon icon-tit-line"></i>
            <h3>财政能力</h3>
          </div>
          <div class = "chart" id = "chart1"></div>
        </div>
        <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
          <div class="pop_col_tit">
            <i class="tit_icon icon-tit-line"></i>
            <h3>人力资源</h3>
          </div>
          <div class = "chart" id = "chart2"></div>
        </div>
        <div class = "chart_child" style="margin: 2vh 1vh 0 2vh">
          <div class="pop_col_tit">
            <i class="tit_icon icon-tit-line"></i>
            <h3>市场环境</h3>
          </div>
          <div class = "chart" id = "chart3"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class = "chart_main">
          <div class="map_title">
            <h4>营商环境总分及排名</h4>
          </div>
          <div  id = "map" class = "chart_map  main_map"></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "chart_main">
          <div class = "chart_child" style="margin: 1vh 2vh 0 1vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>基础设施</h3>
            </div>
            <div class = "chart" id = "chart4"></div>
          </div>
          <div class = "chart_child" style="margin: 2vh 2vh 0 1vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>公共服务</h3>
            </div>
            <div class = "chart" id = "chart5"></div>
          </div>
          <div class = "chart_child" style="margin: 2vh 2vh 0 1vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>财政能力构成指标因子贡献</h3>
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
  import $ from 'jquery';
  export default {
    name:"index",
    data(){
      return{
        radio:1,
      }
    },
    components: {
    },

    mounted () {
      this.chart1();
      this.chart2();
      this.chart3();
      this.map();
      this.chart4();
      this.chart5();
      this.chart6();
    },
    methods: {
      chart1(){
        var chart1=echarts.init(document.getElementById('chart1'));
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
        '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var data2 = [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
        var option = {
          tooltip : {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              //alert(JSON.stringify(params))
              var result = params[0].name
              result += '<br/>'+params[0].seriesName + '：' + params[0].data+
                "万人</br>" + params[1].seriesName + '：' + params[1].data+' %';
              return result
            }
          },
          legend: { //图例的设置
            show: true, //是否显示图例
            //icon: 'circle',//图例形状，示例为原型
            top: '2%',//图例离底部的距离
            right:"10%",
            itemWidth: config().fontSize, // 图例标记的图形宽度。
            itemHeight: config().fontSize, // 图例标记的图形高度。
            itemGap: config().fontSize, // 图例每项之间的间隔。
            textStyle: config().textStyle,
            data: ['得分', '排名'],//图例的名称数据
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '2%',
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
              interval: 0,
              rotate:25,
              margin: config().fontSize,
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
          },
            {
              axisLabel: {
                formatter: '{value}',
                textStyle:config().textStyle,
              },
              max:20,
              axisLine: {
                show: false
              },
              splitLine: {
               show:false
              }
            }],
          series: [{
            name:'得分',
            type: 'bar',
            data: data1,
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#02BAFF' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#35E9FF' // 100% 处的颜色
                }], false),
                shadowColor: 'rgba(0,160,221,1)'
              }
            },
          },
            {
              name:'排名',
              symbolSize: config().fontSize*8,
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
              type: "line",
              yAxisIndex: 1,
              data: data2,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: '#03CDB4',
                }
              }
            }
          ]
        };
        chart1.setOption(option);
        window.onresize = chart1.resize;
      },
      chart2(){
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
          '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var data2 = [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
        var chart2=echarts.init(document.getElementById('chart2'));
        var barWidth = $("#chart3").width()/xData.length*0.4
        var option = {
          tooltip : {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              //alert(JSON.stringify(params))
              var result = params[0].name
              result += '<br/>'+params[0].seriesName + '：' + params[0].data+
                "万人</br>" + params[2].seriesName + '：' + params[2].data+' %';
              return result
            }
          },
          legend: { //图例的设置
            show: true, //是否显示图例
            //icon: 'circle',//图例形状，示例为原型
            top: '2%',//图例离底部的距离
            right:"10%",
            itemWidth: config().fontSize, // 图例标记的图形宽度。
            itemHeight: config().fontSize, // 图例标记的图形高度。
            itemGap: config().fontSize, // 图例每项之间的间隔。
            textStyle: config().textStyle,
            data: ['得分', '排名'],//图例的名称数据
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '8%',
            top:'20%',
            containLabel: true
          },
          xAxis: {
            data: xData,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin:config().fontSize,
              textStyle:config().textStyle
            }
          },
          yAxis: [{
            name:'',
            nameTextStyle: {
              color: '#fff',
              fontSize: config().fontSize,
              padding: [0, 0, 0, -config().fontSize*2.5],
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(146,146,141,0.3)',
                width: 1,
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle:config().textStyle
            }
          },{
            name:'',
            nameTextStyle: {
              color: '#fff',
              fontSize: config().fontSize,
              padding: [0, 0, 0, config().fontSize*2],
            },
            max:20,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              textStyle:config().textStyle
            }
          }],
          series: [{
            name:'得分',
            data: data1,
            type: 'pictorialBar',
            symbol: 'rect',
            symbolRepeat: 'fixed',
            symbolMargin: '20%',
            symbolClip: true,
            symbolSize: [barWidth,barWidth/2],
            barWidth: barWidth,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1A89FE'
                  },
                    {
                      offset: 1,
                      color: '#00feff'
                    }
                  ]
                ),
              }
            },
            z: 2
          }, {
            type: 'bar',
            //xAxisIndex: 1,
            barGap: '-100%',
            data: data1,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: '#0F2063',
                barBorderRadius:45,
              }
            },
            z: 1
          },
            {
              symbolSize: config().fontSize*8,
              symbol: 'image://data:image/png;base64,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',
              name:'排名',
              type: "line",
              yAxisIndex: 1,
              data: data2 ,
              z: 14,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: '#fce74a',
                }
              }
            }
          ]
        };
        chart2.setOption(option);
        window.onresize = chart2.resize;
      },
      chart3() {
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
          '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var data2 = [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
        var data3 = [];
        for (var i = 0; i < xData.length; i++) {
          var tmp = {}
          tmp.symbolPosition = 'end'
          tmp.value = data1[i];

          data3.push(tmp)
        }
        var barWidth = $("#chart3").width()/xData.length*0.5
        var chart3 = echarts.init(document.getElementById('chart3'));
        var option = {
          tooltip : {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              var result = params[2].name
              result += '<br/>'+params[2].seriesName + '：' + params[2].data+
                " 万人</br>" + params[3].seriesName + '：' + params[3].data+' %';
              return result
            }
          },
          legend: { //图例的设置
            show: true, //是否显示图例
            //icon: 'circle',//图例形状，示例为原型
            top: '2%',//图例离底部的距离
            right:"10%",
            itemWidth: config().fontSize, // 图例标记的图形宽度。
            itemHeight: config().fontSize, // 图例标记的图形高度。
            itemGap: config().fontSize, // 图例每项之间的间隔。
            textStyle: config().textStyle,
            data: ['得分', '排名'],//图例的名称数据
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '8%',
            top:'20%',
            containLabel: true
          },
          xAxis: {
            data: xData,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin:config().fontSize,
              textStyle:config().textStyle
            }
          },
          yAxis: [{
            name:'',
            nameTextStyle: {
              color: '#fff',
              fontSize: config().fontSize,
              padding: [0, 0, 0, -config().fontSize*2.5],
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(146,146,141,0.3)',
                width: 1,
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle:config().textStyle
            }
          },{
            name:'',
            nameTextStyle: {
              color: '#fff',
              fontSize: config().fontSize,
              padding: [0, 0, 0, config().fontSize*2],
            },
            max:20,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              textStyle:config().textStyle
            }
          }],
          series: [{
            name: '',
            type: 'pictorialBar',
            symbolSize: [barWidth,  barWidth*0.6],
            symbolOffset: [0, -barWidth*0.3],
            z: 12,
            itemStyle: {
              normal: {
                color: '#14b1eb'
              }
            },
            data: data3
          }, {
            name: '',
            type: 'pictorialBar',
            symbolSize: [barWidth, barWidth*0.6],
            symbolOffset: [0, barWidth*0.3],
            z: 12,
            itemStyle: {
              normal: {
                color: '#14b1eb'
              }
            },
            data: data1
          }, {
            type: 'bar',
            name:'得分',
            itemStyle: {
              normal: {
                color: '#14b1eb',
                opacity: .7
              }
            },
            //silent: true,
            barWidth: barWidth, // Make series be overlap
            data: data1
          },
            {
              symbolSize: config().fontSize*8,
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
              name:'排名',
              type: "line",
              yAxisIndex: 1,
              data: data2 ,
              z: 14,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: '#006bff',
                }
              }
            }]
        };
        chart3.setOption(option);
        window.onresize = chart3.resize;
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
        let data= [
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
              formatter: '{b}<br/> '+': {c} 万人',
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
      chart4(){
        var chart1=echarts.init(document.getElementById('chart4'));
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
          '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var data2 = [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
        var option = {
          tooltip : {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              //alert(JSON.stringify(params))
              var result = params[0].name
              result += '<br/>'+params[0].seriesName + '：' + params[0].data+
                "万人</br>" + params[2].seriesName + '：' + params[2].data+' %';
              return result
            }
          },
          legend: { //图例的设置
            show: true, //是否显示图例
            //icon: 'circle',//图例形状，示例为原型
            top: '2%',//图例离底部的距离
            right:"10%",
            itemWidth: config().fontSize, // 图例标记的图形宽度。
            itemHeight: config().fontSize, // 图例标记的图形高度。
            itemGap: config().fontSize, // 图例每项之间的间隔。
            textStyle: config().textStyle,
            data: ['得分', '排名'],//图例的名称数据
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '2%',
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
              interval: 0,
              rotate:25,
              margin: config().fontSize,
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
          },
            {
              axisLabel: {
                formatter: '{value}',
                textStyle:config().textStyle,
              },
              max:20,
              axisLine: {
                show: false
              },
              splitLine: {
                show:false
              }
            }],
          series: [{
            name:'得分',
            type: 'bar',
            data: data1,
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5140FB' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#7EBFCF' // 100% 处的颜色
                }], false),
                shadowColor: 'rgba(0,160,221,1)'
              }
            },
          },
            {
              name:'排名',
              symbolSize: config().fontSize*8,
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
              type: "line",
              yAxisIndex: 1,
              data: data2,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: '#03CDB4',
                }
              }
            }
          ]
        };
        chart1.setOption(option);
        window.onresize = chart1.resize;
      },
      chart5(){
        var chart1=echarts.init(document.getElementById('chart5'));
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
          '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var data2 = [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
        var data3 = [];
        for (var i = 0; i < xData.length; i++) {
          data3.push(100)
        }
        var barWidth = $("#chart3").width()/xData.length*0.3
        var option = {
          tooltip : {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              //alert(JSON.stringify(params))
              var result = params[0].name
              result += '<br/>'+params[0].seriesName + '：' + params[0].data+
                "万人</br>" + params[2].seriesName + '：' + params[2].data+' %';
              return result
            }
          },
          legend: { //图例的设置
            show: true, //是否显示图例
            //icon: 'circle',//图例形状，示例为原型
            top: '2%',//图例离底部的距离
            right:"10%",
            itemWidth: config().fontSize, // 图例标记的图形宽度。
            itemHeight: config().fontSize, // 图例标记的图形高度。
            itemGap: config().fontSize, // 图例每项之间的间隔。
            textStyle: config().textStyle,
            data: ['得分', '排名'],//图例的名称数据
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '2%',
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
              interval: 0,
              rotate:25,
              margin: config().fontSize,
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
          },
            {
              axisLabel: {
                formatter: '{value}',
                textStyle:config().textStyle,
              },
              max:20,
              axisLine: {
                show: false
              },
              splitLine: {
                show:false
              }
            }],
          series: [{
            name: '得分',
            data: data1,
            type: 'pictorialBar',
            symbol: 'rect',
            symbolRepeat: 'fixed',
            symbolMargin: '20%',
            symbolClip: true,
            symbolSize: [barWidth,barWidth/2],
            barWidth: barWidth,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: "rgba(41, 121, 255, 1)" // 0% 处的颜色
                },
                  {
                    offset: 1,
                    color: "rgba(0, 192, 255, 1)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            z: 2
          },
            {
            type: 'bar',
            barGap: '-100%',
            data: data3,
            barWidth: barWidth*1.5,
            itemStyle: {
              normal: {
                color: '#4a4b4f'
              }
            },
            z: 1
          },
            {
              name:'排名',
              symbolSize: config().fontSize*8,
              symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
              type: "line",
              yAxisIndex: 1,
              data: data2,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: '#03CDB4',
                }
              }
            }
          ]
        };
        chart1.setOption(option);
        window.onresize = chart1.resize;
      },
      chart6() {
        var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
          '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
        var data1 = [96,94,92,91,90,85,82,82,81,80,76,75,73,71,66,64,62,61,58];
        var data2 = [94,90,89,86,80,75,74,71,68,66,65,64,64,62,61,60,59,57,54];
        var data3 = [];
        var data4 = []
        for (var i = 0; i < xData.length; i++) {
          var tmp = {}
          var tmp1 = {}
          tmp.symbolPosition = 'end'
          tmp.value = data1[i];
          tmp1.symbolPosition = 'end'
          tmp1.value = data1[i]+data2[i];
          data3.push(tmp)
          data4.push(tmp1)
        }
        var barWidth = $("#chart3").width()/xData.length*0.5
        var chart3 = echarts.init(document.getElementById('chart6'));
        var option = {
          tooltip : {
            trigger: 'axis',
            textStyle: config().textStyle,
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              var result = params[2].name
              result += '<br/>'+params[2].seriesName + '：' + params[2].data+
                " 万人</br>" + params[3].seriesName + '：' + params[3].data+' %';
              return result
            }
          },
          legend: { //图例的设置
            show: true, //是否显示图例
            //icon: 'circle',//图例形状，示例为原型
            top: '2%',//图例离底部的距离
            right:"10%",
            itemWidth: config().fontSize, // 图例标记的图形宽度。
            itemHeight: config().fontSize, // 图例标记的图形高度。
            itemGap: config().fontSize, // 图例每项之间的间隔。
            textStyle: config().textStyle,
            data: ['财政收入规模', '财政收支平衡度'],//图例的名称数据
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '8%',
            top:'20%',
            containLabel: true
          },
          xAxis: {
            data: xData,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin:config().fontSize,
              textStyle:config().textStyle
            }
          },
          yAxis: [{
            name:'',
            nameTextStyle: {
              color: '#fff',
              fontSize: config().fontSize,
              padding: [0, 0, 0, -config().fontSize*2.5],
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(146,146,141,0.3)',
                width: 1,
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle:config().textStyle
            }
          },{
            name:'',
            nameTextStyle: {
              color: '#fff',
              fontSize: config().fontSize,
              padding: [0, 0, 0, config().fontSize*2],
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              textStyle:config().textStyle
            }
          }],
          series: [{
            name: '',
            type: 'pictorialBar',
            symbolSize: [barWidth,  barWidth*0.6],
            symbolOffset: [0, -barWidth*0.3],
            z: 12,
            itemStyle: {
              normal: {
                color: '#687ce9'
              }
            },
            data: data3
          }, {
            name: '',
            type: 'pictorialBar',
            symbolSize: [barWidth, barWidth*0.6],
            symbolOffset: [0, barWidth*0.3],
            z: 12,
            itemStyle: {
              normal: {
                color: '#ffa300'
              }
            },
            data: data1
          }, {
            type: 'bar',
            name:'财政收入规模',
            stack: "1",
            itemStyle: {
              normal: {
                color: '#ffa300',
                opacity: .7
              }
            },
            //silent: true,
            barWidth: barWidth, // Make series be overlap
            data: data1
          },
            {
              name: '',
              type: 'pictorialBar',
              symbolSize: [barWidth,  barWidth*0.6],
              symbolOffset: [0, -barWidth*0.3],
              z: 12,
              itemStyle: {
                normal: {
                  color: '#14b1eb'
                }
              },
              data: data4
            },
            {
              type: 'bar',
              name:'财政收支平衡度',
              stack: "1",
              itemStyle: {
                normal: {
                  color: '#14b1eb',
                  opacity: .7
                }
              },
              //silent: true,
              barWidth: barWidth, // Make series be overlap
              data: data2
            }]
        };
        chart3.setOption(option);
        window.onresize = chart3.resize;
      },
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
      height: 89vh;
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
      height: 88vh;
    }
    .map_title {
      position: absolute;
      width: 30vh;
      top: 9vh;
      left: 29vw;
      z-index: 10;
      color: #fff;
      h4 {
        font-size: 2.5vh;
        color: #fff;
        font-weight: bold;
        margin-left: 5%;
        line-height: 6vh;
      }
    }
  }
  </style>
