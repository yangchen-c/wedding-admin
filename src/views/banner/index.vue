<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" prop="id" sortable>
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序" prop="sort" sortable>
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="轮播图标题" prop="name">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="轮播图图片" prop="photo">
        <template slot-scope="{row}">
          <img v-if="row.photo" :src="row.photo" width="80">
        </template>
      </el-table-column>

      <el-table-column align="center" label="跳转地址" prop="url">
        <template slot-scope="{row}">
          <a :href="row.url" target="_blank">{{ row.url }}</a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" prop="name">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dataForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" />
        </el-form-item>
        <el-form-item label="轮播图标题" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="轮播图图片" prop="photo">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="dataForm.photo" :src="dataForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转地址" prop="url">
          <el-input v-model="dataForm.url" />
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
    </el-dialog>
  </div>
</template>

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

<script>
import {
  bannerList,
  bannerAdd,
  bannerUpdate,
  bannerDelete,
  uploadPath
} from '@/api/api'
import { getToken } from '@/utils/auth'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Banner',
  // components: { Pagination },
  data() {
    return {
      uploadPath,
      list: [],
      // total: 0,
      listLoading: true,
      // listQuery: {
      //   page: 1,
      //   limit: 20
      // },
      dataForm: {
        id: undefined,
        sort: undefined,
        name: undefined,
        photo: undefined,
        url: undefined,
        remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        photo: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        url: [{ required: true, message: '请输入跳转url', trigger: 'blur' }]
      }
    }
  },
  computed: {
    headers() {
      return {
        token: getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      bannerList()
        .then((response) => {
          this.list = response.data.data
          // this.total = response.data.data.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          // this.total = 0
          this.listLoading = false
        })
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        sort: undefined,
        name: undefined,
        photo: undefined,
        url: undefined,
        remark: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    uploadUrl: function(response) {
      this.dataForm.photo = response.data
    },
    checkFileSize: function(file) {
      if (file.size > 1048576) {
        this.$message.error(
          `${file.name}文件大于1024KB，请选择小于1024KB大小的图片`
        )
        return false
      }
      return true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const temp = Object.assign({}, this.dataForm)
          const data = {
            sort: temp.sort,
            name: temp.name,
            photo: temp.photo,
            url: temp.url,
            remark: temp.remark
          }
          bannerAdd(data)
            .then((response) => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '轮播图添加成功'
              })
              this.getList()
            })
            .catch((response) => {
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          bannerUpdate(this.dataForm)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '轮播图修改成功'
              })
              this.getList()
            })
            .catch((response) => {
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
      bannerDelete(params)
        .then((response) => {
          this.$notify.success({
            title: '成功',
            message: '轮播图删除成功'
          })
          this.getList()
        })
        .catch((response) => {
          this.$notify.error({
            title: '失败',
            message: response.data.message
          })
        })
    }
  }
}
</script>
