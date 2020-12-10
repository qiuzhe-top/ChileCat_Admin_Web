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
        :data="historyList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="姓名"
          width="80"
        />
        <el-table-column
          prop="status"
          label="审核状态"
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
        <!-- <el-table-column
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
        </el-table-column> -->
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
      'historyList'
    ])
  },
  watch: {
    radio: function (val) {
      this.get_ask_list()
    }
  },
  created: function () {
    this.radio = this.classList[0].id
    // this.$store.dispatch('ask/history_ask')
    this.get_ask_list()
  },
  methods: {
    /**
     * 获取班级请假条数据
     */
    get_ask_list: function () {
      console.log(1)
      this.$store.dispatch('ask/history_ask', { type: 3, history: 1 })
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
