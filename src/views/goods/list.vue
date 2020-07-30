<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>

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
      <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
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

      <!-- <el-table-column align="center" min-width="100" label="进价">
        <template slot-scope="{row}">
          <span>{{ row.purchase }}元</span>
        </template>
      </el-table-column> -->

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

      <!-- <el-table-column align="center" label="备注">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column> -->

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
          <el-button type="success" size="mini" @click="showSpecList(row)">规格</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAll" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 规格列表 -->
    <el-dialog :visible.sync="detailDialogVisible" title="商品规格">
      <!-- <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreateSpec">添加</el-button>
      </div> -->
      <el-table v-loading="specListLoading" :data="specList" element-loading-text="正在查询中。。。" border fit highlight-current-row>

        <el-table-column align="center" label="ID" prop="id" />

        <el-table-column align="center" min-width="100" label="名称">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="进价">
          <template slot-scope="{row}">
            <span>{{ row.purchase }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="售价">
          <template slot-scope="{row}">
            <span>{{ row.price }}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="库存">
          <template slot-scope="{row}">
            <span>{{ row.stock }}件</span>
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdateSpec(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteSpec(row)">删除</el-button>
          </template>
        </el-table-column> -->

      </el-table>
    </el-dialog>

    <!-- 添加或修改对话框 -->
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="尺码" prop="trade_size">
          <el-input v-model="dataForm.trade_size" />
        </el-form-item>
        <el-form-item label="颜色" prop="trade_color">
          <el-input v-model="dataForm.trade_color" />
        </el-form-item>
        <el-form-item label="库存" prop="trade_num">
          <el-input v-model="dataForm.trade_num" type="number" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createDataSpec">确定</el-button>
        <el-button v-else type="primary" @click="updateDataSpec">确定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
import { goodsList, goodsDelete, goodsTypeListByParentId, goodsDetailById } from '@/api/api'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsList',
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
      specListLoading: true,
      specList: [],

      // dataForm: {
      //   id: undefined,
      //   trade_size: undefined,
      //   trade_color: undefined,
      //   trade_num: undefined,
      //   remark: undefined
      // },
      // dialogFormVisible: false,
      // dialogStatus: '',
      // textMap: {
      //   update: '修改规格',
      //   create: '添加规格'
      // },
      // rules: {
      //   trade_size: [{ required: true, message: '请输入规格尺码', trigger: 'blur' }],
      //   trade_color: [{ required: true, message: '请输入规格颜色', trigger: 'blur' }],
      //   trade_num: [{ required: true, message: '请输入规格库存', trigger: 'blur' }]
      // },
      selectedTradeId: '',

      goodsFirstTypeAll: [],
      goodsSecondTypeAll: []
    }
  },
  created() {
    this.getAll()
    this.getGoodsTypeAll(0, 'first')
  },
  methods: {
    getAll() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      const params1 = {
        type: this.listQuery.type !== '' ? this.listQuery.type : undefined,
        classificationId: this.listQuery.secondType !== '' ? this.listQuery.secondType : undefined,
        name: this.listQuery.name !== '' ? this.listQuery.name : undefined
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
    // getList() {
    //   this.listLoading = true
    //   const params = {
    //     page: this.listQuery.page,
    //     size: this.listQuery.limit,
    //     classificationId: this.listQuery.secondType
    //   }
    //   const params1 = {
    //     type: this.listQuery.type !== '' ? this.listQuery.type : undefined
    //   }
    //   goodsListByTypeId(params, params1).then(response => {
    //     let result = response.data.data.currentList
    //     result = result.map(item => {
    //       item.photos = item.photo.split(',')
    //       item.infos = item.info.split(',')
    //       return item
    //     })
    //     this.list = result
    //     this.total = response.data.data.totalRecords
    //     this.listLoading = false
    //   }).catch(() => {
    //     this.list = []
    //     this.total = 0
    //     this.listLoading = false
    //   })
    // },
    changeGoodsType(e) {
      this.listQuery.type = e
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getAll()
    },
    handleCreate() {
      this.$router.push({ path: '/goods/create' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/goods/create', query: { id: row.id }})
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      goodsDelete(params).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        // if (this.listQuery.secondType) {
        //   this.getList()
        // } else {
        //   this.getAll()
        // }
        this.getAll()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message
        })
      })
    },
    showSpecList(row) {
      this.detailDialogVisible = true
      this.selectedTradeId = row.id
      this.getSpecList(row.id)
    },
    getSpecList(selectedTradeId) {
      const params = {
        id: selectedTradeId
      }
      goodsDetailById(params)
        .then(res => {
          this.specList = res.data.data.specifications
          this.specListLoading = false
        })
        .catch(() => {
          this.specList = []
          this.specListLoading = false
        })
    }
    // handleCreateSpec() {
    //   this.resetForm()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // createDataSpec() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const data = {
    //         trade_id: this.selectedTradeId,
    //         name: this.dataForm.name,
    //         trade_size: this.dataForm.trade_size,
    //         trade_color: this.dataForm.trade_color,
    //         trade_num: this.dataForm.trade_num,
    //         remark: this.dataForm.remark
    //       }
    //       creditsGoodsSpecAdd(data).then(response => {
    //         this.dialogFormVisible = false
    //         this.$notify.success({
    //           title: '成功',
    //           message: '创建成功'
    //         })
    //         this.getSpecList(this.selectedTradeId)
    //       }).catch(response => {
    //         this.$notify.error({
    //           title: '失败',
    //           message: response.data.message
    //         })
    //       })
    //     }
    //   })
    // },
    // handleUpdateSpec(row) {
    //   this.dataForm = Object.assign({}, row)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // updateDataSpec() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const data = {
    //         trade_id: this.selectedTradeId,
    //         id: this.dataForm.id,
    //         name: this.dataForm.name,
    //         trade_size: this.dataForm.trade_size,
    //         trade_color: this.dataForm.trade_color,
    //         trade_num: this.dataForm.trade_num,
    //         remark: this.dataForm.remark
    //       }
    //       creditsGoodsSpecUpdate(data).then(() => {
    //         this.dialogFormVisible = false
    //         this.$notify.success({
    //           title: '成功',
    //           message: '更新成功'
    //         })
    //         this.getSpecList(this.selectedTradeId)
    //       }).catch(response => {
    //         this.$notify.error({
    //           title: '失败',
    //           message: response.data.message
    //         })
    //       })
    //     }
    //   })
    // },
    // handleDeleteSpec(row) {
    //   const params = {
    //     id: row.id
    //   }
    //   creditsGoodsSpecDelete(params)
    //     .then(response => {
    //       this.$notify.success({
    //         title: '成功',
    //         message: '删除成功'
    //       })
    //       this.getSpecList(this.selectedTradeId)
    //     })
    //     .catch(response => {
    //       this.$notify.error({
    //         title: '失败',
    //         message: response.data.message
    //       })
    //     })
    // }
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
</style>
