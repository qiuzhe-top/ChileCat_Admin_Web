<template>
  <div class="Audit">
    <div>班级：</div>
    <template>
      <el-radio
        v-for="item in classList"
        :key="item.index"
        v-model="radio"
        :label="item.id"
      >{{ item.name }}</el-radio>
    </template>
    <div>待审核：</div>
    <template>
      <el-table
        :data="askList"
        style="width: 100%"
      >
        <el-table-column
          type="expand"
          width="80"
        >
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="家长电话">
                <span>{{ props.row.parents_call }}</span>
              </el-form-item>
              <el-form-item label="学生电话">
                <span>{{ props.row.contact_info }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="students_name"
          label="照片"
          width="180"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 140px;"
              fit="contain"
              :src="scope.row.photo"
              :preview-src-list="[scope.row.photo]"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="students_name"
          label="姓名"
          width="80"
        />
        <el-table-column
          prop="ask_type"
          label="请假类型"
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
            <template v-if="role === 'teacher'">
              <el-button
                size="mini"
                type="danger"
                @click="ask_option(scope.$index, scope.row,2)"
              >递交上级</el-button>
            </template>
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
  name: 'Audit',
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
      'role',
      'askList'
    ])
  },
  watch: {
    radio: function (val) {
      this.get_ask_list()
    }
  },
  created: function () {
    console.log(this.classList)
    if (this.classList.length <= 0) {
      return
    }
    this.radio = this.classList[0].id
    // this.get_ask_list()
  },
  methods: {
    /**
     * 获取班级请假条数据
     */
    get_ask_list: function () {
      this.$store.dispatch('ask/getAsk', { type: 0, classid: this.radio })
    },
    /**
     * 审核请假条
     */
    ask_option: function (i, r, t) {
      this.$store.dispatch('ask/putAsk', { request: { id: r.id, operate_sate: t }, index: i }).then(res => {
        // 不能每次都请求 应该在前端进行列表清除的修改
        this.get_ask_list()
      })
    }
  }
}
</script>
<style >
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  /* color: #99a9bf; */
  margin-bottom: 7px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  color: #929292;
  width: 50%;
}
.el-table__expand-icon {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
.el-table__expand-icon:hover {
  background-color: #cacaca8c;
}
</style>
<style lang="scss" scoped>
.Audit {
  font-size: 20px;
  font-weight: bold;
  line-height: 46px;
}
</style>
