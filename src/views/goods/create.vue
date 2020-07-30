<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <!-- <el-form-item label="商品ID" prop="ID" style="width: 500px;">
          <el-input v-model="goods.id" />
        </el-form-item> -->

        <el-form-item label="商品名称" prop="goodsName" style="width: 500px;">
          <el-input v-model="goods.goodsName" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price" style="width: 500px;">
          <el-input v-model="goods.price" />
        </el-form-item>
        <el-form-item label="商品排序" prop="sort" style="width: 500px;">
          <el-input v-model="goods.sort" />
        </el-form-item>
        <el-form-item label="已售数量" prop="sales" style="width: 500px;">
          <el-input v-model="goods.sales" />
        </el-form-item>
        <el-form-item label="厂商分类" prop="factoryId">
          <el-select v-model="goods.factoryId" placeholder="选择厂商">
            <el-option v-for="item in factoryList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类" prop="secondTypeId">
          <el-select v-model="goods.firstTypeId" clearable @change="changeFirstType">
            <el-option v-for="item in goodsFirstTypeAll" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="goods.secondTypeId" clearable>
            <el-option v-for="item in goodsSecondTypeAll" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品详情" prop="goodsDetails">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
            :file-list="goods.goodsDetails"
          >
            <i class="el-icon-plus" />
            <!-- <img v-if="goods.picUrl" :src="goods.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
          </el-upload>
        </el-form-item>

        <el-form-item label="轮播图" prop="goodsBanners">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-exceed="uploadOverrun1"
            :on-success="handleGalleryUrl1"
            :on-remove="handleRemove1"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
            :file-list="goods.goodsBanners"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content" style="width: 500px;">
          <el-input v-model="goods.content" type="textarea" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>商品规格</h3>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="4" style="width: 150px; text-align: right;">
          <el-button type="text">多规格支持</el-button>
        </el-col>
        <el-col :span="4">
          <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>
        </el-col>
      </el-row>

      <el-table :data="specifications" style="width: 800px; margin: 30px 0 0 150px;">
        <el-table-column property="name" label="规格名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column property="specSale" label="商品售价" align="center">
          <template slot-scope="{row}">
            <span>{{ row.price }}元</span>
          </template>
        </el-table-column>
        <el-table-column property="stock" label="库存数量" align="center">
          <template slot-scope="{row}">
            <span>{{ row.stock }}件</span>
          </template>
        </el-table-column>
        <!-- <el-table-column property="specSaleNum" label="已售数量" align="center">
          <template slot-scope="{row}">
            <span>{{row.sales}}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="操作"
          width="250"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="handleSpecificationDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="specVisiable" title="设置规格">
        <el-form
          ref="specForm"
          :rules="rules"
          :model="specForm"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item label="规格名称" prop="name">
            <el-input v-model="specForm.name" maxlength="15" />
          </el-form-item>
          <el-form-item label="商品进价" prop="purchase">
            <el-input v-model="specForm.purchase" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品售价" prop="price">
            <el-input v-model="specForm.price" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="库存数量" prop="stock">
            <el-input v-model="specForm.stock" tye="number" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleSpecificationAdd">确定</el-button>
        </div>
      </el-dialog>

    </el-card>

    <el-card class="box-card">
      <h3>首页显示</h3>
      <el-form ref="indexForm" :rules="rules" :model="indexData" label-width="150px">
        <el-form-item label="是否显示在首页" prop="home">
          <el-radio-group v-model="indexData.home">
            <el-radio :label="false" :value="false">不显示</el-radio>
            <el-radio :label="true" :value="true">显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页专区" prop="type">
          <el-select v-model="indexData.type" placeholder="选择专区">
            <el-option label="体验品专区" :value="0" />
            <el-option label="消费商专区" :value="1" />
            <el-option label="平价专区" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">提交</el-button>
    </div>

  </div>
</template>

<script>
import { goodsTypeListByParentId, uploadPath, goodsAdd, goodsUpdate, factoryAll, goodsDetailById, goodsSpecDelete } from '@/api/api'
// import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'GoodsCreate',
  data() {
    return {
      uploadPath,
      goodsFirstTypeAll: [],
      goodsSecondTypeAll: [],
      factoryList: [],

      goods: {
        goodsName: '',
        price: '',
        sort: '',
        factoryId: '',
        firstTypeId: '',
        secondTypeId: '',
        goodsDetails: [],
        goodsBanners: [],
        content: ''
      },

      specVisiable: false,
      specForm: {
        name: '',
        price: '',
        stock: ''
      },
      specifications: [],

      indexData: {
        home: false,
        type: ''
      },

      rules: {
        goodsName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入商品排序', trigger: 'blur' }],
        factoryId: [{ required: true, message: '请选择所属厂家', trigger: 'blur' }],
        secondTypeId: [{ required: true, message: '请选择商品二级分类', trigger: 'blur' }],
        goodsDetails: [{ required: true, message: '请上传商品详情图片', trigger: 'blur' }],
        goodsBanners: [{ required: true, message: '请上传商品轮播图', trigger: 'blur' }],
        name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
        sales: [{ required: true, message: '请输入售卖数量', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入库存数量', trigger: 'blur' }],
        home: [{ required: true, message: '请选择是否在首页展示', trigger: 'blur' }],
        type: [{ required: true, message: '请选择首页专区', trigger: 'blur' }],
        content: [{ required: true, message: '请输入商品内容', trigger: 'blur' }],
        purchase: [{ required: true, message: '请输入商品进价', trigger: 'blur' }]
      }

      // isEidt: false
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
    this.init()
    if (this.$route.query.id) {
      // this.isEidt = true
      this.getGoodsDetailById()
    } else {
      this.goods = {
        goodsName: '',
        price: '',
        sort: '',
        sales: '',
        factoryId: '',
        firstTypeId: '',
        secondTypeId: '',
        goodsDetails: [],
        goodsBanners: [],
        content: ''
      }
      this.specifications = []
      this.indexData = {
        home: false,
        type: ''
      }
    }
  },

  methods: {
    getGoodsDetailById() {
      const params = {
        id: this.$route.query.id
      }
      goodsDetailById(params).then(res => {
        const goods = res.data.data

        const info = []
        goods.info.split(',').forEach(item => {
          const obj = {
            name: item,
            url: item
          }
          info.push(obj)
        })

        const photo = []
        goods.photo.split(',').forEach(item => {
          const obj = {
            name: item,
            url: item
          }
          photo.push(obj)
        })
        this.getGoodsTypeAll(goods.classification.parentId, 'second')
        this.goods = {
          goodsName: goods.name,
          price: goods.price,
          sort: goods.sort,
          sales: goods.sales,
          factoryId: goods.supplierId.id,
          firstTypeId: goods.classification.parentId,
          secondTypeId: goods.classification.id,
          // secondTypeId: goods.classification,
          goodsDetails: info,
          goodsBanners: photo,
          content: goods.content
        }
        this.specifications = goods.specifications
        this.indexData = {
          home: goods.home,
          type: goods.type
        }
      }).catch(() => {
        this.goods = {
          goodsName: '',
          price: '',
          sort: '',
          sales: '',
          factoryId: '',
          firstTypeId: '',
          secondTypeId: '',
          goodsDetails: [],
          goodsBanners: [],
          content: ''
        }
        this.specifications = []
        this.indexData = {
          home: false,
          type: ''
        }
      })
    },
    init: function() {
      this.getGoodsTypeAll(0, 'first')
      this.getFactoryList()
    },
    getFactoryList() {
      factoryAll().then(res => {
        this.factoryList = res.data.data
      }).catch(() => {
        this.factoryList = []
      })
    },
    changeFirstType() {
      this.goods.secondTypeId = ''
      this.getGoodsTypeAll(this.goods.firstTypeId, 'second')
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
    handleCancel: function() {
      this.$router.push({ path: '/goods/list' })
    },
    handlePublish: function() {
      if (!this.specifications.length) {
        this.$notify.error({
          title: '失败',
          message: '请添加规格'
        })
        return
      }
      const goodsPicsStr = []
      this.goods.goodsDetails.forEach(item => {
        goodsPicsStr.push(item.url)
        // goodsPicsStr += item.url + ','
      })
      const goodsBannersStr = []
      this.goods.goodsBanners.forEach(item => {
        goodsBannersStr.push(item.url)
        // goodsBannersStr += item.url + ','
      })

      // const specificationsJson = this.specifications
      const supplierId = typeof (this.goods.factoryId) === 'object' ? this.goods.factoryId.id : this.goods.factoryId
      const finalGoods = {
        name: this.goods.goodsName,
        price: this.goods.price,
        sort: this.goods.sort,
        sales: this.goods.sales,
        supplierId: { id: supplierId },
        classification: { id: this.goods.secondTypeId },
        photo: goodsBannersStr.join(','),
        info: goodsPicsStr.join(','),
        specifications: this.specifications,
        home: this.indexData.home,
        type: this.indexData.type,
        content: this.goods.content
      }
      if (this.$route.query.id) {
        finalGoods.id = this.$route.query.id
        goodsUpdate(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '商品修改成功'
            })
            this.$router.push({ path: '/goods/list' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      } else {
        goodsAdd(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '商品添加成功'
            })
            this.$router.push({ path: '/goods/list' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      }
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleGalleryUrl(response, file, fileList) {
      if (response.code === 0) {
        this.goods.goodsDetails.push({ name: response.data, url: response.data })
      }
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goods.goodsDetails.length; i++) {
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
        if (this.goods.goodsDetails[i].url === url) {
          this.goods.goodsDetails.splice(i, 1)
        }
      }
    },
    uploadOverrun1: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleGalleryUrl1(response, file, fileList) {
      if (response.code === 0) {
        this.goods.goodsBanners.push({ name: response.data, url: response.data })
      }
    },
    handleRemove1: function(file, fileList) {
      for (var i = 0; i < this.goods.goodsBanners.length; i++) {
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

        if (this.goods.goodsBanners[i].url === url) {
          this.goods.goodsBanners.splice(i, 1)
        }
      }
    },
    handleSpecificationShow() {
      this.specForm = { name: '', price: '', stock: '' }
      this.specVisiable = true
    },
    handleSpecificationAdd() {
      var index = this.specifications.length - 1
      for (var i = 0; i < this.specifications.length; i++) {
        const v = this.specifications[i]
        if (v.name === this.specForm.name) {
          if (v.price === this.specForm.price) {
            this.$message({
              type: 'warning',
              message: '已经存在规格值:' + v.name
            })
            this.specForm = {}
            this.specVisiable = false
            return
          } else {
            index = i
          }
        }
      }

      this.specifications.splice(index + 1, 0, this.specForm)
      this.specVisiable = false

      // this.specToProduct()
    },
    handleSpecificationDelete(row) {
      if (row.id) {
        const params = {
          id: row.id
        }
        goodsSpecDelete(params).then(res => {
          const index = this.specifications.indexOf(row)
          this.specifications.splice(index, 1)
        }).catch(() => {
          this.$notify.error({
            title: '失败',
            message: '删除失败'
          })
        })
      } else {
        const index = this.specifications.indexOf(row)
        this.specifications.splice(index, 1)
      }
    }
  }
}
</script>

<style>
  .el-card {
    margin-bottom: 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .avatar-uploader .el-upload {
    width: 145px;
    height: 145px;
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

