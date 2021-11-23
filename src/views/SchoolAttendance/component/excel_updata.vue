<template>
  <div class="excel_updata">
    <!-- 文件上传对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="url"
        :on-success="on_success"
        :on-error="on_error"
        :on-progress="on_progress"
        :headers="{
          token: token(),
        }"
        :file-list="fileList"
        :auto-upload="false"
        :data="file_up_data"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传xlsx文件。数据导入不会重复导入
        </div>
      </el-upload>

      <!-- <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="data_str">
      </el-input> -->

      <el-table :data="up_error_list" max-height="350" style="width: 100%">
        <el-table-column prop="username" label="学号" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="message" label="信息" />
        <el-table-column prop="str_time" label="记录日期" />
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-button width="120" @click="dialogVisible = true"> 
      
    <slot></slot> </el-button>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { getToken } from "@/utils/auth";
export default {
    props:{
        url: String,
        title: String
    },
  data() {
    return {
      // 上传早签的地址
      in_zaoqian_MORNING_SIGN_excel_url:
        this.$api.school_attendance.in_zaoqian_MORNING_SIGN_excel_url,
      // 文件上传用
      fileList: [],
      file_up_data: {
        'tok':123
      },
      // 上传早签数据失败记录
      up_error_list: [],
      // 文件上传对话框
      dialogVisible: false,
      // 上传文件显示加载动画
      loading_flg: true,
      // 文本数据
      data_str:'206510101 2021/10/15\r206510101	2021/10/15'
    };
  },
  created(){
    this.data_str_encapsulation()
  },
  methods: {
    // 文本数据包装
    data_str_encapsulation(){
      let strs = this.data_str.split(/[\r\n]/)
      for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        var username = str.split(/[' '\t]/)
        console.log(username);
      }
      console.log(strs);
    },
    // 上传成功
    on_success(request, file, fileList) {
      this.$data.up_error_list = request.data;

      const loadingInstance = Loading.service();
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });

      this.$message({
        message: request.message,
        type: "success",
      });
    },
    // 文件上传用 ---
    submitUpload() {
      this.$refs.upload.submit();
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    on_error() {
      const loadingInstance = Loading.service();
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
      this.$message({
        message: "上传失败",
        type: "warning",
      });
    },
    on_progress() {
      this.$loading();
    },
    token() {
      return getToken();
    },


  },
};
</script>

<style>
.excel_updata{
  display: inline;
}
</style>