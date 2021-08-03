<template>
  <div>
    <TaskFrame
      ref="frame"
      :type="0"
      :excel_url="excel_url"
      :save_roster_store="'scheduling_update_knowing'"
      :flush_task_store="'task_rest_knowing'"
    >
      <!-- 班表面板 -->
      <template v-slot:scheduling="data">
        <div
          v-for="(floor, index) in data.roster"
          v-show="data.actives[data.active_index].is_open"
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
      </template>

      <template v-slot:scheduling_button>
        <el-button @click="simple_information()">查看/修改</el-button>
      </template>
    </TaskFrame>
  </div>
</template>

<script>
// import Tes from '@/components/Tes'
import TaskFrame from './component/frame.vue'
import { getToken } from '@/utils/auth'

export default {
  components: { TaskFrame },
  data() {
    return {
      input_user_object: {},
      // 待排班的用户列表
      user_list_str: '',

      // 是否显示排班功能按钮
      is_show_button: true
    }
  },
  created: function() {
    this.excel_url =
      this.$api.school_attendance.out_knowing_excel_data +
      '?task_id=1&token=' +
      getToken()
  },
  methods: {
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

    // 添加多个用户
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
        })

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random())
    }
  }
}
</script>
<style></style>
