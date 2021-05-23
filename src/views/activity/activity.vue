<template>
  <div class="app">
    <el-row :gutter="10">
      <el-col>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span> {{ actives[active_index].name }} </span>

            <span class="code_now" @click="get_code">
              <!-- {{ code }} -->
              <!-- <el-button
                circle
                icon="el-icon-refresh-right"
                @click="flush_code"
              /> -->
            </span>
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
            <!-- <el-button @click="switchknowing()">切换任务状态</el-button> -->
            <a :href="excel_url">
              <el-button>导出Excel</el-button>
            </a>
            <!-- <a :href="excel_url">备用下载</a> -->
            <!-- <el-button @click="flush()"> 重置任务</el-button> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <div
      v-for="(floor, index) in roster"
      v-show="actives[active_index].is_open"
      :key="index"
      class="roster_box"
    >
      <h2>{{ floor.title }}</h2>

      <div
        v-for="(layer, layer_index) in floor.layer_list"
        :key="layer_index"
        class="layer"
      >
        <h3>{{ layer.title }}</h3>

        <div
          v-for="(user, user_index) in layer.user"
          :key="user_index"
          class="layer"
        >
          {{ user.username }} {{ user.name }} {{ user.tel }}
          <el-button @click="remove_user(layer, user_index)">删除</el-button>
        </div>
        <div class="search_box">
          <el-input v-model="layer.user_object.username" placeholder="" />
          <el-input v-model="layer.user_object.name" placeholder="" />
          <el-input v-model="layer.user_object.tel" placeholder="" />

          <el-button @click="search_user(layer)">搜索</el-button>
          <el-button @click="add_user(layer)">添加</el-button>
        </div>
      </div>
    </div>
    <el-button @click="save_roster()">保存 </el-button>

    <br />
    <el-row>
      <el-col :sm="24">
        <el-card v-show="actives[active_index].console_code" shadow="hover">
          1
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
                  销假</el-button
                >
              </div>
              <el-button slot="reference" :type="item.flg ? '' : 'info'"
                ><span>{{ item.student_name }}</span
                ><br />
                <span>{{ item.student }}</span></el-button
              >
            </el-popover>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- <el-table :data="tableData">
      <el-table-column
        prop="date"
        label="日期"
        width="150"
      />
    </el-table> -->
    <!-- {{roster}} -->
  </div>
</template>

<script type="text/ecmascript-6">
import * as api from "@/api/SchoolAttendance";
import * as userApi from "@/api/user";
export default {
  data() {
    return {
      dialogVisible: true,
      is_switch: false,
      excel_url: "",
      switc: "",
      actives: [
        {
          id: "1",
          name: "1",
          is_open: false,
          is_builder: false,
        },
      ],
      active_index: 0,
      code: "*****",
      tableData: [],
      // 待查询的用户名
      input_list: [],
      user_list: [],
      dialogTableVisible: true,
      flg: true,
      formLabelWidth: "120px",
      username: "",
      roster: [
        {
          title: "1号楼",
          layer_list: [
            {
              title: "1-2层",
              user_object: {
                username: "",
                name: "",
                grade: "",
                tel: "",
              },
              user: [
                {
                  username: "",
                  name: "",
                  grade: "",
                  tel: "",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created: function () {
    this.get_recordsearch();
    // this.get_switchknowing()
    this.get_activa();
    // setInterval(() => {
    //   this.get_recordsearch()
    // }, 1000 * 25)
  },
  methods: {
    // 加载我的活动
    get_activa() {
      this.$store
        .dispatch("SchoolAttendance/my_active", { type: "0" })
        .then((res) => {
          var arr = res.data;
          this.actives = arr;
          this.get_scheduling()
        })
        .catch(() => {});
    },
    // 获取班表
    get_scheduling() {
      this.$api.SchoolAttendance.scheduling_get({id:this.actives[this.active_index]['id']})
        .then((res) => {
          this.roster = res.data;
        })
        .catch(() => {});
    },
    // 获取验证码
    get_code() {
      this.$api.SchoolAttendance.idcode()
        .then((res) => {
          this.$data.code = res.data;
        })
        .catch(() => {});
    },
    // 刷新验证码
    flush_code() {
      this.$store
        .dispatch("SchoolAttendance/getIdcode")
        .then((res) => {
          this.$data.code = res.data;
        })
        .catch(() => {});
    },
    // 获取缺勤名单
    get_recordsearch() {
      this.$store
        .dispatch("SchoolAttendance/recordsearch")
        .then((res) => {
          res.data.forEach(function (v, i) {
            v["flg"] = true;
          });
          this.$data.tableData = res.data;
          // eslint-disable-next-line no-undef
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
          row.flg = false;

          this.$store
            .dispatch("SchoolAttendance/studentleak", { record_id: row.id })
            .then((res) => {
              // this.$data.tableData = res.data
              if (res.code === 2000) {
                this.$message({
                  message: res.message,
                  type: "success",
                });
              }
              console.log(111, res);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 重置任务
    flush() {
      this.$confirm("此操作将对当前查寝记录初始化 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api.put_switchknowing().then(res => {
          //   this.$message({
          //     message: res.message,
          //     type: 'success'
          //   })
          //   // this.get_switchknowing()
          //   this.$store.dispatch('SchoolAttendance/getIdcode', { flag: '1' }).then((res) => {
          //     this.$data.code = res.data
          //   }).catch(() => {
          //   })
          // })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // // 查看任务
    // get_switchknowing () {
    //   this.$store.dispatch('life/get_switchknowing').then((res) => {
    //     this.$data.switc = res.data
    //     console.log(111, res)
    //   })
    // },
    // 切换任务状态
    task_switch_put() {
      console.log("切换");
      const id = this.actives[this.active_index].id;
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
    // excel
    exportexcel() {
      api.exportexcel().then((res) => {
        this.$message({
          message: res.message,
          type: "success",
        });
      });
    },
    // 排版 添加用户
    add_user(layer) {
      layer.user.push(JSON.parse(JSON.stringify(layer.user_object)));
      layer.user_object = {
        username: "",
        name: "",
        grade: "",
        tel: "",
      };
    },
    // 排版 删除用户
    remove_user(layer, index) {
      layer.user.splice(index, 1);
    },
    // 搜索用户
    search_user(layer) {
      userApi
        .searchUser({ username: layer.user_object.username })
        .then((res) => {
          layer.user_object = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // layer.user_object.tel = '1951'
      // layer.user_object.name = '测试'
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random());
    },
    // 保存班表
    save_roster() {
      console.log(" 保存班表", this.roster);
      const id = this.actives[this.active_index].id;
      api
        .scheduling_post({ roster: this.roster, id: id, data: "" })
        .then((res) => {
          console.log(res);
          if (res.code === 2000) {
            this.$message({
              message: res.message,
              type: "success",
            });
          }
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
  // components: {

  // }
};
</script>

<style scoped lang="scss" >
// .app .el-button {
//   margin: 20px;
//   padding: 10px 20px;
// }
.app div {
  // padding: 20px 0;
}
.code_now {
  margin-left: 20px;
  cursor: pointer;
}
.user_list {
  span {
    display: inline-block;
    margin-top: 2px;
  }
}
.roster_box .search_box {
  display: flex;
}
.roster_box .search_box > input {
  width: 30px;
}
</style>
