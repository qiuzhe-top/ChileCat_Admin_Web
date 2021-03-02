<template>
  <div>
    <div
      id="chart1"
      style="width: 600px;height:400px;"
    />
    <div
      id="chart2"
      style="width: 600px;height:400px;"
    />
    <div
      id="main"
      style="width: 600px;height:400px;"
    />
  </div>
</template>
<script>
export default {
  name: 'Stats',
  mounted () {
    this.myEcharts()
    this.chart1()
    this.chart2()
  },
  methods: {
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '请假排名前8的班级'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['195101', '195102', '1934501', '1934502', '3W1961', '3W1962']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [55, 50, 46, 30, 30, 20]
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    chart1 () {
      var myChart = this.$echarts.init(document.getElementById('chart1'))

      var option = {
        title: {
          text: '请假类型占比'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              { value: 235, name: '病假（235）' },
              { value: 274, name: '课假（274）' },
              { value: 310, name: '小假（310）' },
              { value: 335, name: '离杭（335）' },
              { value: 400, name: '公假（400）' }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    chart2 () {
      var myChart = this.$echarts.init(document.getElementById('chart2'))

      var option = {
        title: {
          text: '最近7天请假数量'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['21号', '22号', '23号', '24号', '25号', '26号', '27号']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [40, 32, 11, 5, 16, 55, 23],
          type: 'line',
          areaStyle: {}
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
