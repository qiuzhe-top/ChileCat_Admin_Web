<template>
  <div>
    <TaskFrame
      ref="frame"
      :type="0"
      :excel_url="excel_url"
      :save_roster_store="'scheduling_update_knowing'"
      :flush_task_store="'task_rest_knowing'"
    >
      <el-row :gutter="10">
        <el-col>
          <el-card class="data-card" shadow="hover">
            <div slot="header" class="clearfix">数据管理</div>
            <RoomDelete />
            <RoomRecover />
            <Statistical />
          </el-card>
        </el-col>
      </el-row>

      <!-- 班表面板 -->
      <template v-slot:scheduling="data">
        <div
          v-for="(floor, index) in data.roster"
          v-show="data.actives[data.active_index].is_open"
          :key="index"
          class="roster_box"
        >
          <div class="building">{{ floor.title }}</div>

          <div
            v-for="(layer, layer_index) in floor.layer_list"
            :key="layer_index"
            class="layer"
          >
            <div class="floor">{{ layer.title }}</div>

            <div
              v-for="(user, user_index) in layer.user"
              :key="user_index"
              class="layer"
            >
              <el-row>
                <el-col :span="10">
                  {{ user.grade }} {{ user.username }} {{ user.name }}
                  {{ user.tel }} {{ user.type }}
                </el-col>
                <el-col :span="6">
                  <el-autocomplete
                    v-show="is_show_button"
                    v-model="user.type"
                    class="inline-input"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button
                    v-show="is_show_button"
                    size="mini"
                    icon="el-icon-close"
                    @click="remove_user(layer, user_index)"
                  />
                </el-col>
              </el-row>
            </div>

            <!-- <div v-show="is_show_button" class="search_box"> -->
            <el-row v-show="is_show_button" :gutter="10">
              <el-col :xs="5" :md="8">
                <el-input
                  v-model="layer.user_object.username"
                  size="small"
                  placeholder="学号"
                />
              </el-col>
              <el-col :xs="5" :md="8">
                <el-button
                  v-show="is_show_button"
                  size="small"
                  icon="el-icon-search"
                  @click="search_user(layer)"
                >添加</el-button>
              </el-col>
              <!-- <el-col :xs="24" :md="8">
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
              </el-row> -->
            </el-row>
            <!-- </div> -->

            <!-- <el-button
              v-show="is_show_button"
              size="small"
              icon="el-icon-circle-plus-outline"
              @click="add_user(layer)"
            >添加</el-button> -->
          </div>
        </div>
      </template>

      <template v-slot:scheduling_button>
        <el-button @click="simple_information()">查看/修改</el-button>
      </template>
    </TaskFrame>
  </div>
</template>

<script>
import TaskFrame from './component/frame.vue'
import RoomDelete from './knowing_component/room_delete.vue'
import InUserRoom from './knowing_component/in_user_room.vue'
import RoomRecover from './knowing_component/room_recover.vue'
import Statistical from './knowing_component/statistical.vue'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { TaskFrame, RoomDelete, RoomRecover, InUserRoom, Statistical },
  data() {
    return {
      input_user_object: {},
      // 待排班的用户列表
      user_list_str: '',
      excel_url: '',
      // 是否显示排班功能按钮
      is_show_button: true,
      options: [
        {
          value: 1,
          label: '黄金糕'
        },
        {
          value: 2,
          label: '双皮奶'
        },
        {
          value: 3,
          label: '蚵仔煎'
        }
      ]
    }
  },

  methods: {
    querySearch(queryString, cb) {
      var results = [
        { value: '统计审核' },
        { value: '随查' },
        { value: '检查' }
      ]
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 显示班表简易版
    simple_information() {
      this.$data.is_show_button = !this.$data.is_show_button
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

    // // 添加多个用户
    add_user_list_str() {
      const str = this.$data.user_list_str
      if (str.length < 1) return
      var user_list = str.split('\n')
      user_list.forEach(u => {
        this.$store
          .dispatch('school_information/student_information', {
            username: u
          })
          .then(res => {
            this.$refs.frame.roster.push(res.data)
          })
      })

      console.log(user_list)
    },

    // 排班 删除用户
    remove_user(layer, index) {
      layer.user.splice(index, 1)
    },
    // 排班 搜索用户
    search_user(layer) {
      this.$store
        .dispatch('school_information/student_information', {
          username: layer.user_object.username
        })
        .then(res => {
          layer.user_object = res.data
          this.add_user(layer)
        })

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random())
    }
  }
}
</script>

<style lang="scss" scoped>
.data-card {
  margin-top: 30px;
}
.roster_box {
  // background-color: aquamarine;
  // text-align: center;
}
.building {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}
.floor {
  font-size: 15px;
  font-weight: bold;
}
.input_type {
  width: 100px;
}
</style>
