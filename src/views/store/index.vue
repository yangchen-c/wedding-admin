<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

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

      <el-table-column align="center" label="名称" prop="name">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="省市区" prop="province">
        <template slot-scope="{row}">
          <span>{{ row.province + row.city + row.distinguish }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" prop="address">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="店铺图片" prop="cover">
        <template slot-scope="{row}">
          <img :src="row.cover" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" label="使用人手机号" prop="phone">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="使用人密码" prop="password">
        <template slot-scope="{row}">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" prop="remark">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
          <!-- <el-button type="success" size="mini" @click="">详情</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort"/>
        </el-form-item>
        <el-form-item label="标题" prop="name">
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="封面图片" prop="cover">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="dataForm.cover" :src="dataForm.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="省市区" prop="selectedRegion">
          <el-cascader
            size="large"
            :options="regionData"
            v-model="dataForm.selectedRegion">
          </el-cascader>
        </el-form-item>
        <el-form-item label="具体地址" prop="address">
          <el-input v-model="dataForm.address"/>
        </el-form-item>
        <el-form-item label="使用人电话" prop="phone">
          <el-input v-model="dataForm.phone"/>
        </el-form-item>
        <el-form-item label="使用人密码" prop="password">
          <el-input v-model="dataForm.password"/>
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
import { storeList, storeAdd, storeUpdate, storeDelete, uploadPath } from '@/api/api'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'

export default {
  name: 'StoreMgmt',
  components: { Pagination },
  data() {
    return {
      uploadPath,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dataForm: {
        id: undefined,
        sort: undefined,
        name: undefined,
        cover: undefined,
        selectedRegion: [],
        remark: undefined,
        address: undefined,
        phone: undefined,
        password: undefined
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
        cover: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        selectedRegion: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入使用人电话', trigger: 'blur' }],
        password: [{ required: true, message: '请输入使用人密码', trigger: 'blur' }]
      },
      regionData,
      CodeToText
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
      storeList(this.listQuery)
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
    resetForm() {
      this.dataForm = {
        id: undefined,
        sort: undefined,
        name: undefined,
        cover: undefined,
        selectedRegion: [],
        remark: undefined,
        address: undefined,
        phone: undefined,
        password: undefined
      }
    },
    uploadUrl: function(response) {
      this.dataForm.cover = response.data
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
            cover: temp.cover,
            address: temp.address,
            province: this.CodeToText[temp.selectedRegion[0]],
            city: this.CodeToText[temp.selectedRegion[1]],
            distinguish: this.CodeToText[temp.selectedRegion[2]],
            phone: temp.phone,
            password: temp.password,
            remark: temp.remark
          }
          storeAdd(data)
            .then(response => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加成功'
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
          const data = {
            id: temp.id,
            sort: temp.sort,
            name: temp.name,
            cover: temp.cover,
            address: temp.address,
            province: this.CodeToText[temp.selectedRegion[0]],
            city: this.CodeToText[temp.selectedRegion[1]],
            distinguish: this.CodeToText[temp.selectedRegion[2]],
            phone: temp.phone,
            password: temp.password,
            remark: temp.remark
          }
          storeUpdate(data)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '修改成功'
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
      })
    },
    handleDelete(row) {
      const temp = Object.assign({}, row);
      const params = {
        id: temp.id
      }
      storeDelete(params)
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
