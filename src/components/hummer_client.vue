<template>
  <div class="wsclient">
    <h2 style="text-align:left;">hummer test</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" size="small">
        <el-form-item label="count">
          <el-input v-model="count"></el-input>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="sendData()" style="border-radius: 4px"><span class="el-icon-search margin"></span>hummer</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import hummer from '@/api/hummer'

  export default {
    name : 'hummer_client',
    data() {
      return {
        count: 0,
        websock: null,
      }
    },
    created() {
    },
    destroyed() {

    },
    methods: {
      sendData() {
        console.log("hummer");
      }
    }
  }
</script>
<style lang='less'>
 
</style>
