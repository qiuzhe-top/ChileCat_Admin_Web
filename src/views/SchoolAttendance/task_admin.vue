<template>
  <div>
    <el-card class="box">
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
      <el-button width="120" :loading="search_loading" @click="search()">
        搜索</el-button>

      <div style="margin-top: 15px" />

      <div class="button_list">
        <div>
          <ExcelUpdata
            :url="$api.school_attendance.MORNING_SIGN"
            :title="'导入早签'"
          >导入早签</ExcelUpdata>
        </div>

        <div>
          <ExcelUpdata
            :url="$api.school_attendance.MORNING_POINT"
            :title="'导入晨点'"
          >导入晨点</ExcelUpdata>
        </div>

        <div>
          <ExcelUpdata
            :url="$api.school_attendance.MORNING_RUNNING"
            :title="'导入晨跑'"
          >导入晨跑</ExcelUpdata>
        </div>

        <!-- <div>
          <ExcelUpdata
            :url="$api.school_attendance.IN_CLASS"
            :title="'导入白天考勤'"
            >导入白天考勤</ExcelUpdata
          >
        </div> -->

        <div>
          <ExcelUpdata
            :url="$api.school_attendance.CANCELS"
            :title="'批量销假'"
          >批量销假</ExcelUpdata>
        </div>

        <div>
          <el-button
            width="120"
            :loading="out_excel_disabled"
            @click="out_excel()"
          >
            导出Excel
          </el-button>
        </div>
      </div>

      <div />
      <!-- <a :href="out_data"> -->
      <!-- </a> -->
    </el-card>
    <div style="margin-top: 15px" />

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索结果</span>
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
            <el-button
              :type="scope.row.flg ? 'warning' : 'info'"
              width="120"
              @click="cancel(scope.row)"
            >
              销假
            </el-button>
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
import { dateFormat } from '@/utils/util.js'
import ExcelUpdata from './component/excel_updata.vue'

export default {
  components: { ExcelUpdata },
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

      // 导出考勤结果地址
      out_data: this.$api.school_attendance.out_excel_data,
      // 搜索按钮加载状态
      search_loading: false,
      //   分院列表
      sorting_options: [],
      //   当前选择的分院
      college_id: 1
    }
  },

  created() {
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
        .then((res) => {
          this.$data.page_size = res.data.page_size
          this.$data.total = res.data.total
          this.$data.tableData = res.data.results
          res.data.results.forEach(function (v, i) {
            v['flg'] = true
          })
          that.search_loading = false
        })
        .catch((e) => {
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
          .then((res) => {
            var list = this.tableData
            for (var i = 0; i < list.length; i++) {
              var element = list[i]
              if (element.id == row.id) {
                element['flg'] = false
                this.$set(this.tableData, i, element)
                break
              }
            }
          })
      })
    },
    handleCurrentChange() {
      this.search(this.$data.page)
    },
    // 加载学院
    CollegeQuery() {
      this.$store.dispatch('school_information/college_query').then((res) => {
        this.sorting_options = res.data
      })
    }

    // 文件上传用 ---
  }
}
</script>

<style>
.button_list {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.button_list > div {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
