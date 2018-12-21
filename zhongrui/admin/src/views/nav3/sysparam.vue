<template>
  <section>
    <el-col>
    <el-card class="box-card" style="margin-top:20px" shadow="always">
      <el-form ref="form" :model="orderlist" label-position="left" label-width="150px" size="mini">
        <el-form-item label="提供帮助金额">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.help_amount" placeholder="(格式：300,500,1000,3000,5000) 注意：中间是英文逗号(,)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="每天上午可排单资金总额">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.morning_amount" placeholder="每天上午可排单资金总额"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="每天下午可排单资金总额">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.after_amount" placeholder="每天下午可排单资金总额"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="超出该时间未打款可投诉">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.limit" placeholder="(单位:小时，超出该时间未打款用户可投诉)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="匹配后最后打款期限">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount_term" placeholder="(单位:小时，超过该时间未打款将自动封号)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="打款后收款期限">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount_term1" placeholder="(单位:小时,超出该时间未确认收款可投诉由后台操作)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="每天排单开始时间段1">
          <el-col :span="4">
            <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="orderlist.morning_time1" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="orderlist.morning_time2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="每天排单开始时间段2">
          <el-col :span="4">
            <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="orderlist.after_time1" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="orderlist.after_time2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="提供帮助排队期">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.term" placeholder="(排队周期,单位:小时)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="提现匹配排队期">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.term1" placeholder="(排队周期,单位:小时)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="(排单)两小时内打款利息">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.interset" placeholder="(%打款利息,如13%即写13)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="(排单)两小时后打款利息">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.interset1" placeholder="(%打款利息,如6%即写6)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="排队时间提醒">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.time1" placeholder="(单位:天)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="每天最多能提供帮助(排单)的次数">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.count1" placeholder="(单位:次)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="每天最多能申请帮助的次数">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.count2" placeholder="(单位:次)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="最大未完成提供帮助单数">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.count3" placeholder="(单位:次,会员未完成的提供帮助的单数超过该数即需先处理未打款单子才可重新申请提供)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请帮助(股权分红)最低金额(收益申请)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount1" placeholder="(股权分红申请帮助最低金额 单位:元)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请帮助股权分红*的倍数(收益申请)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount2" placeholder="(股权分红申请帮助必须是*的倍数)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请帮助股权分红最高限制金额(收益申请)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount3" placeholder="(股权分红申请帮助的每天最高限制金额)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请帮助推广股权最低金额">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount4" placeholder="(推广股权申请帮助最低金额 单位:元)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请帮助推广股权*的倍数(收益申请)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount5" placeholder="推广股权申请帮助必须是*的倍数"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请帮助(推广股权)每天最高限额">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount6" placeholder="推广股权申请帮助每天限额 单位:元)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="一代领导奖(%)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount7" placeholder="(普通一代领导奖 如5%即写5)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="二代领导奖(%)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount8" placeholder="(普通二代领导奖 如5%即写5)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="满足条件一代领导奖(%)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount9" placeholder="直推5人,二级15人之后一代导奖 如5%即写5）"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="满足条件二代领导奖(%)">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.amount10" placeholder="直推5人,二级15人之后二代导奖 如5%即写5）"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="转盘未中奖概率">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.bfbwzj" placeholder="比如:40,代表40%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="1000中将概率">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.bfb1000" placeholder="比如:40,代表40%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="2000中将概率">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.bfb2000" placeholder="比如:40,代表40%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="5000中将概率">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.bfb5000" placeholder="比如:40,代表40%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="10000中将概率">
          <el-col :span="this.spansize">
            <el-input v-model="orderlist.bfb10000" placeholder="比如:40,代表40%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </el-col>
  </section>
</template>

<script>
import { requestSysparamquery,requestSysparamupd } from '@/api/request/request';
import { timeformart } from '@/api/utils'
export default {
  data() {
    return {
      orderlist: {},
      spansize:16
    }
  },
  methods: {
    submitForm() {
      this.$set(this.orderlist,'morning1',timeformart(this.orderlist.morning_time1))
      this.$set(this.orderlist,'morning2',timeformart(this.orderlist.morning_time2))
      this.$set(this.orderlist,'after1',timeformart(this.orderlist.after_time1))
      this.$set(this.orderlist,'after2',timeformart(this.orderlist.after_time2))
      requestSysparamupd(this.orderlist)
    }
  },
  mounted() {
    requestSysparamquery({},(res)=>{
      this.orderlist=res.data.data
      this.orderlist.morning_time1=new Date(this.orderlist.morning_time1)
      this.orderlist.morning_time2=new Date(this.orderlist.morning_time2)
      this.orderlist.after_time1=new Date(this.orderlist.after_time1)
      this.orderlist.after_time2=new Date(this.orderlist.after_time2)
    })
  }
}
</script>

<style>
.line {
  text-align:center;
}
</style>
