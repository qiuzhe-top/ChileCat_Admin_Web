<template>
  <div class="history">
    <div>班级选择</div>
    <template>
      <el-radio
        v-for="item in classList"
        :key="item.index"
        v-model="radio"
        :label="item.id"
      >{{ item.name }}</el-radio>
      <el-radio
        v-model="radio"
        label="2"
      >2</el-radio>
    </template>
    <div>表格展示</div>
    <template>
      <el-table
        :data="askList"
        style="width: 100%"
      >
        <el-table-column
          prop="students_name"
          label="姓名"
          width="80"
        />
        <el-table-column
          prop="reason"
          label="请假原因"
        />
        <el-table-column
          prop="place"
          label="请假地点"
        />
        <el-table-column
          prop="start_time"
          label="开始日期"
          width="180"
        />
        <el-table-column
          prop="end_time"
          label="结束日期"
          width="180"
        />
        <el-table-column
          prop="min"
          label="时长"
        />
        <el-table-column
          width="260"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="ask_option(scope.$index, scope.row,3)"
            >通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="ask_option(scope.$index, scope.row,2)"
            >递交上级</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="ask_option(scope.$index, scope.row,4)"
            >不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'History',
  data () {
    return {
      radio: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      ask_msg: {
        ask_type: 'ask_type',
        reason: 'reason',
        place: 'place',
        start_time: 'start_time',
        end_time: 'end_time'
      }
    }
  },
  computed: {
    ...mapGetters([
      'classList',
      'askList'
    ])
  },
  watch: {
    radio: function (val) {
      this.get_ask_list()
    }
  },
  created: function () {
    this.radio = this.classList[0].id
    // this.get_ask_list()
  },
  methods: {
    /**
     * 获取班级请假条数据
     */
    get_ask_list: function () {
      console.log(1)
      this.$store.dispatch('ask/getAsk', { type: 3, classid: this.radio })
    },
    /**
     * 审核请假条
     */
    ask_option: function (i, r, t) {
      console.log(i, r, t)
      this.$store.dispatch('ask/putAsk', { request: { id: r.id, operate_sate: t }, index: i }).then(res => {
        // 不能每次都请求 应该在前端进行列表清除的修改
        this.get_ask_list()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  font-size: 30px;
  line-height: 46px;
}
</style>
