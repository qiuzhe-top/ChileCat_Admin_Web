<template>
  <div class="app">
    <!-- 任务面板 -->
    <el-row :gutter="10">
      <el-col>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span> {{ actives[active_index].name }} </span>
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
            <el-button @click="dialogVisible_roster_box = true">排班</el-button>
            <el-button @click="flush()"> 重置任务</el-button>
            <el-button @click="get_condition()">记录情况</el-button>
            <a :href="excel_url">
              <el-button>导出Excel </el-button>
            </a>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>

    <el-dialog
      title="排班"
      :visible.sync="dialogVisible_roster_box"
      width="90%"
      :before-close="handleClose"
    >
      <!-- 班表面板 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_roster_box = false">取 消</el-button>

        <el-button type="primary" @click="save_roster()">保存</el-button>
      </span>
    </el-dialog>
    <br>

    <!-- 查寝记录面板 -->
    <el-row>
      <el-col :sm="24">
        <el-card v-show="actives[active_index].is_open" shadow="hover">
          <div slot="header">
            <span>查寝记录</span>
          </div>
          <div class="user_list">
            <el-popover
              v-for="item in tableData"
              :key="item.id"
              trigger="hover"
              placement="top"
              width="160"
              style="margin-right: 10px"
            >
              <p>寝室：{{ item.room_str }}</p>
              <p>原因：{{ item.rule_str }}</p>
              <p>执行人：{{ item.worker }}</p>
              <p>执行时间：{{ item.star_time }}</p>
              <div style="text-align: right; margin: 0px">
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
              ><span>{{ item.student_approved_number }}</span><br>
                <span>{{ item.student_approved }}</span>
              </el-button>
            </el-popover>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      is_switch: false,
      excel_url: '',
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
      code: '*****',
      tableData: [],
      // 待查询的用户名
      input_list: [],
      user_list: [],
      dialogTableVisible: true,
      flg: true,
      formLabelWidth: '120px',
      username: '',
      roster: [
        {
          title: '1号楼',
          layer_list: [
            {
              title: '1-2层',
              user_object: {
                username: '',
                name: '',
                grade: '',
                tel: ''
              },
              user: [
                {
                  username: '',
                  name: '',
                  grade: '',
                  tel: ''
                }
              ]
            }
          ]
        }
      ],

      // 排班面板
      dialogVisible_roster_box: false

      // 是否显示排班功能按钮
      // is_show_button: true
    }
  },
  created: function() {
    this.get_activa()
    this.get_condition()

    this.excel_url =
      this.$api.school_attendance.out_knowing_excel_data +
      '?task_id=1&token=' +
      getToken()
    setInterval(() => {
      this.get_condition()
    }, 1000 * 30)
  },
  methods: {
    // 加载我的活动
    get_activa() {
      this.$store
        .dispatch('school_attendance/task_obtain', { type: '0' })
        .then(res => {
          const { is_open, name, id } = res.data
          var arr = res.data
          this.actives = arr
          this.get_scheduling()
        })
        .catch(() => {})
    },

    // 切换任务状态
    task_switch_put() {
      const id = this.actives[this.active_index].id
      this.is_switch = true
      this.$store
        .dispatch('school_attendance/task_switch', { task_id: id })
        .then(res => {
          const { is_open } = res.data
          this.$data.switc = is_open
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
        '此操作将重置当天房间被查记录、重置所有学生在寝状态为在 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const id = this.actives[this.active_index].id
          this.$store.dispatch('school_attendance/task_rest_knowing', {
            task_id: id
          })
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

    // 排班 添加用户
    add_user(layer) {
      layer.user.push(JSON.parse(JSON.stringify(layer.user_object)))
      layer.user_object = {
        username: '',
        name: '',
        grade: '',
        tel: ''
      }
    },

    // // 排班 删除用户
    // remove_user(layer, index) {
    //   layer.user.splice(index, 1)
    // },

    // // 排班 搜索用户
    // search_user(layer) {
    //   this.$store
    //     .dispatch('school_information/student_information', {
    //       username: layer.user_object.username
    //     })
    //     .then(res => {
    //       layer.user_object = res.data
    //     })

    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random())
    // },

    // 保存班表
    save_roster() {
      console.log(' 保存班表', this.roster)
      const id = this.actives[this.active_index].id

      this.$store
        .dispatch('school_attendance/scheduling_update_knowing', {
          task_id: id,
          roster: this.roster
        })
        .then(res => {
          console.log(res)
          if (res.code === 2000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$data.dialogVisible_roster_box = false
          }
        })
    },

    // 获取缺勤名单
    get_condition() {
      console.log('获取缺勤名单')
      if (!this.$data.actives[this.active_index].id) return
      this.$store
        .dispatch('school_attendance/condition', {
          task_id: this.$data.actives[this.active_index].id
        })
        .then(res => {
          res.data.forEach(function(v, i) {
            v['flg'] = true
          })
          this.$data.tableData = res.data
        })
        .catch(() => {})
    },

    // 销假
    pintle(index, row) {
      this.$confirm('此操作将对该同学销假,并且记录您的信息 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('school_attendance/undo_record', {
            record_id: row.id,
            task_id: this.$data.actives[this.active_index].id
          })
          .then(res => {
            row.flg = false
          })
      })
    },

    // // 显示班表简易版
    // simple_information() {
    //   this.$data.is_show_button = !this.$data.is_show_button
    // },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
  // display: flex;
  margin: 10px 0;
}
.roster_box .search_box > input {
  // width: 30px;
}
</style>
