<!--
 * @Author: 邹洋
 * @Date: 2021-09-24 15:28:16
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-24 16:59:51
 * @Description:
-->
<template>
  <div class="inline">
    <el-popover
      placement="top-start"
      title="取消学生入住"
      width="200"
      trigger="hover"
      content="针对假期大量学生请假时把这部分学生在宿舍的情况隐藏掉，剩下没有请假的学生，方便工作"
    >
      <el-button slot="reference" @click="room_delete_dialog_visible = true">取消学生入住</el-button>
    </el-popover>

    <el-dialog
      title="学生入住"
      :visible.sync="room_delete_dialog_visible"
      width="60%"
    >

      <!-- 输入框 -->、
      <el-input
        v-model="username_str"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 20}"
        placeholder="请输入学号 回车分割"
      />
      <div style="margin: 20px 0; text-align:right">
        <el-button type="primary" @click="stu_in_room_delete">隐藏列表里面的学生</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return {
      username_str: '',
      room_delete_dialog_visible: false

    }
  },
  methods: {
    stu_in_room_delete(){
      var username_list = this.username_str.split(/[\s\n]/)
      this.$store
        .dispatch('school_information/stu_in_room_delete', {
          username_list: username_list
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: res.data + '名学生设置为不在寝室显示'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

