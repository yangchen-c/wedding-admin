<template>
  <div class="app-container">

    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.time"
        type="month"
        placeholder="请选择日期"
        format="yyyy-MM"
        value-format="yyyy-MM"
        @change="changeDateRange"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px;"
    >
      <el-table-column label="日期" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="商品进价" align="center">
        <template slot-scope="{row}">
          <span>{{ row.purchase }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券抵扣金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coupon }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="销售数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}件</span>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      v-if="list.length"
      :key="sumaryTableKey"
      v-loading="sumaryListLoading"
      :row-class-name="tableRowClassName"
      :show-header="false"
      :data="sumaryList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="总计" align="center" width="200">
        <template>
          <span>月总计</span>
        </template>
      </el-table-column>
      <el-table-column label="销售额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="商品进价" align="center">
        <template slot-scope="{row}">
          <span>{{ row.purchase }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券抵扣金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coupon }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="销售数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}件</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { salesListByFactoryId } from '@/api/api'

export default {
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      listQuery: {
        time: parseTime(new Date(), '{y}-{m}')
      },
      sumaryList: [],
      sumaryTableKey: 1,
      sumaryListLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    getList() {
      const params = {
        supplierId: this.$route.params.id,
        time: this.listQuery.time
      }
      salesListByFactoryId(params).then(res => {
        this.list = res.data.data.list
        this.listLoading = false

        this.sumaryList = [res.data.data.sum]
        this.sumaryListLoading = false
      }).catch(() => {
        this.list = []
        this.listLoading = false

        this.sumaryList = []
        this.sumaryListLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    changeDateRange() {
      this.handleFilter()
    }
  }
}
</script>

<style scoped>
.cell-wrapper {
  margin-bottom: 20px;
}
.cell {
  text-align: center;
  height: 60px;
  line-height: 60px;
  border: 1px solid #e6e6e6;
  background: #eef1f6;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  color: #2c3e50;
}
</style>
<style>
.el-table .success-row {
  background: #f0f9eb;
}
</style>
