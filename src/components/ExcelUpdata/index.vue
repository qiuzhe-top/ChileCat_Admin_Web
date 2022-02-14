<template>
  <div class="excel_updata">
    <!-- 文件上传对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="60%">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="url"
        :on-success="on_success"
        :on-error="on_error"
        :on-progress="on_progress"
        :on-change="onChangeFile"
        :on-remove="onRemoveFile"
        :headers="{
          token: token(),
        }"
        accept=".xlsx"
        :file-list="fileList"
        :auto-upload="false"
        :data="file_up_data"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
        >选取文件</el-button>
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div class="is_down_excel">
          <el-checkbox
            v-model="is_down_excel"
          >上传结果使用表格导出</el-checkbox>
        </div>
        <div slot="tip" class="el-upload__tip">
          请使用提供的模板上传。数据导入不会重复导入
        </div>
      </el-upload>

      <el-table
        v-show="!is_down_excel"
        :data="up_error_list"
        max-height="350"
        style="width: 100%"
      >
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
      <slot />
    </el-button>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { getToken } from '@/utils/auth'
import fileDownload from 'js-file-download'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    is_down_excel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 上传早签的地址
      in_zaoqian_MORNING_SIGN_excel_url:
        this.$api.school_attendance.in_zaoqian_MORNING_SIGN_excel_url,
      // 文件上传用
      fileList: [],
      file_up_data: {
        tok: 123
      },
      // 上传早签数据失败记录
      up_error_list: [],
      // 文件上传对话框
      dialogVisible: false,
      // 上传文件显示加载动画
      loading_flg: true,
      // 文本数据
      data_str: '206510101 2021/10/15\r206510101	2021/10/15',
      upFile: [], // 文件File 上传参数
      upFileList: [], // 文件File列表 上传参数
      showUpFile: true,
      //   is_down_excel: false,
      fullscreenLoading: false
    }
  },
  created() {
    // this.data_str_encapsulation()
  },
  methods: {
    // 选择上传文件
    onChangeFile(file, fileList) {
      const isLt25M = file.size / 1024 / 1024 < 25
      if (!isLt25M) {
        this.$msgbox.alert('上传文件大小不能超过 25MB!')
        return false
      }

      this.upFileList = []
      for (const x of fileList) {
        if (x.raw) {
          this.upFileList.push(x.raw)
        }
      }
      console.log(this.upFileList)
    },
    // 移除文件之前
    beforeRemove(file, fileList) {
      return this.$msgbox.alert(`确定移除 ${file.name}？`)
    },
    // 移除文件
    onRemoveFile(file, fileList) {
      this.upFileList = []
      for (const x of fileList) {
        if (x.raw) {
          this.upFileList.push(x.raw)
        }
      }
    },

    // 文件上传用 ---
    submitUpload() {
      if (this.upFileList.length === 0) {
        this.$message({
          message: '暂时没有需要上传的文件',
          type: 'success'
        })
        return
      }

      if (this.is_down_excel) {
        if (this.fullscreenLoading === false) {
          this.fullscreenLoading = true
        }
        const file = this.upFileList.shift()
        this.$api.school_attendance
          .batch_attendance(file, this.$props.url)
          .then((res) => {
            console.log(res)
            fileDownload(res, '考勤记录.xls')
            if (this.upFileList.length >= 1) {
              this.submitUpload()
            } else {
              this.closeLoading()
              this.$refs.upload.clearFiles()
              this.fullscreenLoading = false
            }
          })
          .catch((er) => {
            this.$message.error('上传失败')
          })
      } else {
        this.$refs.upload.submit()
      }
    },

    // 请求 上传产品文件 接口
    download() {
      console.log(this.upFileList, this.fileList)
    },
    // // 文本数据包装
    // data_str_encapsulation() {
    //   const strs = this.data_str.split(/[\r\n]/)
    //   for (let i = 0; i < strs.length; i++) {
    //     const str = strs[i]
    //     var username = str.split(/[' '\t]/)
    //   }
    // },
    // 上传成功
    on_success(request, file, fileList) {
      this.$data.up_error_list = []
      request.data.forEach((elem) => {
        var dict = {}
        dict['username'] = elem[0]
        dict['name'] = elem[1]
        dict['message'] = elem[2]
        dict['str_time'] = elem[3]
        this.$data.up_error_list.push(dict)
      })

      this.closeLoading()
      this.$refs.upload.clearFiles()

      this.$message({
        message: request.message,
        type: 'success'
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 文件上传时
    on_progress(event, file, fileList) {
      console.log(event, file, fileList)
      this.$loading()
    },
    on_error() {
      this.closeLoading()
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    },
    token() {
      return getToken()
    },
    closeLoading() {
      const loadingInstance = Loading.service()
      this.$nextTick(() => {
        loadingInstance.close()
      })
    }
  }
}
</script>

<style>
.excel_updata {
  display: inline;
}
.is_down_excel {
  display: inline-block;
  margin-left: 10px;
}
</style>
