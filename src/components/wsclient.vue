<template>
  <div class="wsclient">
    <h2 style="text-align:left;">websocket test</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" size="small">
        <el-form-item label="count">
          <el-input v-model="count"></el-input>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="sendData()" style="border-radius: 4px"><span class="el-icon-search margin"></span>发送</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>

  //import h5svc from './h5service-yy-quickapp-test.js'

  export default {
    name : 'wsclient',
    data() {
      return {
        count: 0,
        ws: null,
        h5: null,
      }
    },
    created() {
      //let svc = h5svc();
      //this.h5 = new svc.NewH5();

      this.initWebSocket();
    },
    destroyed() {
      this.ws.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://192.168.68.133:8000/echo";
        this.ws = new WebSocket(wsuri);
        this.ws.onmessage = this.onmessage;
        this.ws.onopen = this.onopen;
        this.ws.onerror = this.onerror;
        this.ws.onclose = this.onclose;
      },
      onopen() { //连接建立之后执行send方法发送数据
        //let actions = {"test":"12345"};
        //this.websocketsend(JSON.stringify(actions));
        let num = Math.ceil(Math.random()*100);
        let msg = 'userid=' + num;
        console.log("open and send message：" + msg);
        // 发送消息
        this.websocketsend(msg);
      },
      onmessage(e) { //数据接收
        //const redata = JSON.parse(e.data);
        console.log("get message:"+e.data)
        if (++this.count < 5) {
          this.websocketsend("game1");
          console.log("count=" + this.count);
        }
      },
      onerror() { //连接建立失败重连
        this.initWebSocket();
      },
      onclose(e) { //关闭
        console.log('断开连接', e);
      },
      websocketsend(data) { //数据发送
        return new Promise((resolve, reject) => {
          this.ws.send(data);
        });
      },
      sendData() {
        let msg = 'userid=' + this.count;
        this.websocketsend(msg).then(res => {
          console.log("res=" + res);
        }).catch(err => {
          console.log("err=" + err);
        });
        
        console.log("sendData: count=" + this.count);
      },
    }
  }
</script>
<style lang='less'>
 
</style>
