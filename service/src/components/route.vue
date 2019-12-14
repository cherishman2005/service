<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">新通道上下行调试系统</h2>
    <p style="text-align:left;">请求：(PCS_ServiceRouteRequest)</p>
    <el-form :model="routeRequest" label-width="120px" :rules="addFormRules" ref="routeRequest" style="width: 50%" size="mini">
      <el-form-item label="uid">
        <el-input disabled v-model="routeRequest.uid"></el-input>
      </el-form-item>
      <el-form-item label="appid">
        <el-input v-model="routeRequest.appid"></el-input>
      </el-form-item>
      <el-form-item label="instid">
        <el-input v-model="routeRequest.instid"></el-input>
      </el-form-item>
      <el-form-item label="serviceName">
        <el-input v-model="routeRequest.serviceName"></el-input>
      </el-form-item>
      <el-form-item label="functionName">
        <el-input v-model="routeRequest.functionName"></el-input>
      </el-form-item>
      <el-form-item label="protoType">
        <el-input v-model="routeRequest.protoType"></el-input>
      </el-form-item>
      <el-form-item label="data">
        <el-input type="textarea" :autosize="{minRows: 1, maxRows: 4}" v-model="routeRequest.data"></el-input>
      </el-form-item>
      <el-form-item label="traceId">
        <el-input v-model="routeRequest.traceId"></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <div style="text-align: left; margin: 0 auto; margin-top: 10px">
          <el-button type="primary" style="text-align:left;" @click="getRouteResponse">发送</el-button>
        </div>
      </el-form-item>
    </el-form>
    
    <div class="text">
      <p style="text-align:left;">响应：(PCS_ServiceRouteResponse)</p>
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" ><pre>{{route_response}}</pre></p>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { baseURL } from '@/global.js';
  import { removeToken,setBeforeLoginUrl } from '@/utils/auth'

  export default {
    data() {
      return {
        routeRequest: {
          uid: 0,
          appid: 1363787904,
          instid: 1001,
          serviceName: "simServer3",
          functionName: "nginxFunc111yyp",
          protoType: "",
          data: "nginx, route-proxy",
          clientHeaders: {SCKTerminal: "mobile"},
          traceId: this.getTraceId(),
        },
        route_response: "",
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      getRouteResponse() {
        let params = { uid: parseInt(this.routeRequest.uid),
                       appid: parseInt(this.routeRequest.appid),
                       instid: parseInt(this.routeRequest.instid),
                       serviceName: this.routeRequest.serviceName,
                       functionName: this.routeRequest.functionName,
                       protoType: this.routeRequest.protoType,
                       data: this.routeRequest.data,
                       clientHeaders: this.routeRequest.clientHeaders,
                       traceId: this.routeRequest.traceId };
        console.log("route_request: " + JSON.stringify(params));
        
        this.$axios.post(baseURL + '/yycf_sim_client_new?yyp=PCS_ServiceRouteRequest', JSON.stringify(params))
          .then(res => {
            if (res.status === 200) {
              console.log("route_response: " + JSON.stringify(res.data));
              //this.route_response = JSON.stringify(res.data);
              this.route_response = res.data;
            }
          })
          .catch(error => {
            console.log("error: " + JSON.stringify(error));
          });
      },
      getTraceId() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        
        month = (month >= 1 && month <= 9) ? ("0" + month) : month;
        strDate = (strDate >= 1 && strDate <= 9) ? ("0" + strDate) : strDate;
        
        return (year + month + strDate);
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

  .text {
    contenteditable: true
  }
  
  .rsp-text {
    contenteditable: true
  }

</style>
