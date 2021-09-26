<!--
 * @Author: 邹洋
 * @Date: 2021-09-24 19:39:55
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-24 19:51:58
 * @Description:
-->
<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height:400px;" />
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  mounted() {
  // eslint-disable-next-line no-mixed-spaces-and-tabs
    this.myEcharts()
  },
  methods: {
    myEcharts(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>
