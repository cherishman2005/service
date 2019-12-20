<template>
  <div class="wsclient">
    <h2 style="text-align:left;">chat</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" size="small">
        <el-form-item label="count">
          <el-input v-model="count"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="sendCounter()" style="border-radius: 4px">计数</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-button type="primary"  @click="joinRoom()" style="border-radius: 4px">joinRoom</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  export default {
    name : 'chat',
    data() {
      return {
        count: 0,
        ws: null,
        h5_g_globals: {
          seqContext: [],
        }
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.ws.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        const uri = "ws://192.168.68.133:8000/echo";
        this.ws = new WebSocket(uri);
        this.ws.onmessage = this.onmessage;
        this.ws.onopen = this.onopen;
        this.ws.onerror = this.onerror;
        this.ws.onclose = this.onclose;
      },
      onopen() { //连接建立之后执行send方法发送数据
        //let actions = {"test":"12345"};
        //this.send(JSON.stringify(actions));
        let num = Math.ceil(Math.random()*100);
        let msg = 'userid=' + num;
        console.log("open and sendCounter：" + msg);
        // 发送消息
        this.sendCounter(msg);
      },
      onmessage(e) { //数据接收
        //const redata = JSON.parse(e.data);
        console.log("get message:"+e.data)
        if (++this.count < 5) {
          this.send("game1");
          console.log("count=" + this.count);
        }
      },
      onerror() { //连接建立失败重连
        this.initWebSocket();
      },
      onclose(e) { //关闭
        console.log('断开连接', e);
      },
      send(data) { //数据发送
        // CONNECTED: 1
        if (this.ws.readyState == 1) {
          this.ws.send(data);
        }
      },
      sendAppData(obj) {

      },
      sendData(obj) {
        return new Promise((resolve, reject) => {
          this.send(obj);

          let seqId = 0;
          this.h5_g_globals.seqContext[seqId] = {
            resolve: resolve,
            reject: reject,
          };

          resolve({code: 200, msg: 'ok'});
        });
      },
      sendCounter() {
        let msg = 'userid=' + this.count;
        this.sendData(msg).then(res => {
          console.log(res);
        });
        console.log("sendCounter: count=" + this.count);
      },
      joinRoom() {
        console.log("joinRoom");
      }
    }
  }
</script>
<style lang='less'>
 
</style>
