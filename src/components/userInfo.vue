<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">Aponline在线查询</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" size="small">
        <el-form-item label="uid">
          <el-input v-model="uid"></el-input>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="getUserInfos" style="border-radius: 4px"><span class="el-icon-search margin"></span>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div>
      <el-table :data="userInfos" size="small"  highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                @row-click="rowClick" 
                :row-key="rowKey" 
                :expand-row-keys="expands" row-class-name="row"
                cell-class-name="flex-content" 
                :header-cell-style="{'background-color': '#EEF1F6','text-align': 'center', 'font-weight': 'bold'}" 
                :cell-style="{'text-align': 'center', 'color': '#424242', 'font-family': '微软雅黑'}">
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="UserKey.appkey" label="appkey" width="100" sortable>
        </el-table-column>
        <el-table-column prop="UserKey.instId" label="instId" width="100" sortable>
        </el-table-column>
        <el-table-column prop="UserKey.uconnId" label="uconnId" width="140" :formatter="formatUconnId" sortable>
        </el-table-column>
        <el-table-column prop="ApSvids" label="ApSvids" width="250" sortable>
          <template slot-scope="scope">
            <div class="text" v-html="scope.row.ApSvids"></div>
          </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="loginTime" width="160" :formatter="formatLoginTime" sortable>
        </el-table-column>
        <el-table-column prop="clientHeaders" label="clientHeaders" width="250" sortable>
          <template slot-scope="scope">
            <div class="text" v-html="scope.row.clientHeaders"></div>
          </template>
        </el-table-column>
        <el-table-column prop="deviceId" label="deviceId" width="250" sortable>
        </el-table-column>
        <el-table-column prop="instInfo" label="instInfo" width="100" sortable>
        </el-table-column>
        <el-table-column prop="termId" label="termId" width="100" sortable>
        </el-table-column>
        <el-table-column prop="userIp" label="userIp" width="180" align="left" sortable>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { baseURL } from '@/global.js';
  import { removeToken,setBeforeLoginUrl } from '@/utils/auth'

  const _int2ip = num => {
    let str;
    let tt = new Array();
    tt[3] = (num >>> 24) >>> 0;
    tt[2] = ((num << 8) >>> 24) >>> 0;
    tt[1] = (num << 16) >>> 24;
    tt[0] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
  }
  
  export default {
    data() {
      return {
        uid: '',
        userInfos: []
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      getUserInfos() {
        this.$axios.post(baseURL + '/DumpUserV2?uid=' + this.uid)
          .then(res => {
            if (res.status === 200) {
              console.log("res.data: " + JSON.stringify(res.data));
              this.userInfos = [];
              
              res.data.forEach(item => {
                let e = { UserKey: item.UserKey,
                          ApSvids: JSON.stringify(item.ApSvids, null, '\t'),
                          loginTime: item.UserOnlineInfo.loginTime,
                          clientHeaders: JSON.stringify(item.UserOnlineInfo.clientHeaders, null, '\t'),
                          deviceId: item.UserOnlineInfo.deviceId,
                          instInfo: item.UserOnlineInfo.instInfo,
                          termId: item.UserOnlineInfo.termId,
                          userIp: _int2ip(item.UserOnlineInfo.userIp) + ':' + item.UserOnlineInfo.userPort};
                this.userInfos.push(e);
              })
              
              console.log("userInfos: " + JSON.stringify(this.userInfos));
            }
          })
          .catch(error => {
            console.log("error: " + JSON.stringify(error));
          });
      },
      formatUconnId(row, column) {
        let idMap = new Map([
          [0, '新通道（0）'],
          [259, '信令通道（259）'],
          [260, 'service通道（260）']
        ]);

        return idMap.get(row.UserKey.uconnId);
      },
      formatLoginTime(row, column) {
        if (row.loginTime > 0) {
          let unixTimestamp = new Date(row.loginTime * 1000);
          return unixTimestamp.toLocaleString();
        }
        return 0;
      },
      syntaxHighlight(e) {
        if (e && (typeof e != 'string')) {
           return JSON.stringify(e, null, '\t');
        }
        return '';
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
