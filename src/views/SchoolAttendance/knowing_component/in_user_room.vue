<!--
 * @Author: 邹洋
 * @Date: 2021-09-24 16:14:24
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-24 19:40:18
 * @Description:
-->
<template>
  <div class="inline">

    <el-dialog
      title="寝室名单"
      :visible.sync="show"
      width="60%"
    >
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </el-dialog>

    <el-button slot="reference" @click="show = true">导入寝室数据</el-button>

  </div>
</template>

<script>
export default {
  data(){
    return {
      show: true

    }
  },
  methods: {
  }
}
</script>

<style>

</style>
