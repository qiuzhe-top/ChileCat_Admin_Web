<!--
 * @Author: 邹洋
 * @Date: 2021-12-01 08:10:30
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2022-02-13 16:40:59
 * @Description:
-->
<template>
  <div class="dashboard-container">
    <el-row :gutter="10">

      <el-col
        :lg="8"
        :xl="1"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>系统信息</span>
          </div>
          <div class="dashboard-text">您好， {{ name }} </div>

          <el-tag type="success" closable>新版后台UI(规划中)：
            <a href="http://124.223.43.151:8817/">http://124.223.43.151:8817 </a>
          </el-tag>

        </el-card>
      </el-col>
      <el-col
        :lg="9"
        :xl="11"
      >
        <!-- <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>系统功能</span>
          </div>
          <div>
            <ExcelUpdata
              url="/api/school_information/upload/user/information"
              :is_down_excel="true"
              :title="'导入学生名单'"
            >导入学生名单</ExcelUpdata>
          </div>
        </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ExcelUpdata from '@/components/ExcelUpdata/index.vue'

export default {
  name: 'Dashboard',
  components: { ExcelUpdata },
  computed: {
    ...mapGetters(['name'])
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 15px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
