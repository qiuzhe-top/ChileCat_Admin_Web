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
      <div
        v-for="(floor, index) in roster"
        v-show="actives[active_index].is_open"
        :key="index"
        class="roster_box"
      >
        <h3>{{ floor.title }}</h3>

        <div
          v-for="(layer, layer_index) in floor.layer_list"
          :key="layer_index"
          class="layer"
        >
          <h4>{{ layer.title }}</h4>

          <div
            v-for="(user, user_index) in layer.user"
            :key="user_index"
            class="layer"
          >
            {{ user.username }} {{ user.name }} {{ user.tel }}
            <el-button
              v-show="is_show_button"
              size="mini"
              icon="el-icon-close"
              @click="remove_user(layer, user_index)"
            />
          </div>
          <div v-show="is_show_button" class="search_box">
            <el-row :gutter="10">
              <el-col :xs="24" :md="8">
                <el-input
                  v-model="layer.user_object.username"
                  size="small"
                  placeholder="学号"
                />
              </el-col>

              <el-col :xs="24" :md="8">
                <el-input
                  v-model="layer.user_object.name"
                  size="small"
                  placeholder="姓名"
                />
              </el-col>

              <el-col :xs="24" :md="8">
                <el-input
                  v-model="layer.user_object.tel"
                  size="small"
                  placeholder="电话"
                />
              </el-col>
            </el-row>
          </div>

          <el-button
            v-show="is_show_button"
            size="small"
            icon="el-icon-search"
            @click="search_user(layer)"
          >搜索</el-button>
          <el-button
            v-show="is_show_button"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="add_user(layer)"
          >添加</el-button>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_roster_box = false">取 消</el-button>
        <el-button @click="simple_information()">查看/修改</el-button>
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
                <span>{{ item.student_approved }}</span></el-button>
            </el-popover>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
      dialogVisible_roster_box: false,

      // 是否显示排班功能按钮
      is_show_button: false
    }
  },
  created: function () {
    this.get_activa()
    this.get_condition()

    setInterval(() => {
      this.get_condition()
    }, 1000 * 30)
  },
  methods: {
    // 加载我的活动
    get_activa() {
      this.$store
        .dispatch('SchoolAttendance/my_active', { type: '0' })
        .then((res) => {
          var arr = res.data
          this.actives = arr
          this.get_scheduling()

          // 初始化导出excel地址
          const id = this.actives[this.active_index].id
          const url =
          this.$api.SchoolAttendance.out_knowing_excel_data + '?task_id=' + id
          this.$data.excel_url = url

        })
        .catch(() => {})
    },

    // 切换任务状态
    task_switch_put() {
      console.log('切换')
      const id = this.actives[this.active_index].id
      this.is_switch = true
      this.$store
        .dispatch('SchoolAttendance/task_switch_put', { id: id })
        .then((res) => {
          this.$data.switc = res.data
          this.is_switch = false
        })
        .catch((err) => {
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
          this.$api.SchoolAttendance.task_switch_delete({ task_id: id }).then(
            (res) => {
              this.$message({
                message: res.message,
                type: 'success'
              })
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
      this.$api.SchoolAttendance.scheduling_get({
        id: this.actives[this.active_index]['id']
      })
        .then((res) => {
          this.roster = res.data
        })
        .catch(() => {})
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

    // 排班 删除用户
    remove_user(layer, index) {
      layer.user.splice(index, 1)
    },

    // 排班 搜索用户
    search_user(layer) {
      this.$api.SchoolAttendance.searchUser({
        username: layer.user_object.username
      })
        .then((res) => {
          layer.user_object = res.data
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random())
    },

    // 保存班表
    save_roster() {
      console.log(' 保存班表', this.roster)
      const id = this.actives[this.active_index].id
      this.$api.SchoolAttendance.scheduling_post({
        roster: this.roster,
        id: id,
        data: ''
      }).then((res) => {
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
        .dispatch('SchoolAttendance/condition', {
          task_id: this.$data.actives[this.active_index].id
        })
        .then((res) => {
          res.data.forEach(function (v, i) {
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
      })
        .then(() => {
          console.log('销假')

          this.$api.SchoolAttendance.undo_record_delete({
            record_id: row.id,
            task_id: this.$data.actives[this.active_index].id
          })
            .then((res) => {
              if (res.code === 2000) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                row.flg = false
              }
            })
            .catch((err) => {
              this.$message({
                type: 'info',
                message: '失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    // excel 导出
    exportexcel() {
      api.exportexcel().then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      })
    },

    // 显示班表简易版
    simple_information() {
      this.$data.is_show_button = !this.$data.is_show_button
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style scoped lang="scss" >
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
