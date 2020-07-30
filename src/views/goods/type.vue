<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-select v-model="firstTypeId" clearable @change="changeFirstType">
        <el-option v-for="item in parentTypeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="ID" prop="id"/>

      <el-table-column align="center" label="排序" prop="sort">
        <template slot-scope="{row}">
          <span>{{row.sort}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类名称" prop="name">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类图片" prop="photo">
        <template slot-scope="{row}">
          <img :src="row.photo" width="100">
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" prop="remark">
        <template slot-scope="{row}">
          <span>{{row.remark}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <!-- 添加和修改弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort"/>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="dataForm.name" maxlength="4" />
        </el-form-item>
        <el-form-item label="分类图片" prop="photo">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="dataForm.photo" :src="dataForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上级分类" prop="parentId">
          <el-select v-model="dataForm.parentId" clearable>
            <el-option v-for="item in parentTypeList" :key="item.name" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { goodsTypeListByParentId, goodsTypeList, goodsTypeAdd, goodsTypeUpdate, goodsTypeDelete, uploadPath } from '@/api/api'
import { getToken } from '@/utils/auth'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsType',
  // components: { Pagination },
  data() {
    return {
      uploadPath,
      list: [],
      // total: 0,
      listLoading: true,
      firstTypeId: '',
      // listQuery: {
      //   page: 1,
      //   limit: 20
      // },
      dataForm: {
        id: undefined,
        sort: undefined,
        name: undefined,
        photo: undefined,
        remark: undefined,
        parentId: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改商品分类',
        create: '添加商品分类'
      },
      rules: {
        sort: [{ required: true, message: '请输入分类排序', trigger: 'blur' }],
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        photo: [{ required: true, message: '请上传分类图片', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择上级分类', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      parentTypeList: []
    }
  },
  created() {
    this.getList()
    this.goodsTypeListByParentId()
  },
  computed: {
    headers() {
      return {
        'token': getToken()
      }
    }
  },
  methods: {
    changeFirstType(e) {
      this.firstTypeId = e
      this.handleFilter()
    },
    handleFilter() {
      this.getList()
    },
    goodsTypeListByParentId() {
      const params = {
        parentId: 0
      }
      goodsTypeListByParentId(params)
        .then(response => {
          let result = response.data.data
          result.push({name: '无', id: 0})
          this.parentTypeList = result
        })
        .catch(() => {
          this.list = [{name: '无', id: 0}]
        })
    },
    getList() {
      this.listLoading = true
      const params = {
        parentId: this.firstTypeId
      }
      goodsTypeList(params)
        .then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.listLoading = false
        })
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        sort: undefined,
        name: undefined,
        photo: undefined,
        remark: undefined,
        parentId: undefined
      }
    },
    uploadUrl: function(response) {
      this.dataForm.photo = response.data
    },
    checkFileSize: function(file) {
      if (file.size > 1048576) {
        this.$message.error(`${file.name}文件大于1024KB，请选择小于1024KB大小的图片`)
        return false
      }
      return true
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const temp = Object.assign({}, this.dataForm)
          const data = {
            sort: temp.sort,
            name: temp.name,
            photo: temp.photo,
            remark: temp.remark,
            parentId: temp.parentId
          }
          goodsTypeAdd(data)
            .then(response => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '商品分类添加成功'
              })
              this.getList()
              this.goodsTypeListByParentId()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.message
              })
            })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const temp = Object.assign({}, this.dataForm)
          goodsTypeUpdate(temp)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '商品分类修改成功'
              })
              this.getList()
              this.goodsTypeListByParentId()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.message
              })
            })
        }
      })
    },
    handleDelete(row) {
      const temp = Object.assign({}, row)
      const params = {
        id: temp.id
      }
      goodsTypeDelete(params)
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>
