<template>
  <div>

    <!-- 文件上传对话框 -->
    <el-dialog
      title="导入"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="in_zaoqian_excel_url"
        :on-success="on_success"
        :on-error="on_error"
        :on-progress="on_progress"
        :headers="{
          token: token()
        }"
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
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传xlsx文件。数据导入不会重复导入
        </div>
      </el-upload>

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

    <el-card>
      <div slot="header" class="clearfix">
        <span>考勤管理</span>
      </div>
      <!-- 分院筛选 -->
      <el-select v-model="college_id" placeholder="请选择分院">
        <el-option
          v-for="item in sorting_options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <!-- 时间筛选 -->
      <el-date-picker
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日"
        :picker-options="pickerOptions"
      />
      <el-input
        v-model="username"
        placeholder="请输入学号或姓名"
        style="width: 200px"
      />
      <el-button width="120" :loading="search_loading" @click="search()"> 搜索</el-button>
      <el-button width="120" @click="dialogVisible = true"> 导入早签</el-button>

      <!-- <a :href="out_data"> -->
      <el-button width="120" :loading="out_excel_disabled" @click="out_excel()">
        导出Excel
      </el-button>
    <!-- </a> -->

    </el-card>
    <div style="margin-top: 15px" />

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="student_approved_number"
          label="学号"
          width="180"
        />
        <el-table-column prop="student_approved" label="姓名" width="180" />
        <el-table-column prop="rule_str" label="原因" />
        <el-table-column prop="score" label="分数" />
        <el-table-column prop="room_str" label="寝室" />
        <el-table-column prop="grade_str" label="班级" />
        <el-table-column prop="worker" label="执行人" />
        <el-table-column prop="star_time" label="记录时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :type="scope.row.flg ? 'warning' : 'info'" width="120" @click="cancel(scope.row)">
              销假</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      :hide-on-single-page="true"
      :total="total"
      :page-size="page_size"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { dateFormat } from '@/utils/util.js'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      time: [new Date(), new Date()],
      username: '',
      // 搜索按钮是否可用
      disabled: true,
      // 导出按钮
      out_excel_disabled: false,
      page_size: 0,
      page: 1,
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableData: [],
      // 文件上传用
      fileList: [],
      // 上传早签数据失败记录
      up_error_list: [],
      // 上传早签的地址
      in_zaoqian_excel_url: this.$api.school_attendance.in_zaoqian_excel_url,
      // 导出考勤结果地址
      out_data: this.$api.school_attendance.out_excel_data,
      // 文件上传对话框
      dialogVisible: false,
      // 上传文件显示加载动画
      loading_flg: true,
      // 名单上传附带数据
      file_up_data: {
        // 'token':getToken()
      },
      // 文件上传头属性
      up_headers: {},
      // 搜索按钮加载状态
      search_loading: false,
      //   分院列表
      sorting_options: [],
      //   当前选择的分院
      college_id: 1
    }
  },
  created(){
    this.CollegeQuery()
  },
  methods: {
    // 搜索
    search(page) {
      var that = this
      const query = {
        start_date: dateFormat('YYYY-mm-dd', this.$data.time[0]),
        end_date: dateFormat('YYYY-mm-dd', this.$data.time[1]),
        college_id: this.college_id,
        page: page
      }
      if (this.$data.username) {
        query['username'] = this.$data.username
      }
      that.search_loading = true
      this.$store
        .dispatch('school_attendance/record_query', query)
        .then(res => {
          this.$data.page_size = res.data.page_size
          this.$data.total = res.data.total
          this.$data.tableData = res.data.results
          res.data.results.forEach(function(v, i) {
            v['flg'] = true
          })
          that.search_loading = false
        }).catch(e => {
          that.search_loading = false
        })
    },
    // 导出筛选的数据
    out_excel() {
      this.$data.out_excel_disabled = true
      var start_date = dateFormat('YYYY-mm-dd', this.$data.time[0])
      var end_date = dateFormat('YYYY-mm-dd', this.$data.time[1])

      var url =
        this.$data.out_data +
        '?start_date=' +
        start_date +
        '&end_date=' +
        end_date +
        '&username=' +
        this.$data.username +
        '&college_id=' +
        this.college_id
      window.location.href = url
      setTimeout(() => {
        this.$data.out_excel_disabled = false
      }, 1000 * 5)
    },
    token() {
      return getToken()
    },
    // 核销
    cancel(row) {
      this.$confirm('此操作将对该同学销假,并且记录您的信息 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('school_attendance/undo_record_admin', {
            record_id: row.id
          })
          .then(res => {
            row.flg = false
          })
      })
    },
    handleCurrentChange() {
      this.search(this.$data.page)
    },
    // 加载学院
    CollegeQuery(){
      this.$store
        .dispatch('school_information/college_query')
        .then(res => {
          this.sorting_options = res.data
        })
    },
    // 文件上传用 ---
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 上传成功
    on_success(request, file, fileList) {
      this.$data.up_error_list = request.data

      const loadingInstance = Loading.service()
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close()
      })

      this.$message({
        message: request.message,
        type: 'success'
      })
    },
    on_progress() {
      this.$loading()
    },
    on_error() {
      const loadingInstance = Loading.service()
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close()
      })
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
    // 文件上传用 ---
  }
}
</script>
<style lang="sass" scoped></style>
