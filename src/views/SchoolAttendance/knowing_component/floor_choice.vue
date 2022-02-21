<!--
 * @Author: 邹洋
 * @Date: 2022-01-31 14:43:38
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2022-02-02 11:55:59
 * @Description: 楼层选择
-->
<template>
  <div class="inline">
    <el-popover
      placement="top-start"
      title="楼层选择"
      width="200"
      trigger="hover"
      content="设置本任务可以检查哪些楼层"
    >
      <el-button
        slot="reference"
        @click="dialog_visible = true"
      >楼层设置</el-button>
    </el-popover>

    <el-dialog title="楼层选择" :visible.sync="dialog_visible" width="70%">
      <div style="" class="dialog-body">
        <el-collapse>
          <el-collapse-item v-for="(rooms, k) in room" :key="k">
            <template slot="title">
              <el-checkbox v-model="rooms.checkAll" :indeterminate="rooms.isIndeterminate" @change="handleCheckAllChange(rooms,k)">{{ k|room_str }}</el-checkbox>
            </template>
            <div style="margin: 15px 0;" />
            <el-checkbox-group v-model="rooms.checkedCities" @change="handleCheckedCitiesChange(rooms,k)">
              <el-checkbox v-for="city in rooms.cities" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>

        </el-collapse>
      </div>

      <div style="margin: 20px 0; text-align: right">
        <el-button
          type="primary"
          @click="save()"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  filters: {
    room_str: function (value) {
      return value.split('#')[0] + '号楼' + value.split('#')[1] + '层'
    }
  },
  data() {
    return {
      dialog_visible: false,

      room: {
        // '3#1': {
        //   checkAll: false,
        //   checkedCities: ['3#101', '3#102'],
        //   cities: ['3#101', '3#102', '3#103', '3#104'],
        //   isIndeterminate: false
        // }
      }
    }
  },
  created(){
    this.init_room()
  },
  methods: {
    // 是否全选
    handleCheckAllChange(rooms, k) {
      rooms.checkedCities = rooms.checkAll ? rooms.cities : []
      rooms.isIndeterminate = false
      console.log(rooms, k, rooms.checkedCities)
    },
    // 单个选择
    handleCheckedCitiesChange(rooms, k) {
      const checkedCount = rooms.checkedCities.length
      rooms.checkAll = checkedCount === rooms.cities.length
      rooms.isIndeterminate =
        checkedCount > 0 && checkedCount < rooms.cities.length
    },
    // 获取寝室数据
    init_room(){
      // 任务关联的房间号
      var buildings = this.$store.getters.task.buildings

      this.$store
        .dispatch('school_information/filter_building_all')
        .then(res => {
          var room = {}
          res.data.forEach(room_str => {
            room[room_str.substring(0, 3)] = {
              'checkAll': false,
              'checkedCities': [],
              'cities': [],
              'isIndeterminate': false
            }
          })

          res.data.forEach(room_str => {
            var floor = room_str.substring(0, 3)
            // 如果在任务已有列表
            if (buildings.indexOf(room_str) !== -1){
              room[floor]['isIndeterminate'] = true
              room[floor]['checkedCities'].push(room_str)
            }
            room[floor]['cities'].push(room_str)
            var n1 = room[floor]['checkedCities'].length
            var n2 = room[floor]['cities'].length
            if (n1 === n2){
              room[floor]['checkAll'] = true
              room[floor]['isIndeterminate'] = false
            }
          })
          this.room = room
          console.log(this.room)
        })
    },
    // 保存
    save(){
      var buildings = []
      for (const key in this.room) {
        const e = this.room[key].checkedCities
        buildings.push.apply(buildings, e)
      }
      var data = {}
      data['buildings'] = buildings
      data['task_id'] = this.$store.getters.task.id
      this.$store.dispatch('school_information/modify_task_floor_settings', data)
        .then(e => {
          Message.success(e.data)
        })
        .catch(c => {
          Message.success('保存失败')
        })
    }
  }
}
</script>

<style>
.dialog-body {
  height: 375px;
  overflow-y: auto;
}
</style>
