<!--
 * @Author: 邹洋
 * @Date: 2021-09-24 15:28:16
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-24 16:59:38
 * @Description:
-->
<template>
  <div class="inline">

    <el-popover
      placement="top-start"
      title="取消学生入住"
      width="200"
      trigger="hover"
      content="对之前删除的学生进行恢复显示"
    >
      <el-button slot="reference" @click="room_recover_dialog_visible = true">恢复学生入住</el-button>
    </el-popover>

    <el-dialog
      title="学生入住"
      :visible.sync="room_recover_dialog_visible"
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
        <el-button type="primary" @click="stu_in_room_recover(false)">恢复列表中的学生</el-button>
        <el-button type="primary" @click="stu_in_room_recover(true)">恢复全部学生</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username_str: '',
      room_recover_dialog_visible: false

    }
  },
  methods: {
    stu_in_room_recover(is_all){
      var username_list = this.username_str.split(/[\s\n]/)
      this.$store
        .dispatch('school_information/stu_in_room_recover', {
          username_list: username_list,
          is_all: is_all,
          task_id: this.$store.getters.task.id
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: res.data + '名学生从寝室恢复显示'
          })
        })
    }
  }
}
</script>

<style>

</style>
