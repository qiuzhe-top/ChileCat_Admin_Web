<template>
  <div>
    <el-button width="120"> 导入早签</el-button>

    <!-- <el-date-picker
      v-model="time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker> -->

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
    <!-- value-format="yyyy-MM-dd" -->
    <el-input
      v-model="username"
      placeholder="请输入学号或姓名"
      style="width:200px;"
    />
    <el-button width="120" @click="search()"> 搜索</el-button>
    <el-button width="120"> 导出Excel</el-button>

    <div style="margin-top: 15px;" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="student_approved_number"
        label="学号"
        width="180"
      />
      <el-table-column prop="student_approved" label="姓名" width="180" />
      <el-table-column prop="rule_str" label="原因" />
      <el-table-column prop="room_str" label="寝室" />
      <el-table-column prop="grade_str" label="班级" />
      <el-table-column prop="worker" label="执行人" />
      <el-table-column prop="star_time" label="记录时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            width="120"
            type="warning"
            @click="cancel(scope.row)"
          >
            销假</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      :total="total"
      :page-size="page_size"
    />
  </div>
</template>

<script>
import { dateFormat } from "@/utils/util.js";
export default {
  data() {
    return {
      time: [new Date(), new Date()],
      username: "",
      // 搜索按钮是否可用
      disabled: true,
      page_size: 0,
      page:1,
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: []
    };
  },
  methods: {
    // 搜索
    search(page) {
      this.$api.SchoolAttendance.record({
        username: this.$data.username,
        start_date: dateFormat("YYYY-mm-dd", this.$data.time[0]),
        end_date: dateFormat("YYYY-mm-dd", this.$data.time[1]),
        page:page
      }).then(res => {
        // this.$data.tableData = res.data.data.results;
        console.log(res.data);
        this.$data.page_size = res.data.page_size;
        this.$data.total = res.data.total;
        this.$data.tableData = res.data.results;
      });
    },
    // 核销
    cancel(row){
        this.$confirm("此操作将对该同学销假,并且记录您的信息 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          console.log("销假");

          this.$api.SchoolAttendance.undo_record_admin({
            record_id: row.id,
          })
            .then((res) => {
              if (res.code === 2000) {
                this.$message({
                  message: res.message,
                  type: "success",
                });
                row.flg = false;
              }
            })
            .catch((err) => {
              this.$message({
                type: "info",
                message: "失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    handleCurrentChange(){
      this.search(this.$data.page)
    }
  }
};
</script>
<style lang="sass" scoped></style>
