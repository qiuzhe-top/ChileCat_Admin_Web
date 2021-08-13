<template>
  <div>
    <TaskFrame
      ref="frame"
      :type="2"
      :excel_url="excel_url"
      :save_roster_store="'scheduling_update_late'"
      :flush_task_store="'task_rest_late'"
    >
      <!-- 班表面板 -->
      <template v-slot:scheduling="data">
        <el-row :gutter="10">
          <el-col :xs="24" :md="24">
            <h3>添加</h3>
            <div class="input_box">
              <el-row :gutter="10">
                <el-col :xs="24" :md="9">
                  <el-input
                    v-model="input_user_object.username"
                    size="small"
                    placeholder="学号"
                  />
                </el-col>

                <el-col :xs="24" :md="9">
                  <el-input
                    v-model="input_user_object.name"
                    size="small"
                    placeholder="姓名"
                  />
                </el-col>

                <el-col :xs="24" :md="6">
                  <el-button
                    size="small"
                    icon="el-icon-search"
                    @click="search_user()"
                  >搜索</el-button>
                  <el-button
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="add_user()"
                  >添加</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <br>
          <el-col :xs="24" :md="8">
            <el-input
              v-model="user_list_str"
              type="textarea"
              :rows="2"
              placeholder="请输入多个学号"
            />
          </el-col>
          <el-col :xs="24" :md="4">
            <el-button @click="add_user_list_str()">添加</el-button>
          </el-col>

          <el-col :xs="24" :md="12">
            <h3>名单</h3>

            <div v-for="(item, index) in data.roster" :key="index">
              {{ item.username }}
              {{ item.name }}
              <el-button
                size="mini"
                icon="el-icon-close"
                @click="remove_user(index)"
              />
            </div>
          </el-col>
        </el-row>
      </template>

      <template v-slot:scheduling_button />
    </TaskFrame>
  </div>
</template>

<script>
// import Tes from '@/components/Tes'
import TaskFrame from './component/frame.vue'
export default {
  components: { TaskFrame },
  data() {
    return {
      excel_url: '',
      input_user_object: {},
      // 待排班的用户列表
      user_list_str: ''
    }
  },
  methods: {
    // 排班 添加用户
    add_user() {
      // layer.user.push(JSON.parse(JSON.stringify(layer.user_object)));
      if (this.$data.input_user_object.username == '') return
      this.$refs.frame.roster.push(this.$data.input_user_object)
      this.$data.input_user_object = {
        username: '',
        name: ''
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
    remove_user(index) {
      this.$refs.frame.roster.splice(index, 1)
    },
    // 排班 搜索用户
    search_user() {
      this.$store
        .dispatch('school_information/student_information', {
          username: this.$data.input_user_object.username
        })
        .then(res => {
          this.$data.input_user_object = res.data
        })

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {}, 1000 * 2 * Math.random())
    }
  }
}
</script>
<style></style>
