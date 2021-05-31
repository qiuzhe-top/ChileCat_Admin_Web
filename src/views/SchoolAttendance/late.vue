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
            <!-- <a :href="excel_url">备用下载</a> -->
            <a :href="excel_url">
              <el-button>导出Excel</el-button>
            </a>
            <el-button @click="get_condition()">刷新记录</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />

    <el-dialog
      title="排班"
      :visible.sync="dialogVisible_roster_box"
      width="90%"
      :before-close="handleClose"
      class="dialog_roster"
    >
      <el-row :gutter="10">
        <el-col :xs="24" :md="24">
          <h3>添加</h3>
          <div class="input_box">
            <el-row :gutter="10">
              <el-col :xs="24" :md="9">
                <el-input
                  size="small"
                  v-model="input_user_object.username"
                  placeholder="学号"
                />
              </el-col>
              <el-col :xs="24" :md="9">
                <el-input
                  size="small"
                  v-model="input_user_object.name"
                  placeholder="姓名"
                />
              </el-col>

              <el-col :xs="24" :md="6">
                <el-button
                  size="small"
                  icon="el-icon-search"
                  @click="search_user()"
                  >搜索</el-button
                >
                <el-button
                  size="small"
                  icon="el-icon-circle-plus-outline"
                  @click="add_user()"
                  >添加</el-button
                >
              </el-col>
            </el-row>
          </div>
        </el-col>
        <br />
        <el-col :xs="24" :md="8">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入多个学号"
            v-model="user_list_str"
          >
          </el-input>
        </el-col>
        <el-col :xs="24" :md="4">
          <el-button @click="add_user_list_str()">添加</el-button>
        </el-col>

        <el-col :xs="24" :md="12">
          <h3>名单</h3>

          <div v-for="(item, index) in roster" :key="index">
            {{ item.username }}
            {{ item.name }}
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="remove_user(index)"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_roster_box = false">取 消</el-button>
        <!-- <el-button @click="dialogVisible_roster_box = false">查看</el-button> -->
        <el-button type="primary" @click="save_roster()">保存</el-button>
      </span>
    </el-dialog>
    <br />

    <!-- 查寝记录面板 -->
    <el-row>
      <el-col :sm="24">
        <el-card v-show="actives[active_index].is_open" shadow="hover">
          <div slot="header">
            <span>晚自修检查记录</span>
          </div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="student_approved_number"
              label="学号"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="student_approved" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="rule_str" label="原因"> </el-table-column>
            <el-table-column prop="worker" label="执行人"> </el-table-column>
            <el-table-column prop="star_time" label="执行时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  width="120"
                  :type="scope.row.flg ? 'warning' : 'info'"
                  @click="pintle(1, scope.row)"
                >
                  销假</el-button
                >
              </template>
            </el-table-column>
          </el-table>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      is_switch: false,
      excel_url: "",
      switc: "",
      actives: [
        {
          id: "",
          name: "加载中",
          is_open: false,
          is_builder: false,
        },
      ],
      active_index: 0, // 获取的任务为一个列表默认显示第一个
      code: "*****",
      tableData: [],
      // 待查询的用户名
      input_list: [],
      user_list: [],
      dialogTableVisible: true,
      flg: true,
      formLabelWidth: "120px",
      username: "",

      // 班表
      roster: [
        {
          "username":'',
          "name":''
        },
      ],
      // 排班面板
      dialogVisible_roster_box: false,
      // 待排班的用户列表
      user_list_str: "",
      input_user_object: {},
    };
  },
  created: function () {
    this.get_activa();

    this.get_condition();
    setInterval(() => {
      if(this.$data.actives[this.$data.active_index].is_open==true){
        this.get_condition()
      }
    }, 1000 * 20);

  },
  methods: {
    // 加载我的活动
    get_activa() {
      this.$store
        .dispatch("SchoolAttendance/my_active", { type: "2" })
        .then((res) => {
          var arr = res.data;
          this.actives = arr;
          this.get_scheduling();
        })
        .catch(() => {});
    },

    // 切换任务状态
    task_switch_put() {
      console.log("切换");
      const id = this.$data.actives[this.active_index].id;
      this.is_switch = true;
      this.$store
        .dispatch("SchoolAttendance/task_switch_put", { id: id })
        .then((res) => {
          this.$data.switc = res.data;
          this.is_switch = false;
        })
        .catch((err) => {
          console.log(err);
          this.is_switch = false;
        });
    },

    // 重置任务
    flush() {
      this.$confirm(
        "此操作将重置当天房间被查记录、重置所有学生在寝状态为在 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const id = this.actives[this.active_index].id;
          this.$api.SchoolAttendance.task_switch_delete({ task_id: id }).then(
            (res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 获取班表
    get_scheduling() {
      this.$api.SchoolAttendance.scheduling_get({
        id: this.actives[this.active_index]["id"],
      })
        .then((res) => {
          this.roster = res.data;
        })
        .catch(() => {});
    },

    // 排班 添加用户
    add_user() {
      // layer.user.push(JSON.parse(JSON.stringify(layer.user_object)));
      if(this.$data.input_user_object.username=='')return
      this.$data.roster.push(this.$data.input_user_object)
      this.$data.input_user_object = {
        username: "",
        name: "",
      }
    },
    // 添加多个用户
    add_user_list_str(){
      const str = this.$data.user_list_str
      if(str.length<1)return
      var user_list = str.split('\n')
      user_list.forEach(u => {
             this.$api.SchoolAttendance.searchUser({
           username: u,
          })
          .then((res) => {
            this.$data.roster.push(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      });

      console.log(user_list)
    },
    // 排班 删除用户
    remove_user(index) {
      this.$data.roster.splice(index, 1);
    },

    // 排班 搜索用户
    search_user() {
      this.$api.SchoolAttendance.searchUser({
        username: this.$data.input_user_object.username,
      })
        .then((res) => {
          this.$data.input_user_object = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random());
    },
    // 保存班表
    save_roster() {
      console.log(" 保存班表", this.roster);
      const id = this.actives[this.active_index].id;
      this.$api.SchoolAttendance.scheduling_post({
        roster: this.roster,
        id: id,
        data: "",
      }).then((res) => {
        console.log(res);
        if (res.code === 2000) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.$data.dialogVisible_roster_box = false;
        }
      });
    },

    // 获取缺勤名单
    get_condition() {
      if (!this.$data.actives[this.active_index].id) return;
      this.$store
        .dispatch("SchoolAttendance/condition", {
          task_id: this.$data.actives[this.active_index].id,
        })
        .then((res) => {
          res.data.forEach(function (v, i) {
            v["flg"] = true;
          });
          this.$data.tableData = res.data;
      console.log("获取缺勤名单"+res.data);

        })
        .catch(() => {});
    },

    // 销假
    pintle(index, row) {
      this.$confirm("此操作将对该同学销假,并且记录您的信息 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("销假");

          this.$api.SchoolAttendance.undo_record_delete({
            record_id: row.id,
            task_id: this.$data.actives[this.active_index].id,
          })
            .then((res) => {
              if (res.code === 2000) {
                this.$message({
                  message: res.message,
                  type: "success",
                });
                row.flg = false;
              }
            })
            .catch((err) => {
              this.$message({
                type: "info",
                message: "失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // excel 导出
    exportexcel() {
      api.exportexcel().then((res) => {
        this.$message({
          message: res.message,
          type: "success",
        });
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
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
