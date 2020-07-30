<template>
  <div class="app-container">

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="ID" prop="id" />

      <el-table-column align="center" label="提现金额">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现账号">
        <template slot-scope="scope">
          <span>{{ scope.row.userId.bankCard }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现时间">
        <template slot-scope="scope">
          <span>{{ scope.row.operationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">{{ scope.row.state | stateFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现人">
        <template slot-scope="scope">
          <span>{{ scope.row.userId.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === 0" type="success" size="mini" @click="handleCheck(scope.row, 2)">通过</el-button>
          <el-button v-if="scope.row.state === 0" type="danger" size="mini" @click="handleCheck(scope.row, 1)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="dataForm.content" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
import { cashList, cashCheck } from '@/api/api'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'NoticeMgmt',
  components: { Pagination },
  filters: {
    stateFilter(status) {
      const statusMap = {
        0: '审核中',
        1: '提现失败',
        2: '提现成功'
      }
      return statusMap[status]
    },
    stateTypeFilter(status) {
      const statusMap = {
        0: '',
        1: 'danger',
        2: 'success'
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
        limit: 20
        // name: ''
      }
      // dataForm: {
      //   id: undefined,
      //   name: undefined,
      //   sort: undefined,
      //   content: undefined,
      //   remark: undefined
      // },
      // dialogFormVisible: false,
      // dialogStatus: '',
      // textMap: {
      //   update: '编辑',
      //   create: '创建'
      // },
      // rules: {
      //   name: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
      //   sort: [{ required: true, message: '请输入公告排序', trigger: 'blur' }],
      //   content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
      // }
    }
  },
  computed: {
    headers() {
      return {
        'token': getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      cashList(params)
        .then(response => {
          this.list = response.data.data.currentList
          this.total = response.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleCheck(row, state) {
      const data = {
        id: row.id,
        state: state
      }
      cashCheck(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '审核成功'
        })
        this.getList()
      }).catch((response) => {
        this.$notify.error({
          title: '失败',
          message: response.data.message
        })
      })
    }
    // handleFilter() {
    //   this.listQuery.page = 1
    //   this.getList()
    // },
    // resetForm() {
    //   this.dataForm = {
    //     id: undefined,
    //     name: undefined,
    //     sort: undefined,
    //     content: undefined,
    //     remark: undefined
    //   }
    // },
    // handleCreate() {
    //   this.resetForm()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // createData() {
    //   this.$refs['dataForm'].validate(valid => {
    //     if (valid) {
    //       noticeAdd(this.dataForm)
    //         .then(response => {
    //           this.dialogFormVisible = false
    //           this.$notify.success({
    //             title: '成功',
    //             message: '创建成功'
    //           })
    //           this.getList()
    //         })
    //         .catch(response => {
    //           this.$notify.error({
    //             title: '失败',
    //             message: response.data.message
    //           })
    //         })
    //     }
    //   })
    // },
    // handleUpdate(row) {
    //   this.dataForm = Object.assign({}, row)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // updateData() {
    //   this.$refs['dataForm'].validate(valid => {
    //     if (valid) {
    //       noticeUpdate(this.dataForm)
    //         .then(() => {
    //           this.dialogFormVisible = false
    //           this.$notify.success({
    //             title: '成功',
    //             message: '更新成功'
    //           })
    //           this.getList()
    //         })
    //         .catch(response => {
    //           this.$notify.error({
    //             title: '失败',
    //             message: response.data.message
    //           })
    //         })
    //     }
    //   })
    // },
    // handleDelete(row) {
    //   const params = {
    //     id: row.id
    //   }
    //   noticeDelete(params)
    //     .then(response => {
    //       this.$notify.success({
    //         title: '成功',
    //         message: '删除成功'
    //       })
    //       this.getList()
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
