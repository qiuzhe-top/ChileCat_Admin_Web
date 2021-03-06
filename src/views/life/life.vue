/* eslint-disable vue/valid-v-for */
<template>
  <div class="app">
    <div
      class="code_now"
      @click="get_code"
    >
      当前验证码(点击获取)：{{ code }}
    </div>
    <div>
      任务状态（0-任务停止 1-执行中）: {{ switc }}
    </div>
    <el-button
      type="primary"
      @click="flush_code"
    >刷新验证码</el-button>
    <!-- Table -->
    <el-button
      type="primary"
      @click="flg=true"
    >销假</el-button>
    <el-button
      type="primary"
      @click="flg=false"
    >今日缺勤</el-button>
    <el-button @click="switchknowing()">切换任务状态</el-button>
    <a :href="excel_url">
      <!-- @click="exportexcel()" -->
      <el-button>导出Excel</el-button>
    </a>
    <!-- <a :href="excel_url">备用下载</a> -->
    <!-- {{  }} -->
    <el-button @click="flush()"> 重置任务</el-button>

    <div class="user_list">
      <el-popover
        v-for="item in tableData"
        :key="item.id"
        trigger="hover"
        placement="top"
        width="160"
      >
        <p>班级：{{ item.classname }}</p>
        <p>寝室：{{ item.room_name }}</p>
        <!-- <p>班级：{{item.classname}}</p> -->
        <p>原因：{{ item.reason }}</p>
        <p>执行人：{{ item.worker_name }}</p>
        <p>执行时间：{{ item.created_time }}</p>
        <div style="text-align: right; margin: 0">
          <el-button
            width="120"
            type="primary"
            @click="pintle(item.index, item)"
          >
            销假</el-button>
        </div>
        <el-button
          slot="reference"
          :type="item.flg ? '' : 'info'"
        ><span>{{ item.student_name }}</span><br> <span>{{ item.student }}</span></el-button>
      </el-popover>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as api from '@/api/life'
export default {
  data () {
    return {
      excel_url: '',
      switc: '',
      code: '*****',
      tableData: [],
      dialogTableVisible: true,
      flg: true,
      formLabelWidth: '120px'
    }
  },
  created: function () {
    // 获取最新验证码
    this.get_recordsearch()
    this.get_switchknowing()
    this.excel_url = process.env.VUE_APP_BASE_API + '/life/exportexcel'
    setInterval(() => {
      this.get_recordsearch()
    }, 1000 * 25)
  },
  methods: {
    // 获取验证码
    get_code () {
      this.$api.life.idcode()
        .then((res) => {
          this.$data.code = res.data
        }).catch(() => {
        })
    },
    // 刷新验证码
    flush_code () {
      this.$store.dispatch('life/getIdcode').then((res) => {
        this.$data.code = res.data
      }).catch(() => {
      })
    },
    // 获取缺勤名单
    get_recordsearch () {
      this.$store.dispatch('life/recordsearch').then((res) => {
        res.data.forEach(function (v, i) {
          v['flg'] = true
        })
        this.$data.tableData = res.data
        // eslint-disable-next-line no-undef
      }).catch(() => {
      })
    },
    // 销假
    pintle (index, row) {
      this.$confirm('此操作将对该同学销假,并且记录您的信息 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.flg = false

        this.$store.dispatch('life/studentleak', { record_id: row.id }).then((res) => {
          // this.$data.tableData = res.data
          if (res.code === 2000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
          console.log(111, res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 重置任务
    flush () {
      this.$confirm('此操作将对当前查寝记录初始化 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.put_switchknowing().then(res => {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.get_switchknowing()
          this.$store.dispatch('life/getIdcode', { flag: '1' }).then((res) => {
            this.$data.code = res.data
          }).catch(() => {
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 查看任务
    get_switchknowing () {
      this.$store.dispatch('life/get_switchknowing').then((res) => {
        this.$data.switc = res.data
        console.log(111, res)
      })
    },
    // 切换任务状态
    switchknowing () {
      this.$store.dispatch('life/switchknowing').then((res) => {
        this.$data.switc = res.data
        console.log(111, res)
      })
    },
    // excel
    exportexcel () {
      api.exportexcel().then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      })
    }
  }
  // components: {

  // }
}
</script>

<style scoped lang="scss" >
.app .el-button {
  margin: 20px;
  padding: 10px 20px;
}
.app div {
  padding: 20px 0;
}
.code_now {
  cursor: pointer;
}
.user_list {
  span {
    display: inline-block;
    margin-top: 2px;
  }
}
</style>
