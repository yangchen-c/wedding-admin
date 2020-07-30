<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>基础配置</h3>
      <el-form ref="service" :rules="rules" :model="service" label-width="200px">
        <el-form-item label="客服电话" prop="phone" style="width: 500px;">
          <el-input v-model="service.phone" type="number" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>会员配置</h3>
      <el-form ref="members" :rules="rules" :model="members" label-width="200px">
        <el-form-item label="实名奖励消费券个数" prop="auth" style="width: 500px;">
          <el-input v-model="members.auth" type="number" />
        </el-form-item>
        <el-form-item label="分享奖励消费券个数" prop="share" style="width: 500px;">
          <el-input v-model="members.share" type="number" />
        </el-form-item>
        <el-form-item label="消费券交易最低额" prop="lowerNum" style="width: 500px;">
          <el-input v-model="members.lowerNum" type="number" />
        </el-form-item>
        <el-form-item label="今日分红股价格" prop="sharePrice" style="width: 500px;">
          <el-input v-model="members.sharePrice" type="number" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>消费商配置</h3>
      <el-form ref="consumers" :rules="rules" :model="consumers" label-width="200px">
        <el-form-item label="获分红股最低消费金额" prop="lowerSales" style="width: 500px;">
          <el-input v-model="consumers.lowerSales" type="number" />
        </el-form-item>
        <el-form-item label="直推奖励销售额比例" prop="directSales" style="width: 500px;">
          <el-input v-model="consumers.directSales" type="number" />
        </el-form-item>
        <el-form-item label="直推奖励分红股增比" prop="directBonus" style="width: 500px;">
          <el-input v-model="consumers.directBonus" type="number" />
        </el-form-item>
        <el-form-item label="帮扶奖励销售额比例" prop="supportSales" style="width: 500px;">
          <el-input v-model="consumers.supportSales" type="number" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>代理商配置</h3>
      <el-form ref="agent" :rules="rules" :model="agent" label-width="200px">
        <el-form-item label="点位代理最低业绩" prop="pointMoney" style="width: 500px;">
          <el-input v-model="agent.pointMoney" type="number" />
        </el-form-item>
        <el-form-item label="代理分成比例" prop="pointPercent" style="width: 500px;">
          <el-input v-model="agent.pointPercent" type="number" />
        </el-form-item>

        <!-- <el-form-item label="落地实体店最低业绩" prop="entityMoney" style="width: 500px;">
          <el-input v-model="agent.entityMoney" type="number" />
        </el-form-item> -->
        <!-- <el-form-item label="落地实体店网内分成" prop="entityInPercent" style="width: 500px;">
          <el-input v-model="agent.entityInPercent" type="number" />
        </el-form-item> -->
        <el-form-item label="落地实体店网外分成" prop="entityOutPercent" style="width: 500px;">
          <el-input v-model="agent.entityOutPercent" type="number" />
        </el-form-item>

        <!-- <el-form-item label="直接分享消费商获利" prop="direct" style="width: 500px;">
          <el-input v-model="agent.direct" type="number" />
        </el-form-item>
        <el-form-item label="间接分享消费商获利" prop="indirect" style="width: 500px;">
          <el-input v-model="agent.indirect" type="number" />
        </el-form-item> -->
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>分红方式</h3>
      <el-form ref="bonus" :rules="rules" :model="bonus" label-width="200px">
        <el-form-item label="日增营业额分红比例" prop="dayBonus" style="width: 500px;">
          <el-input v-model="bonus.dayBonus" type="number" />
        </el-form-item>
        <el-form-item label="月增营业额分红比例" prop="monthBonus" style="width: 500px;">
          <el-input v-model="bonus.monthBonus" type="number" />
        </el-form-item>
        <el-form-item label="季增营业额分红比例" prop="quarterBonus" style="width: 500px;">
          <el-input v-model="bonus.quarterBonus" type="number" />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- <el-card class="box-card">
      <h3>分红股回购和交易</h3>
      <el-form ref="bonusTrade" :rules="rules" :model="bonusTrade" label-width="200px">
        <el-form-item label="分红股交易月增值比例" prop="tradeMonthAddPercent" style="width: 500px;">
          <el-input v-model="bonusTrade.tradeMonthAddPercent" type="number" />
        </el-form-item>
      </el-form>
    </el-card> -->

    <el-card class="box-card">
      <h3>提现配置</h3>
      <el-form ref="cash" :rules="rules" :model="cash" label-width="200px">
        <el-form-item label="消费券比例" prop="expense" style="width: 500px;">
          <el-input v-model="cash.expense" type="number" />
        </el-form-item>
        <el-form-item label="奖金券比例" prop="reward" style="width: 500px;">
          <el-input v-model="cash.reward" type="number" />
        </el-form-item>
        <el-form-item label="最低可提现金额" prop="lower" style="width: 500px;">
          <el-input v-model="cash.lower" type="number" />
        </el-form-item>
        <el-form-item label="提现手续费" prop="fee" style="width: 500px;">
          <el-input v-model="cash.fee" type="number" />
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
import { bvGet, bvPost } from '@/api/api'
import { getToken } from '@/utils/auth'

export default {
  name: 'BaseSetting',
  data() {
    return {
      service: {
        phone: ''
      },
      members: {
        auth: '',
        share: '',
        lowerNum: '',
        sharePrice: ''
      },

      consumers: {
        lowerSales: '',
        directSales: '',
        directBonus: '',
        supportSales: ''
      },

      agent: {
        pointMoney: '',
        pointPercent: '',

        // entityMoney: '',
        // entityInPercent: '',
        entityOutPercent: ''

        // direct: '',
        // indirect: ''
      },

      bonus: {
        dayBonus: '',
        monthBonus: '',
        quarterBonus: ''
      },

      // bonusTrade: {
      //   tradeMonthAddPercent: ''
      // },

      cash: {
        expense: '',
        reward: '',
        lower: '',
        fee: ''
      },

      rules: {
        phone: [{ required: true, message: '请输入客服电话', trigger: 'blur' }],

        auth: [{ required: true, message: '请输入实名奖励消费券个数', trigger: 'blur' }],
        share: [{ required: true, message: '请输入分享奖励消费券个数', trigger: 'blur' }],
        lowerNum: [{ required: true, message: '请输入消费券交易最低额', trigger: 'blur' }],
        sharePrice: [{ required: true, message: '请输入今日分红股价格', trigger: 'blur' }],

        lowerSales: [{ required: true, message: '请输入获分红股最低消费金额', trigger: 'blur' }],
        directSales: [{ required: true, message: '请输入直推奖励销售额', trigger: 'blur' }],
        directBonus: [{ required: true, message: '请输入直推分红股增比', trigger: 'blur' }],
        supportSales: [{ required: true, message: '请输入帮扶奖励销售额', trigger: 'blur' }],

        pointMoney: [{ required: true, message: '请输入点位代理最低业绩', trigger: 'blur' }],
        pointPercent: [{ required: true, message: '请输入点位代理分成比例', trigger: 'blur' }],
        // entityMoney: [{ required: true, message: '请输入落地实体店最低业绩', trigger: 'blur' }],
        // entityInPercent: [{ required: true, message: '请输入落地实体店网内分成比例', trigger: 'blur' }],
        entityOutPercent: [{ required: true, message: '请输入落地实体店网外分成比例', trigger: 'blur' }],
        // direct: [{ required: true, message: '请输入直接分享获利', trigger: 'blur' }],
        // indirect: [{ required: true, message: '请输入间接分享获利', trigger: 'blur' }],

        dayBonus: [{ required: true, message: '请输入日增营业额分红比例', trigger: 'blur' }],
        monthBonus: [{ required: true, message: '请输入月增营业额分红比例', trigger: 'blur' }],
        quarterBonus: [{ required: true, message: '请输入季增营业额分红比例', trigger: 'blur' }],

        // tradeMonthAddPercent: [{ required: true, message: '请输入分红股交易月增值比例', trigger: 'blur' }],

        expense: [{ required: true, message: '请输入消费券比例', trigger: 'blur' }],
        reward: [{ required: true, message: '请输入奖金券比例', trigger: 'blur' }],
        lower: [{ required: true, message: '请输入最低提现金额', trigger: 'blur' }],
        fee: [{ required: true, message: '请输入提现手续费', trigger: 'blur' }]
      }
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
    this.getBV()
  },
  methods: {
    getBV() {
      bvGet().then(res => {
        const data = JSON.parse(res.data.data)

        this.service = data.service
        this.members = data.members
        this.agent = data.agent
        // this.bonusTrade = data.bonusTrade
        this.bonus = data.bonus
        this.consumers = data.consumers
        this.cash = data.cash
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '获取信息失败'
        })
      })
    },
    handleCancel() {
      this.$router.push({ path: '' })
    },
    handlePublish() {
      const data = {
        service: this.service,
        members: this.members,
        consumers: this.consumers,
        agent: this.agent,
        bonus: this.bonus,
        // bonusTrade: this.bonusTrade,
        cash: this.cash
      }

      bvPost(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '设置成功'
        })
        this.getBV()
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '设置失败'
        })
      })
    }
  }
}
</script>

<style>
  .el-card {
    margin-bottom: 10px;
  }

  /*.el-tag + .el-tag {
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
  }*/
</style>

