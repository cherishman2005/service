<template>
  <div class="sort">
    <ul>
       <li v-for="item in map_list" :key="item.id" @click="link(item)">
        <a @click="player3D(item.map_url)">
          <div class="sort_main">
          <a href="javascript:;" class="sort_media"><img :src="item.pic"></a>
          <div class="sort_info">
            <div class="sort_cont">
              <h3 class="sort_tit">{{item.name}}</h3>
            </div>
            <i class="sort_arrow"></i>
          </div>
        </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
  import logo from '../assets/img/logo.png'
  import { baseURL } from '@/global.js';

  export default {
    data(){
      return{
        map_list: "",
      }
    },
    mounted() {
      this.$axios.get(baseURL + '/three_cloud/map_list/get').then(res => {
        if (res.status === 200) {
          this.map_list = res.data;
          console.log("map_list: " + JSON.stringify(res.data));
        }
      })
      .catch(error => {
      });
    },
    methods: {
      player3D(url) {
        console.log("map_list: " + JSON.stringify(url));
        this.$router.push("/threeMap");
      },
    }
  }
</script>

<style scoped>
  .sort{
    padding: 10px;
    background-color: #f4f4f4;
    max-width: 600px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .sort li {
    margin-bottom: 10px;
    overflow: hidden;
  }
  .sort li .sort_main {
    display: -webkit-box;
    background: #fff;
  }
  .sort li .sort_media {
    position: relative;
    width: 80px;
    height: 80px;
    display: block;
  }
  .sort li .sort_media::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: rgba(0,0,0,0.3);
    z-index: 1;
  }
  .sort li .sort_media img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .sort li .sort_info {
    position: relative;
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .sort li .sort_cont {
    -webkit-box-flex: 1;
    margin: 0 10px 0 15px;
  }
  .sort li .sort_tit {
    font-size: 14px;
    color: #000;
    font-weight: normal;
    margin-bottom: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sort li .sort_cont p {
    font-size: 12px;
    color: rgba(0,0,0,.5);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sort li .sort_arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -4px;
    width: 6px;
    height: 6px;
    border-right: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    -webkit-transform: rotate(-45deg);
  }
</style>

