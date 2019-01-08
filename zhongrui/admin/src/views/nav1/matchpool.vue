<template>
  <section>
    <h3 :style="{color:'red'}">提供帮助列表:</h3>

    <el-col :span="24" class="toolbar">
      <el-button type="success" @click="Link">匹配</el-button>
    </el-col>

    <!--列表-->
    <el-table 
      :data="orderlist" 
      highlight-current-row 
      v-loading="listLoading" 
      style="width: 100%;"
      :border="true"
      :fit="true"
      :show-summary="true"
      :summary-method="getSummaries"
      @selection-change="selsChange"
      max-height="500">
      <el-table-column type="selection" width="60">
      </el-table-column>
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="ordercode" label="编号" width="100" sortable align="center">   
      </el-table-column>   
      <el-table-column prop="mobile" label="提供会员" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="amount" label="提供金额" width="200" sortable align="center">
      </el-table-column>
      <el-table-column prop="isday" label="排单天数" width="200" sortable align="center">
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
    <el-button type="danger" @click="handleDel" :disabled="this.sels.length===0">删除</el-button>
    </el-col>



    <h3 :style="{color:'red'}">接受帮助列表:</h3>
    <!--列表-->
    <el-table 
      :data="orderlist1" 
      highlight-current-row 
      v-loading="listLoading1" 
      style="width: 100%;"
      :border="true"
      @selection-change="selsChange"
      :fit="true"
      :show-summary="true"
      :summary-method="getSummaries"
      max-height="500">
      <el-table-column type="selection" width="60">
      </el-table-column>
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="ordercode" label="编号" width="100" sortable align="center">   
      </el-table-column>   
      <el-table-column prop="mobile" label="提供会员" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="amount" label="提供金额" width="200" sortable align="center">
      </el-table-column>
      <el-table-column prop="isday" label="排单天数" width="200" sortable align="center">
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="handleDel" :disabled="this.sels.length===0">删除</el-button>
    </el-col>
  </section>
</template>

<script>
import { requestMatchQuery,requestMatchDel,requestMatch } from '@/api/request/request';
import { timestampToTime } from '@/api/utils'
  export default {
    data() {
      return {
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        listLoading1: false,
        orderlist:[],
        orderlist1:[],
        sels: []
      }
    },
    methods: {
      selsChange(sels) {
          this.sels = sels;
      },
      callBackrequestMatchQuery(res){
        this.orderlist = res.data.data
        for ( var item in this.orderlist) {
          this.$set(this.orderlist[item],'isday','已排' + this.orderlist[item].isday + '天')
        }
        this.listLoading=false
      },
      callBackrequestMatchQuery1(res){
        this.orderlist1 = res.data.data
        for ( var item in this.orderlist1) {
          this.$set(this.orderlist1[item],'isday','已排' + this.orderlist1[item].isday + '天')
        }
        this.listLoading1=false
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 4 ){
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = '';
            }
          }
        });

        return sums;
      },
      callBackhandleDel(res){
        this.listLoading = false;
        this.requestQuery()
      },
      callBackhandleDelError(res){
        this.listLoading = false;
      },
      handleDel(){
        this.$confirm('确认删除记录吗?', '提示', {
            type: 'warning'
        }).then(() => {
          this.listLoading = true;
          var ordercodes = this.sels.map(item => item.ordercode).toString();
          requestMatchDel(
            {ordercode:ordercodes},
            this.callBackhandleDel,this.callBackhandleDelError)
        }).catch(() => {
        });
      },
      Link(){
        requestMatch({},this.callBackMatch)
      },
      callBackMatch(res){
        this.requestQuery()
      },
      requestQuery(){
        this.listLoading=true
        this.listLoading1=true
        requestMatchQuery({trantype:0},this.callBackrequestMatchQuery)
        requestMatchQuery({trantype:1},this.callBackrequestMatchQuery1)
      }
    },
    mounted() {
      this.requestQuery()
    }
  }

</script>

<style scoped>

</style>