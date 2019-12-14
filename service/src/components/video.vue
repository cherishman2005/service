<template>
  <div class="content_wrapper">
    <div class="swiper">
      <!--<mt-swipe :auto="3000" speed="3000">-->
        <!--<mt-swipe-item v-for="item in items" :key="item.id">-->
          <!--<a :href="item.href" rel="external nofollow" >-->
            <!--<img :src="item.url" class="img"/>-->
            <!--<span class="desc"></span>-->
          <!--</a>-->
        <!--</mt-swipe-item>-->
      <!--</mt-swipe>-->
    </div>
    <div class="sort">
      <ul >
          <li v-for="item in video_list" :key="item.id" @click.stop="link(item)">
           <a :href="item.video_url">
           <!--<a @click="link(item)"-->
             <div class="sort_main">
               <a href="javascript:;" class="sort_media"><img :src="item.pic"></a>
               <div class="sort_info">
                 <div class="sort_cont">
                   <h3 class="sort_tit">{{item.name}}</h3>
                   <!--<a><p>{{item.description}}</p></a>-->
                 </div>
                 <i class="sort_arrow"></i>
               </div>
             </div>
           </a>
          </li>
      </ul>
    </div>
    <div class="footcenter">
      <footer class="mod_footer">
        <!--<p class="copyright">Copyright © 19xx - <span>2019</span> YY. All Rights Reserved.</p>-->
        <div  class="copyright" ><a @click="showResult">show training result</a></div>
        <!--<p class="copyright">联系电话：07xx-860xxxxx </p>-->
      </footer>
    </div>
  </div>
</template>

<script>
  import logo from '../assets/img/logo.png'
  import banner1 from '../assets/img/1.png'
  import banner2 from '../assets/img/2.png'
  import banner3 from '../assets/img/3.png'
  import { mapState } from 'vuex';
  import { baseURL } from '@/global.js';
  import { removeToken,setBeforeLoginUrl } from '@/utils/auth'

  export default {
    data() {
      return {
        video_list: "",
      }
    },
    computed: {
      ...mapState({
        uid: 'openId'
      }),
    },
    mounted() {
      console.log("video uid:" + this.uid);
      this.$axios.get(baseURL + '/three_cloud/video_list/get').then(res => {
        if (res.status === 200) {
          this.video_list = res.data;
          //console.log("view_list: " + JSON.stringify(res.data));
        }
      })
      .catch(error => {
      });
    },
    methods: {
      link(e) {
        let click_params = { uid: this.uid, asset_id: e.video_id };
        console.log("click_params = " + JSON.stringify(click_params));
        this.$axios.post(baseURL + '/three_cloud/click_statistics/inc', JSON.stringify(click_params)).then(res => {
          if (res.status === 200) {
            //alert("ok: " + JSON.stringify(click_params));
            window.location.href = e.video_url;
          }
        })
        .catch(error => {
        });
        
        //removeToken();
      },
      showResult() {
        this.$router.push('/trainResult');
      }
    }
   }
</script>

<style scoped>
  body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  /*.swiper{*/
    /*max-width: 600px;*/
    /*margin: 0 auto;*/
    /*height: 150px;*/
    /*width: 100%;*/
  /*}*/
  /*.swiper img{*/
    /*height: 100%;*/
    /*width: 100%;*/
  /*}*/


  .sort {
    padding: 10px;
    background-color: #f4f4f4;
    max-width: 600px;
    margin: 0 auto;
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
    background: rgba(0, 0, 0, 0.3);
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
    color: rgba(0, 0, 0, .5);
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
  .footcenter {
    flex: 1;
    background-color: #F4F4F4;
    width: 100%
  }
  .mod_footer {
    padding: 5px 0;
    margin-bottom: 10px;
  }
  .mod_footer .copyright{
    font-size: 0.1rem;
    text-align: center;
    color: rgba(0, 0, 0, .5);
    .a{
      margin: 0 auto;
    }
  }
</style>
