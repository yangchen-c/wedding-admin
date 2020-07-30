<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.firstType" clearable placeholder="请选择商品一级分类" @change="changeFirstType">
        <el-option v-for="item in goodsFirstTypeAll" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.secondType" clearable placeholder="请选择商品二级分类" @change="changeSecondType">
        <el-option v-for="item in goodsSecondTypeAll" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 160px;" placeholder="请输入商品名称" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.type" clearable placeholder="选择专区" @change="changeGoodsType">
        <el-option label="体验品专区" :value="0" />
        <el-option label="消费商专区" :value="1" />
        <el-option label="平价专区" :value="2" />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="商品ID" prop="id" />

      <el-table-column align="center" min-width="100" label="排序">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="售价">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品图片">
        <template slot-scope="{row}">
          <el-image v-for="(photo, index) in row.photos" :key="index" :src="photo" :preview-src-list="row.photos" style="width: 40px; height: 40px; margin-right: 5px;" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情图片">
        <template slot-scope="{row}">
          <el-image v-for="(info, index) in row.infos" :key="index" :src="info" :preview-src-list="row.infos" style="width: 40px; height: 40px; margin-right: 5px;" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="内容">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属分类">
        <template slot-scope="{row}">
          <span>{{ row.classification.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="厂家名称">
        <template slot-scope="{row}">
          <span>{{ row.supplierId.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="当前销量">
        <template slot-scope="{row}">
          <span>{{ row.sales }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品状态">
        <template slot-scope="{row}">
          <el-tag :type="row.state == 0 ? 'success' : 'danger' ">{{ row.state == 0 ? '在售' : '下架' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否展示在首页">
        <template slot-scope="{row}">
          <span>{{ row.home ? '是' : '否' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属专区">
        <template slot-scope="{row}">
          <span>{{ row.type | typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" style="padding: 7px 0;" @click="showSpecList(row)">销售情况</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAll" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 销售情况 -->
    <el-dialog :visible.sync="detailDialogVisible" title="销售情况">
      <div class="filter-container">
        <el-date-picker
          v-model="specListQuery.time"
          type="month"
          placeholder="请选择日期"
          format="yyyy-MM"
          value-format="yyyy-MM"
          @change="changeDateRange"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSpecFilter">
          搜索
        </el-button>
      </div>
      <el-table v-loading="specListLoading" :data="specList" element-loading-text="正在查询中。。。" border fit highlight-current-row>

        <el-table-column align="center" min-width="100" label="时间">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="销售总额">
          <template slot-scope="{row}">
            <span>{{ row.sales }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="进价">
          <template slot-scope="{row}">
            <span>{{ row.purchase }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="优惠券抵扣金额">
          <template slot-scope="{row}">
            <span>{{ row.coupon }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="销售数量">
          <template slot-scope="{row}">
            <span>{{ row.number }}件</span>
          </template>
        </el-table-column>

      </el-table>
      <el-table v-if="specList.length" v-loading="sumarySpecListLoading" :show-header="false" :row-class-name="tableRowClassName" :data="sumarySpecList" element-loading-text="正在查询中。。。" border fit highlight-current-row>

        <el-table-column label="总计" align="center" min-width="100">
          <template>
            <span>月总计</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="销售总额">
          <template slot-scope="{row}">
            <span>{{ row.sales }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="进价">
          <template slot-scope="{row}">
            <span>{{ row.purchase }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="优惠券抵扣金额">
          <template slot-scope="{row}">
            <span>{{ row.coupon }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="销售数量">
          <template slot-scope="{row}">
            <span>{{ row.number }}件</span>
          </template>
        </el-table-column>

      </el-table>
      <!-- <pagination v-show="specTotal>0" :total="specTotal" :page.sync="specListQuery.page" :limit.sync="specListQuery.limit" @pagination="getSpecList" /> -->
    </el-dialog>

  </div>
</template>

<script>
import { goodsList, goodsTypeListByParentId, salesListByGoodsId } from '@/api/api'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils/index'

export default {
  name: 'FactoryGoodsList',
  components: { BackToTop, Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        0: '体验品专区',
        1: '消费商专区',
        2: '平价专区'
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
        name: '',
        firstType: '',
        secondType: '',
        type: ''
      },
      detailDialogVisible: false,
      specList: [],
      specTotal: 0,
      specListLoading: true,
      specListQuery: {
        page: 1,
        limit: 20,
        time: parseTime(new Date(), '{y}-{m}')
      },
      selectedTradeId: '',

      goodsFirstTypeAll: [],
      goodsSecondTypeAll: [],

      sumarySpecListLoading: true,
      sumarySpecList: []
    }
  },
  created() {
    this.selectedTradeId = ''
    this.getAll()
    this.getGoodsTypeAll(0, 'first')
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    changeDateRange(e) {
      this.specListQuery.time = e
      this.handleSpecFilter(this.selectedTradeId)
    },
    getAll() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      const params1 = {
        type: this.listQuery.type !== '' ? this.listQuery.type : undefined,
        classificationId: this.listQuery.secondType !== '' ? this.listQuery.secondType : undefined,
        name: this.listQuery.name !== '' ? this.listQuery.name : undefined,
        supplierId: this.$route.params.id
      }
      goodsList(params, params1)
        .then(response => {
          let result = response.data.data.currentList
          result = result.map(item => {
            item.photos = item.photo.split(',')
            item.infos = item.info.split(',')
            return item
          })
          this.list = result
          this.total = response.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    changeSecondType() {
      this.handleFilter()
    },
    changeFirstType() {
      this.listQuery.secondType = ''
      this.getGoodsTypeAll(this.listQuery.firstType, 'second')
    },
    getGoodsTypeAll(parentId, level) {
      const params = {
        parentId: parentId
      }
      goodsTypeListByParentId(params)
        .then(res => {
          if (level === 'first') {
            this.goodsFirstTypeAll = res.data.data
          } else {
            this.goodsSecondTypeAll = res.data.data
          }
        })
        .catch(() => {
          this.goodsFirstTypeAll = []
          this.goodsSecondTypeAll = []
        })
    },
    changeGoodsType(e) {
      this.listQuery.type = e
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getAll()
    },
    handleSpecFilter() {
      this.specListQuery.page = 1
      this.getSpecList(this.selectedTradeId)
    },
    showSpecList(row) {
      this.specListQuery.time = parseTime(new Date(), '{y}-{m}')
      this.detailDialogVisible = true
      this.selectedTradeId = row.id
      this.getSpecList(row.id)
    },
    getSpecList(selectedTradeId) {
      const params = {
        goodsId: selectedTradeId,
        time: this.specListQuery.time
      }
      salesListByGoodsId(params)
        .then(res => {
          this.specList = res.data.data.list
          this.specListLoading = false
          this.sumarySpecList = [res.data.data.sum]
          this.sumarySpecListLoading = false
          this.specTotal = 0
        })
        .catch(() => {
          this.specList = []
          this.specListLoading = false
          this.sumarySpecList = []
          this.sumarySpecListLoading = false
          this.specTotal = 0
        })
    }
  }
}
</script>

<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .gallery {
    width: 80px;
    margin-right: 10px;
  }
  .goods-detail-box img {
    width: 100%;
  }
  .filter-container .filter-item {
    margin-bottom: 0;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
