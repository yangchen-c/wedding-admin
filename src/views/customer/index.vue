<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary">新建</el-button>
      <el-button type="info">导出表格</el-button>
      <el-select v-model="value" clearable placeholder="选择门店">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="valueState" clearable placeholder="选择状态">
        <el-option
          v-for="item in optionsState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="请选择拍摄日期" />
      <el-input
        v-model="input"
        placeholder="请输入手机号"
        clearable
        style="width:180px;margin-left:50px"
      />
      <el-input v-model="input1" placeholder="请输入客户名称" clearable style="width:180px" />
      <el-button type="primary">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="date" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="名称" width="80" />
        <el-table-column align="center" prop="tel" label="联系电话" width="130" />
        <el-table-column align="center" prop="address" label="家庭住址" width="200" />
        <el-table-column align="center" prop="address" label="门店" />
        <el-table-column align="center" prop="address" label="订单类别" />
        <el-table-column align="center" prop="address" label="订单金额" />
        <el-table-column align="center" prop="address" label="状态" />
        <el-table-column align="center" prop="address" label="交付日期" />
        <el-table-column align="center" prop="address" label="操作" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { customerList } from '@/api/api'

export default {
  name: 'Customer',
  data() {
    return {
      value: '',
      valueState: '',
      options: [
        {
          value: '选项1',
          label: '石家庄'
        },
        {
          value: '选项2',
          label: '北京'
        }
      ],
      optionsState: [
        {
          value: '选项1',
          label: '待拍摄'
        },
        {
          value: '选项2',
          label: '选片中'
        }
      ],
      value1: '', // 日期
      input: '', // 手机号
      input1: '', // 客户名称
      // 表格数据
      tableData: [
        {
          date: '01',
          name: '王小虎',
          tel: '12345678910',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      customerList()
        .then((response) => {
          this.tableData = response.data.data
        })
        .catch(() => {
          this.tableData = []
        })
    }
  }
}
</script>

<style lang="less" scoped>
@rem: 1920/100rem;
#app {
  box-sizing: border-box;
  padding-left: 30 / @rem;
  padding-top: 30 / @rem;
  .tablee {
    margin-top: 20 / @rem;
  }
}
</style>
