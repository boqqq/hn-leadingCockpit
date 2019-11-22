<template>
  <div id="human">
    <div class = "main">
      <el-row>
        <el-col :span="6">
          <div class = "chart_child"  style="margin: 1vh 1vh 0 2vh;height:36vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>平均工资水平</h3>
            </div>
            <div class = "chart" id = "chart1" style="height:31vh"></div>
          </div>
          <div class = "chart_child"  style="margin: 2vh 1vh 0 2vh;height: 50.6vh">
            <div class="pop_col_tit">
              <i class="tit_icon icon-tit-line"></i>
              <h3>从业人员比例</h3>
            </div>
            <div class = "chart" id = "chart2" style="height:45.6vh"></div>
          </div>
        </el-col>
        <el-col :span="18">
          <div>
            <el-row>
              <el-col :span="16">
                <div class = "chart_main">
                  <div class="map_title">
                    <h4>人力资源及其构成指标得分及排名</h4>
                  </div>
                  <div  id = "map" class = "chart_map  main_map"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class = "chart_child"  style="margin: 1vh 2vh 0 1vh">
                  <div class="pop_col_tit">
                    <i class="tit_icon icon-tit-line"></i>
                    <h3>人口流入或流出比</h3>
                  </div>
                  <div class = "chart" id = "chart3"></div>
                </div>
                <div class = "chart_child"  style="margin: 2vh 2vh 0 1vh">
                  <div class="pop_col_tit">
                    <i class="tit_icon icon-tit-line"></i>
                    <h3>人口增速</h3>
                  </div>
                  <div class = "chart" id = "chart4"></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="12">
              <div class = "chart_child"  style="margin: 2vh 1vh 0 1vh">
                <div class="pop_col_tit">
                  <i class="tit_icon icon-tit-line"></i>
                  <h3>城镇医疗保险参保比例</h3>
                </div>
                <div class = "chart" id = "chart5"></div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class = "chart_child"  style="margin: 2vh 2vh 0 1vh">
                <div class="pop_col_tit">
                  <i class="tit_icon icon-tit-line"></i>
                  <h3>人力资源构成指标因子贡献</h3>
                </div>
                <div class = "chart" id = "chart6"></div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {config} from '../../static/js/config/chartConfig.js';
  var echarts = require('echarts');
  import hainan from '../../static/js/json/hainan.json';
    export default {
      name: "cockpit-human",
      data(){
        return{
          xData:['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'],
        }
      },
      mounted () {
        this.chart1();
        this.chart2();
        this.map();
        this.chart3();
        this.chart4();
        this.chart5();
        this.chart6();
      },
      methods: {
        chart1(){
          var chart1=echarts.init(document.getElementById('chart1'));
          var xDatas = this.xData;
          var data1 = [9600,9400,9200,9100,9000,8500,8200,8200,8100,8000,7600,7500,7300,7100,6600,6400,6200,6100,5800];
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
                  "元";
                return result
              }
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
              data: xDatas,
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
              name:'元',
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
            series: [
              {
                name:'平均工资',
                symbolSize: config().fontSize*8,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
                type: "line",
                data: data1,
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
          var myChart = echarts.init(document.getElementById("chart2"));
          var indicator = [];
          var data1 = [];
          for (var i = 0; i < this.xData.length; i++) {
            data1.push((0.6/(i+1)*100).toFixed(2))
          }
          var max = Math.ceil(Math.max.apply(null, data1));
          for (var j = 0; j < this.xData.length; j++) {
            var tmp = {};
            tmp.text = this.xData[j]
            tmp.max = max
            indicator.push(tmp)
          }
          var dataArr = [{
            value: data1,
            name: '',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#ff5600',
                  // shadowColor: '#4A99FF',
                  // shadowBlur: 10,
                },
                shadowColor: '#ff5600',
                shadowBlur: 10,
              },
            },
            areaStyle: {
              normal: { // 单项区域填充样式
                color: {
                  type: 'linear',
                  x: 0, //右
                  y: 0, //下
                  x2: 1, //左
                  y2: 1, //上
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(255,86,0,0.8)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(255,86,0,0.3)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,86,0,0.8)'
                  }],
                  globalCoord: false
                },
                opacity: 1 // 区域透明度
              }
            }
          }
          ];
          var colorArr = ['rgba(255,86,0,1)']; //颜色
          var option = {
            color: colorArr,
            tooltip : {
              textStyle: config().textStyle,
              formatter: function(params) {
                //alert(JSON.stringify(params))
                var result = ''
                var stl = ''
                var w = config().fontSize*20
                if(params.value.length>4){
                  result = '<div style="width: '+w+'px">从业人员比例<br/>'
                  stl = 'width: 47%;float: left;text-align: left;margin-left: 2%'
                }else{
                  result = '<div>流出贡献占比<br/>'
                  stl = 'width:97%;text-align: left;margin-left: 2%'
                }
                for (var k = 0; k < params.value.length; k++) {
                  result = result + '<p style="'+stl+'">'+indicator[k].text+': '+params.value[k]+' %<p/>'
                }
                result = result + '</div>';
                return result;
              }
            },
            radar: {
              // shape: 'circle',
              radius: '70%',
              name: {
                textStyle: config().textStyle
              },
              indicator: indicator,
              splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: true,
                areaStyle: { // 分隔区域的样式设置。
                  color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                }
              },
              axisLine: { //指向外圈文本的分隔线样式
                lineStyle: {
                  color: '#153269'
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#113865', // 分隔线颜色
                  width: 1, // 分隔线线宽
                }
              },
            },
            series: [{
              type: 'radar',
              symbolSize: config().fontSize/3,
              // symbol: 'angle',
              data: dataArr
            }]
          };
          myChart.setOption(option);
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
        chart3(){
          var chart3=echarts.init(document.getElementById('chart3'));
          var xData = ['海口市','三亚市','三沙市','儋州市','五指山市','文昌市','琼海市','万宁市',
            '东方市','定安县','屯昌县','澄迈县','临高县','白沙','昌江','乐东','陵水','保亭','琼中'];
          var data1 = [96,85,66,51,44,32,20,17,10,5,-2,-13,-21,-29,-33,-47,-59,-66,-71];
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
              name:'%',
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
              type: 'bar',
              data: data1,
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: function (v) {
                    if(v.value > 0){
                      return '#0263FF'
                    }else{
                      return '#ff3f00'
                    }
                  },
                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                }
              }
            }]
          };
          chart3.setOption(option);
          window.onresize = chart3.resize;
        },
        chart4(){
          var chart4=echarts.init(document.getElementById('chart4'));
          var xDatas = this.xData;
          var data1 = [9600,9400,9200,9100,9000,8500,8200,8200,8100,8000,7600,7500,7300,7100,6600,6400,6200,6100,5800];
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
                  "元";
                return result
              }
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
              data: xDatas,
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
              name:'%',
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
            series: [
              {
                name:'人口增速',
                symbolSize: config().fontSize*8,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
                type: "line",
                data: data1,
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    color: '#03CDB4',
                  }
                }
              }
            ]
          };
          chart4.setOption(option);
          window.onresize = chart4.resize;
        },
        chart5(){
          var chart5=echarts.init(document.getElementById('chart5'));
          var xDatas = this.xData;
          var data1 = [9600,9400,9200,9100,9000,8500,8200,8200,8100,8000,7600,7500,7300,7100,6600,6400,6200,6100,5800];
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
                  "%";
                return result
              }
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
              data: xDatas,
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
              name:'%',
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
            series: [
              {
                name:'平均工资',
                symbolSize: config().fontSize*8,
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
                type: "line",
                data: data1,
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    color: '#03CDB4',
                  }
                }
              }
            ]
          };
          chart5.setOption(option);
          window.onresize = chart5.resize;
        },
        chart6(){
          var chart6=echarts.init(document.getElementById('chart6'));
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
              data: ['平均工资水平', '从业人员比例','城镇医疗保险参保比例','人口流入或流出比','人口增速'],//图例的名称数据
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
              name:'平均工资水平',
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
                name:'从业人员比例',
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
                name:'城镇医疗保险参保比例',
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
                name:'人口流入或流出比',
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
                name:'人口增速',
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
          chart6.setOption(option);
          window.onresize = chart6.resize;
        },
      }
    }
</script>

<style lang="scss" scoped>
  #human{
    .chart_child{
      height: 28.2vh;
      background-color: #0C1752;
    }
    .chart_main{
      height: 59vh;
      width: 100%;
    }
    .chart_map{
      height: 59vh;
    }
    .chart{
      height: 23vh;
    }
    .map_title {
      position: absolute;
      width: 14vw;
      top: 3vh;
      left: 2vw;
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
