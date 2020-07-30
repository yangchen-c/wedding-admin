import request from '@/utils/request'

// 上传文件
const uploadPath = process.env.VUE_APP_BASE_API + 'upload'
export { uploadPath }

export function uploadFile(data) {
  return request({
    url: 'upload',
    method: 'post',
    data
  })
}
// yc客户管理
export function customerList(params) {
  return request({
    url: 'store',
    method: 'get',
    params
  })
}
// yc门店管理
export function shopList(params) {
  return request({
    url: 'store',
    method: 'get',
    params
  })
}

export function shopAdd(data) {
  return request({
    url: 'store',
    method: 'post',
    data
  })
}

export function shopUpdate(data) {
  return request({
    url: 'store',
    method: 'put',
    data
  })
}

export function shopDelete(params) {
  return request({
    url: 'store',
    method: 'delete',
    params
  })
}
// yc分类管理
export function comboClassifyList(params) {
  return request({
    url: 'comboClassify',
    method: 'get',
    params
  })
}
export function comboClassifyAdd(data) {
  return request({
    url: 'comboClassify',
    method: 'post',
    data
  })
}

export function comboClassifyUpdate(data) {
  return request({
    url: 'comboClassify',
    method: 'put',
    data
  })
}

export function comboClassifyDelete(params) {
  return request({
    url: 'comboClassify',
    method: 'delete',
    params
  })
}

// yc套餐管理
export function comboList(params) {
  return request({
    url: 'combo',
    method: 'get',
    params
  })
}
export function comboAdd(data) {
  return request({
    url: 'combo',
    method: 'post',
    data
  })
}

export function comboUpdate(data) {
  return request({
    url: 'combo',
    method: 'put',
    data
  })
}

export function comboDelete(params) {
  return request({
    url: 'combo',
    method: 'delete',
    params
  })
}
// yc案例管理
export function caseList(params) {
  return request({
    url: 'case',
    method: 'get',
    params
  })
}
export function caseAdd(data) {
  return request({
    url: 'case',
    method: 'post',
    data
  })
}

export function caseUpdate(data) {
  return request({
    url: 'case',
    method: 'put',
    data
  })
}

export function caseDelete(params) {
  return request({
    url: 'case',
    method: 'delete',
    params
  })
}
// yc职位管理
export function positionList(params) {
  return request({
    url: 'position',
    method: 'get',
    params
  })
}
export function positionAdd(data) {
  return request({
    url: 'position',
    method: 'post',
    data
  })
}

export function positionUpdate(data) {
  return request({
    url: 'position',
    method: 'put',
    data
  })
}

export function positionDelete(params) {
  return request({
    url: 'position',
    method: 'delete',
    params
  })
}
// yc员工管理
export function staffList(params) {
  return request({
    url: 'staff',
    method: 'get',
    params
  })
}
export function staffAdd(data) {
  return request({
    url: 'staff',
    method: 'post',
    data
  })
}

export function staffUpdate(data) {
  return request({
    url: 'staff',
    method: 'put',
    data
  })
}

export function staffDelete(params) {
  return request({
    url: 'staff',
    method: 'delete',
    params
  })
}
// 轮播图增删改查
export function bannerList(params) {
  return request({
    url: 'banner',
    method: 'get',
    params
  })
}

export function bannerAdd(data) {
  return request({
    url: 'banner',
    method: 'post',
    data
  })
}

export function bannerUpdate(data) {
  return request({
    url: 'banner',
    method: 'put',
    data
  })
}

export function bannerDelete(params) {
  return request({
    url: 'banner',
    method: 'delete',
    params
  })
}

// 公告管理
export function noticeList(params) {
  return request({
    url: `notice/getPaging/${params.page}/${params.limit}`,
    method: 'get'
  })
}

export function noticeAdd(data) {
  return request({
    url: 'notice',
    method: 'post',
    data
  })
}

export function noticeUpdate(data) {
  return request({
    url: 'notice',
    method: 'put',
    data
  })
}

export function noticeDelete(params) {
  return request({
    url: 'notice',
    method: 'delete',
    params
  })
}

export function userDelete(params) {
  return request({
    url: 'user',
    method: 'delete',
    params
  })
}

// 康养讲堂
export function teacherVideoList(params) {
  return request({
    url: `class_room/getPaging/${params.page}/${params.limit}`,
    method: 'get'
  })
}

export function teacherVideoAdd(data) {
  return request({
    url: 'class_room',
    method: 'post',
    data
  })
}

export function teacherVideoUpdate(data) {
  return request({
    url: 'class_room',
    method: 'put',
    data
  })
}

export function teacherVideoDelete(params) {
  return request({
    url: 'class_room',
    method: 'delete',
    params
  })
}

// 店铺管理
export function storeList(params) {
  return request({
    url: `store/getPaging/${params.page}/${params.limit}`,
    method: 'get'
  })
}

export function storeAdd(data) {
  return request({
    url: 'store',
    method: 'post',
    data
  })
}

export function storeUpdate(data) {
  return request({
    url: 'store',
    method: 'put',
    data
  })
}

export function storeDelete(params) {
  return request({
    url: 'store',
    method: 'delete',
    params
  })
}

// 社区话题
export function topicList(params, params1) {
  return request({
    url: `community/getPaging/${params.page}/${params.limit}`,
    method: 'get',
    params: params1
  })
}

export function topicAdd(data) {
  return request({
    url: 'community',
    method: 'post',
    data
  })
}

export function topicUpdate(data) {
  return request({
    url: 'community',
    method: 'put',
    data
  })
}

export function topicDelete(params) {
  return request({
    url: 'community',
    method: 'delete',
    params
  })
}

// 厂商管理
export function factoryAll() {
  return request({
    url: `supplier`,
    method: 'get'
  })
}

export function factoryList(params) {
  return request({
    url: `supplier/getPaging/${params.page}/${params.limit}`,
    method: 'get'
  })
}

export function factoryAdd(data) {
  return request({
    url: 'supplier',
    method: 'post',
    data
  })
}

export function factoryUpdate(data) {
  return request({
    url: 'supplier',
    method: 'put',
    data
  })
}

export function factoryDelete(params) {
  return request({
    url: 'supplier',
    method: 'delete',
    params
  })
}

// 根据商品id获取销售情况
export function salesListByGoodsId(params) {
  return request({
    url: 'order/salesVolumeByGoodsId',
    method: 'get',
    params
  })
}

// 根据厂家id获取销售情况
export function salesListByFactoryId(params) {
  return request({
    url: 'order/salesVolumeBySupplierId',
    method: 'get',
    params
  })
}

// 商品分类
export function goodsTypeListByParentId(params) {
  return request({
    url: 'classification',
    method: 'get',
    params
  })
}

export function goodsTypeList(params) {
  return request({
    url: 'classification',
    method: 'get',
    params
  })
}

export function goodsTypeAdd(data) {
  return request({
    url: 'classification',
    method: 'post',
    data
  })
}

export function goodsTypeUpdate(data) {
  return request({
    url: 'classification',
    method: 'put',
    data
  })
}

export function goodsTypeDelete(params) {
  return request({
    url: 'classification',
    method: 'delete',
    params
  })
}

// 商品管理
export function goodsListByTypeId(params, params1) {
  return request({
    url: `goods/byClassificationId/${params.classificationId}/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}

export function goodsList(params, params1) {
  return request({
    url: `goods/getPaging/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}

export function goodsDetailById(params) {
  return request({
    url: `goods/getById`,
    method: 'get',
    params
  })
}

export function goodsAdd(data) {
  return request({
    url: 'goods',
    method: 'post',
    data
  })
}

export function goodsUpdate(data) {
  return request({
    url: 'goods',
    method: 'put',
    data
  })
}

export function goodsDelete(params) {
  return request({
    url: 'goods',
    method: 'delete',
    params
  })
}

// 商品规格删除
export function goodsSpecDelete(params) {
  return request({
    url: 'specification',
    method: 'delete',
    params
  })
}

// 厂家订单管理
export function orderList(params, params1) {
  return request({
    url: `order/getPaging/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}

// 订单发货
export function orderExpress(params) {
  return request({
    url: `order/expressNumber`,
    method: 'post',
    params
  })
}

export function orderDelete(params) {
  return request({
    url: `order`,
    method: 'delete',
    params
  })
}

// 提现管理
export function cashList(params) {
  return request({
    url: `withdrawal/getPaging/${params.page}/${params.size}`,
    method: 'get'
  })
}

export function cashCheck(data) {
  return request({
    url: `withdrawal`,
    method: 'put',
    data
  })
}

// 基础设置
export function bvPost(data) {
  return request({
    url: 'bv',
    method: 'post',
    data
  })
}

export function bvGet() {
  return request({
    url: 'bv',
    method: 'get'
  })
}

// 用户管理
export function userList(params) {
  return request({
    url: `user/getPaging/${params.page}/${params.size}`,
    method: 'get'
  })
}

export function userUpdate(data) {
  return request({
    url: 'user',
    method: 'put',
    data
  })
}

// 贫困户申请管理
export function poorList(params) {
  return request({
    url: `poor/getPaging/${params.page}/${params.size}`,
    method: 'get'
  })
}

export function poorCheck(data) {
  return request({
    url: `poor`,
    method: 'put',
    data
  })
}
