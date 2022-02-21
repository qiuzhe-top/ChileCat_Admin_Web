<template>
  <div>
    <!-- 任务面板 -->
    <el-row :gutter="10">
      <el-col>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span> {{ actives[active_index].name }} </span>
            <!-- -->
            <div style="display: inline" @click="task_switch_put()">
              <el-switch
                v-model="actives[active_index].is_open"
                :disabled="is_switch"
                style="float: right; padding: 3px 0"
                active-text="开启"
                inactive-text="关闭"
              />
            </div>
          </div>

          <div v-show="actives[active_index].is_open" class="text item">
            <el-button
              @click="dialogVisible_roster_box = true"
            >排班
            </el-button>
            <el-button @click="flush()"> 重置任务</el-button>

            <a v-if="excel_url" :href="excel_url">
              <el-button>导出Excel</el-button>
            </a>

            <el-button :loading="search_loading" @click="get_condition()">刷新记录</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <slot />

    <br>
    <!-- 排班 -->
    <el-dialog
      title="排班"
      :visible.sync="dialogVisible_roster_box"
      width="90%"
      :before-close="handleClose"
      class="dialog_roster"
    >
      <slot
        :roster="roster"
        :active_index="active_index"
        :actives="actives"
        name="scheduling"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_roster_box = false">取 消</el-button>
        <slot name="scheduling_button" />

        <el-button type="primary" @click="save_roster()">保存</el-button>
      </span>
    </el-dialog>
    <br>

    <!-- 查寝记录面板 -->
    <el-row>
      <el-col :sm="24">
        <el-card v-show="actives[active_index].is_open" shadow="hover">
          <div slot="header">
            <span>检查记录</span>
          </div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="student_approved_number"
              label="学号"
              width="180"
            />
            <el-table-column prop="student_approved" label="姓名" width="180" />
            <el-table-column prop="rule_str" label="原因" />
            <el-table-column prop="worker" label="执行人" />
            <el-table-column prop="room_str" label="寝室" />
            <el-table-column prop="star_time" label="执行时间" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  width="120"
                  :type="scope.row.flg ? 'warning' : 'info'"
                  @click="pintle(1, scope.row)"
                >
                  销假</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    type: Number, // 任务类型
    // excel_url: String,
    flush_task_store: String,
    save_roster_store: String
  },
  data() {
    return {
      is_switch: false,
      switc: '',
      actives: [
        {
          id: '',
          name: '加载中',
          is_open: false,
          is_builder: false
        }
      ],
      active_index: 0, // 获取的任务为一个列表默认显示第一个
      tableData: [],
      // 待查询的用户名
      flg: true,
      formLabelWidth: '120px',
      username: '',

      // 班表
      roster: [],
      // 排班面板
      dialogVisible_roster_box: false,
      // 定时获取考勤记录
      timer: null,
      // 导出excel参数
      excel_url: '',
      search_loading: false
    }
  },
  created: function() {
    this.get_activa()

    // this.get_condition()
    // this.timer = setInterval(() => {
    //   if (this.$data.actives[this.$data.active_index].is_open === true) {
    //     this.get_condition()
    //   }
    // }, 1000 * 20)

    // 构建导出excel 路径
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    // 加载我的活动
    get_activa() {
      this.$store
        .dispatch('school_attendance/task_obtain', { type: this.$props.type })
        .then(res => {
          var arr = res.data
          this.actives = arr
          this.get_scheduling()
          var excel_url_data = '?' + 'task_id=' + arr[0].id + '&token=' + getToken()
          this.excel_url = this.$api.school_attendance.out_knowing_excel_data + excel_url_data
        })
        .catch(() => {})
    },

    // 切换任务状态
    task_switch_put() {
      const id = this.$data.actives[this.active_index].id
      this.is_switch = true
      this.$store
        .dispatch('school_attendance/task_switch', { task_id: id })
        .then(res => {
          this.$data.switc = res.data
          this.is_switch = false
        })
        .catch(err => {
          console.log(err)
          this.is_switch = false
        })
    },

    // 重置任务
    flush() {
      this.$confirm(
        '此操作将重置任务操作数据，但不会清空记录的人员名单',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const id = this.actives[this.active_index].id
          this.$store.dispatch(
            'school_attendance/' + this.$props.flush_task_store,
            {
              task_id: id
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    // 获取班表
    get_scheduling() {
      this.$store
        .dispatch('school_attendance/scheduling', {
          task_id: this.actives[this.active_index]['id']
        })
        .then(res => {
          this.roster = res.data
        })
    },
    // 保存班表
    save_roster() {
      const id = this.actives[this.active_index].id
      this.$store
        .dispatch('school_attendance/' + this.$props.save_roster_store, {
          task_id: id,
          roster: this.roster
        })
        .then(res => {
          this.$data.dialogVisible_roster_box = false
        })
    },

    // 获取缺勤名单
    get_condition() {
      var that = this
      if (!this.$data.actives[this.active_index].id) return
      that.search_loading = true

      this.$store
        .dispatch('school_attendance/condition', {
          task_id: this.$data.actives[this.active_index].id
        })
        .then(res => {
          res.data.forEach(function(v, i) {
            v['flg'] = true
          })
          this.$data.tableData = res.data
          that.search_loading = false
        })
        .catch(() => {
          that.search_loading = false
        })
    },

    // 销假
    pintle(index, row) {
      this.$confirm('此操作将对该同学销假,并且记录您的信息 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('school_attendance/undo_record', {
              record_id: row.id,
              task_id: this.$data.actives[this.active_index].id
            })
            .then(res => {
              row.flg = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 点击空白处关闭弹窗触发
    handleClose(done) {
      done()
    }
  }
}
</script>

<style scoped lang="scss">
.code_now {
  margin-left: 20px;
  cursor: pointer;
}
.user_list {
  display: flex;

  span {
    display: inline-block;
    margin-top: 2px;
  }
}
.roster_box .search_box {
  margin: 10px 0;
}
.input_box {
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
