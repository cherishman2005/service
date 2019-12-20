<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">quic-client</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" size="small">
        <el-form-item label="message">
          <el-input v-model="message"></el-input>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="sendQuicData" style="border-radius: 4px"><span class="el-icon-search margin"></span>sendQuicData</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div>
      <p>{{recvMsg}}</p>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { baseURL } from '@/global.js';
  import { removeToken,setBeforeLoginUrl } from '@/utils/auth'
  //import quic from 'node-quic'
  const quic = require('node-quic');

  export default {
    data() {
      return {
        message: '',
        recvMsg: ''
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      sendQuicData() {
        const port    = 1234
        const address = '192.168.68.133'
        
        // Now we send the data to the server.
        quic.send(port, address, { hello: this.message })
          .onData(data => {
            // This is the data that was sent right back
            const parsedData = JSON.parse(data)
            this.recvMsg = data;
            console.log("recv: " + data)
        
            // now we can stop the server from listening if we want this to be a one-off
            //quic.stopListening()
          })
      }
    }
  }
</script>

<style scoped>
  .dashboard {
    &-container {
      margin: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      //height: 300px;
    }
    &-text {
      font-size: 30px;
      line-height: 40px;
    }
  }
  
  .el-table .cell {
    white-space: pre;
  }
  
  .text {
    margin: 10px 25px;
    text-align: left;
    white-space: pre;
  }

</style>
