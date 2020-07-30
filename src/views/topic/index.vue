<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>

      <el-cascader
        v-model="listQuery.selectedRegion"
        size="large"
        :options="regionData"
        @change="changeAddress"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
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

      <el-table-column align="center" label="内容" prop="content">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="封面图" prop="videoCover">
        <template slot-scope="{row}">
          <img :src="row.videoCover" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" label="视频" prop="videoUrl">
        <template slot-scope="{row}">
          <video :src="row.videoUrl" width="60" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情图片" prop="name">
        <template slot-scope="{row}">
          <el-image v-for="photo in row.photos" :key="photo" :src="photo" :preview-src-list="row.photos" style="width: 40px; height: 40px; margin-right: 5px;" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="省市区" prop="province">
        <template slot-scope="{row}">
          <span>{{ row.province + row.city + row.distinguish }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="详细地址" prop="address">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="使用人" prop="userName">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="使用人电话" prop="phone">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
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
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="margin-left:50px;">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" />
        </el-form-item>
        <el-form-item label="标题" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="dataForm.content" type="textarea" />
        </el-form-item>
        <el-form-item label="封面图" prop="videoCover">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="dataForm.videoCover" :src="dataForm.videoCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频" prop="videoUrl">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadVideoUrl"
            class="avatar-uploader"
          >
            <video v-if="dataForm.videoUrl" :src="dataForm.videoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片" prop="infoUrl">
          <el-upload
            ref="upload"
            :action="uploadPath"
            :limit="10"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="handleInfoUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
            :file-list="dataForm.infoUrl"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="省市区" prop="selectedRegion">
          <el-cascader
            v-model="dataForm.selectedRegion"
            size="large"
            :options="regionData"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="dataForm.address" />
        </el-form-item>
        <el-form-item label="使用人" prop="userName">
          <el-input v-model="dataForm.userName" />
        </el-form-item>
        <el-form-item label="使用人电话" prop="phone">
          <el-input v-model="dataForm.phone" maxlength="11" />
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

<script>
import { topicList, topicAdd, topicUpdate, topicDelete, uploadPath } from '@/api/api'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'

export default {
  name: 'TopicMgmt',
  components: { Pagination },
  data() {
    return {
      uploadPath,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        selectedRegion: []
      },
      dataForm: {
        id: undefined,
        sort: undefined,
        name: undefined,
        videoCover: undefined,
        videoUrl: undefined,
        infoUrl: [],
        address: undefined,
        userName: undefined,
        phone: undefined,
        selectedRegion: [],
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
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        videoCover: [{ required: true, message: '请上传封面图片', trigger: 'blur' }],
        videoUrl: [{ required: true, message: '请上传视频', trigger: 'blur' }],
        infoUrl: [{ required: true, message: '请上传详情图片', trigger: 'blur' }],
        selectedRegion: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入使用人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入使用人电话', trigger: 'blur' }]
      },
      regionData,
      CodeToText,
      TextToCode
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
    changeAddress(e) {
      this.listQuery.selectedRegion = e
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      const params1 = {
        province: this.CodeToText[this.listQuery.selectedRegion[0]],
        city: this.CodeToText[this.listQuery.selectedRegion[1]],
        distinguish: this.CodeToText[this.listQuery.selectedRegion[2]]
      }
      topicList(params, params1)
        .then(response => {
          let result = response.data.data.currentList
          result = result.map(item => {
            item.photos = item.infoUrl.split(',')
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
    resetForm() {
      this.dataForm = {
        id: undefined,
        sort: undefined,
        name: undefined,
        videoCover: undefined,
        videoUrl: undefined,
        infoUrl: [],
        address: undefined,
        userName: undefined,
        phone: undefined,
        selectedRegion: [],
        remark: undefined
      }
    },
    uploadUrl: function(response) {
      this.dataForm.videoCover = response.data
    },
    checkFileSize: function(file) {
      if (file.size > 1048576) {
        this.$message.error(`${file.name}文件大于1024KB，请选择小于1024KB大小的图片`)
        return false
      }
      return true
    },
    uploadVideoUrl: function(response) {
      this.dataForm.videoUrl = response.data
    },
    uploadOverrun() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传10张图片!'
      })
    },
    handleInfoUrl(response, file, fileList) {
      if (response.code === 0) {
        this.dataForm.infoUrl.push({ name: response.data, url: response.data })
      }
    },
    handleRemove(file, fileList) {
      for (var i = 0; i < this.dataForm.infoUrl.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.dataForm.infoUrl[i].url === url) {
          this.dataForm.infoUrl.splice(i, 1)
        }
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
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const temp = Object.assign({}, this.dataForm)
          const infoUrlArr = []
          temp.infoUrl.forEach(item => {
            infoUrlArr.push(item.url)
          })
          const data = {
            sort: temp.sort,
            name: temp.name,
            content: temp.content,
            videoCover: temp.videoCover,
            videoUrl: temp.videoUrl,
            infoUrl: infoUrlArr.join(','),
            address: temp.address,
            province: this.CodeToText[temp.selectedRegion[0]],
            city: this.CodeToText[temp.selectedRegion[1]],
            distinguish: this.CodeToText[temp.selectedRegion[2]],
            userName: this.dataForm.userName,
            phone: this.dataForm.phone,
            remark: temp.remark
          }
          topicAdd(data)
            .then(response => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加成功'
              })
              this.$refs.upload.clearFiles()
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
      this.dataForm.infoUrl = this.dataForm.infoUrl.split(',')
      const infoUrl = []
      this.dataForm.infoUrl.forEach(item => {
        const obj = {
          name: item,
          url: item
        }
        infoUrl.push(obj)
      })
      this.dataForm.infoUrl = infoUrl

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
          const infoUrlArr = []
          temp.infoUrl.forEach(item => {
            infoUrlArr.push(item.url)
          })
          const data = {
            id: temp.id,
            sort: temp.sort,
            name: temp.name,
            content: temp.content,
            videoCover: temp.videoCover,
            videoUrl: temp.videoUrl,
            infoUrl: infoUrlArr.join(','),
            address: temp.address,
            province: this.CodeToText[temp.selectedRegion[0]],
            city: this.CodeToText[temp.selectedRegion[1]],
            distinguish: this.CodeToText[temp.selectedRegion[2]],
            userName: this.dataForm.userName,
            phone: this.dataForm.phone,
            remark: temp.remark
          }
          topicUpdate(data)
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
      const temp = Object.assign({}, row)
      const params = {
        id: temp.id
      }
      topicDelete(params)
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
.filter-container .filter-item {
  margin-bottom: 0;
}
</style>
