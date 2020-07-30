<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.number" clearable class="filter-item" style="width: 160px;" placeholder="请输入订单编号" @keyup.enter.native="handleFilter" />
      <!-- <el-date-picker v-model="listQuery.timeArray" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" /> -->
      <el-select v-model="listQuery.state" clearable style="width: 200px" class="filter-item" placeholder="请选择订单状态" @change="changeOrderStatus">
        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value" />
      </el-select>
      <el-select v-model="listQuery.goodType" clearable placeholder="选择专区" @change="changeGoodsType">
        <el-option label="体验品专区" :value="0" />
        <el-option label="消费商专区" :value="1" />
        <el-option label="平价专区" :value="2" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="订单ID" prop="id" />
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          <span>{{ scope.row.userId.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">{{ scope.row.state | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付金额">
        <template slot-scope="scope">
          <span>{{ scope.row.payment }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付方式">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品标题">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsId.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品规格">
        <template slot-scope="scope">
          <span>{{ scope.row.specificationsId.name }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="商品图片">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="厂商名称">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierId.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="购买数量">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="取货方式">
        <template slot-scope="scope">
          <span>{{ scope.row.deliveryType | getGoodsTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货地址">
        <template slot-scope="scope">
          <span>{{ scope.row.deliveryType ? '--' : scope.row.addressId.province + scope.row.addressId.city + scope.row.addressId.distinguish + scope.row.addressId.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="快递单号">
        <template slot-scope="scope">
          <span>{{ scope.row.deliveryType ? '--' : scope.row.expressNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="快递公司">
        <template slot-scope="scope">
          <span>{{ scope.row.deliveryType ? '--' : scope.row.expressName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="优惠券抵扣金额">
        <template slot-scope="scope">
          <span>{{ scope.row.coupon }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==1" type="success" size="mini" @click="handleShip(scope.row)">发货</el-button>
          <el-button v-if="scope.row.state==2" type="primary" size="mini" @click="handleDetail(scope.row)">物流</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">隐藏</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 发货对话框 -->
    <el-dialog :visible.sync="shipDialogVisible" title="发货">
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px" style="margin-left:50px;">
        <el-form-item label="快递公司" prop="expressName">
          <el-select v-model="shipForm.expressName" placeholder="请选择">
            <el-option v-for="(item, index) in expressNameList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="快递编号" prop="expressNumber">
          <el-input v-model="shipForm.expressNumber" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { orderList, orderExpress, orderDelete } from '@/api/api'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const statusMap = {
  0: '未付款',
  1: '已支付',
  2: '已发货',
  3: '已收货',
  4: '已完成',
  '-1': '已删除'
}

export default {
  name: 'Order',
  components: { Pagination },
  filters: {
    orderStatusFilter(status) {
      return statusMap[status]
    },
    stateTypeFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'warning',
        2: '',
        3: 'success',
        4: 'success',
        '-1': 'info'
      }
      return statusMap[status]
    },
    payTypeFilter(status) {
      const statusMap = {
        0: '微信',
        1: '支付宝'
      }
      return statusMap[status]
    },
    getGoodsTypeFilter(status) {
      const statusMap = {
        0: '快递',
        1: '自提'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        number: '',
        // timeArray: [],
        state: '',
        goodType: ''
      },
      // pickerOptions: {
      //   shortcuts: [{
      //     text: '最近一周',
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }, {
      //     text: '最近一个月',
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }, {
      //     text: '最近三个月',
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }]
      // },
      statusMap,
      // orderDialogVisible: false,
      // orderDetail: {
      //   order: {},
      //   user: {},
      //   orderGoods: []
      // },
      shipForm: {
        id: undefined,
        expressNumber: undefined,
        expressName: undefined
      },
      shipDialogVisible: false,
      rules: {
        expressNumber: [{ required: true, message: '请输入快递单号', trigger: 'blur' }],
        expressName: [{ required: true, message: '请选择快递公司', trigger: 'blur' }]
      },
      expressNameList: ['顺丰', '圆通', '中通', '申通', '韵达', '天天', '邮政']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // checkPermission,
    getList() {
      this.listLoading = true
      // if (this.listQuery.timeArray && this.listQuery.timeArray.length === 2) {
      //   this.listQuery.start = this.listQuery.timeArray[0]
      //   this.listQuery.end = this.listQuery.timeArray[1]
      // } else {
      //   this.listQuery.start = null
      //   this.listQuery.end = null
      // }
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      const params1 = {
        number: this.listQuery.number !== '' ? this.listQuery.number : undefined,
        state: this.listQuery.state !== '' ? this.listQuery.state : undefined,
        goodType: this.listQuery.goodType !== '' ? this.listQuery.goodType : undefined,
        supplierId: this.$route.params.id
      }
      orderList(params, params1).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    changeOrderStatus(e) {
      this.listQuery.orderStatus = e
      this.handleFilter()
    },
    changeGoodsType(e) {
      this.listQuery.goodType = e
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      // detailOrder(row.id).then(response => {
      //   this.orderDetail = response.data.data
      // })
      // this.orderDialogVisible = true
      window.open('https://www.kuaidi100.com/')
    },
    handleShip(row) {
      this.shipForm.id = row.id
      this.shipForm.expressNumber = row.expressNumber
      this.shipForm.expressName = row.expressName

      this.shipDialogVisible = true
      this.$nextTick(() => {
        this.$refs['shipForm'].clearValidate()
      })
    },
    confirmShip() {
      this.$refs['shipForm'].validate((valid) => {
        if (valid) {
          orderExpress(this.shipForm).then(response => {
            this.shipDialogVisible = false
            this.$notify.success({
              title: '成功',
              message: '确认发货成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
        }
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      orderDelete(params)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.message
          })
        })
    }
  }
}
</script>
