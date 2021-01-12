<template>
  <div class="app">
    <div>
      工作连接：{{ work_url }}
    </div>
    <div>
      公告连接：{{ gongao_url }}
    </div>
    <div>
      当前验证码：{{ code }}
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
      @click="flg=false"
    >今日缺勤</el-button>
    <el-button
      type="primary"
      @click="flg=true"
    >销假</el-button>
    <el-button @click="switchknowing()">切换任务状态</el-button>
    <a :href="excel_url">
      <!-- @click="exportexcel()" -->
      <el-button>导出Excel</el-button>
    </a>
    <!-- <a :href="excel_url">备用下载</a> -->
    <!-- {{  }} -->
    <el-button @click="flush()"> 重置任务</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 90%;margin: auto;"
    >
      <el-table-column
        prop="stuname"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="stuid"
        label="学号"
        width="120"
      />
      <el-table-column
        prop="classname"
        label="班级"
        width="120"
      />
      <el-table-column
        prop="roomname"
        label="寝室"
        width="120"
      />
      <el-table-column
        prop="reason"
        label="原因"
        width="120"
      />
      <template v-if="flg">
        <el-table-column
          prop="workername"
          label="执行人"
          width="120"
        />
      </template>
      <template v-if="flg">
        <el-table-column
          prop="createdtime"
          label="执行时间"
          width="120"
        />
      </template>
      <template v-if="flg">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              width="120"
              type="primary"
              @click="pintle(scope.$index, scope.row)"
            >
              销假</el-button>
          </template>
        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import * as api from '@/api/life'
export default {
  data () {
    return {
      work_url: 'http://',
      gongao_url: 'http://',
      excel_url: '',
      switc: '',
      code: '6112',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      dialogTableVisible: true,
      flg: false,
      formLabelWidth: '120px'
    }
  },
  created: function () {
    // 获取最新验证码
    this.excel_url = process.env.VUE_APP_BASE_API + '/life/exportexcel'
    this.work_url = process.env.VUE_APP_BASE_URL + ':8100'
    this.gongao_url = process.env.VUE_APP_BASE_URL + ':9913'
    this.get_recordsearch()
    this.$store.dispatch('life/getIdcode', { flag: '1' }).then((res) => {
      this.$data.code = res.data
    }).catch(() => {
    })
    this.get_switchknowing()
  },
  methods: {
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
        this.$data.tableData = res.data

        console.log(111, res)
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
        row.flg = true
        console.log(index, row)

        // this.$store.dispatch('life/studentleak', { id: row.id }).then((res) => {
        //   // this.$data.tableData = res.data
        //   if (res.code === 2000) {
        //     this.$message({
        //       message: res.message,
        //       type: 'success'
        //     })
        //   }
        //   console.log(111, res)
        // })
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

<style scoped >
.app .el-button {
  margin: 20px;
  padding: 10px 20px;
}
.app div {
  padding: 20px 0;
}
</style>
