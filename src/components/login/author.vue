<script>
  import store from '@/store';
  //import wx from 'weixin-js-sdk';
  import { getQueryObject } from '@/utils'
  import { getToken,setToken,getBeforeLoginUrl,removeBeforeLoginUrl } from '@/utils/auth'
  import { baseURL} from '@/global.js'

  const emoji2Str = str => { return unescape(escape(str).replace(/\%uD.{3}/g, '')); }

  export default {
    name: 'author',
    data() {
        return {
        }
    },
    created() {
      //const hash = window.location.search.slice(1)

      //const hashObj = getQueryObject(hash)
      //const auth_code = hashObj['code']

      //alert("afterQRScan222=>auth_code="+auth_code)
      //if (!auth_code) {
      //  this.$router.push({ path: '/' })
      //} else 
      {
        let Url = baseURL + '/three_cloud/auth_user_info/select';
        this.$axios.post(Url).then((response) => {
          console.log("user_info: " + JSON.stringify(response.data))
          const data = response.data
          this.$store.commit('setOpenId', data.openid)
          
          /*
          //存储用户信息
          let params = {
            user_id: data.openid,
            nickname: emoji2Str(data.nickname),
            sex: data.sex,
            address: data.country + " " + data.province + " " + data.city,
            headimgurl: data.headimgurl
          };
          
          this.$axios.post(baseURL + '/three_cloud/auth_user_info/add', JSON.stringify(params))
            .then(res => {
              if (res.status === 200) {
                this.$store.commit('setUserInfo', params)
                this.$store.dispatch('getUserInfo').then(rsp => {
                  //alert("getUserInfo: " + JSON.stringify(rsp.data));
                  this.$store.commit('setUserInfo',rsp.data);
                })
              }
            });
          */
          
          setToken(data.openid);
          
          //alert("getBeforeLoginUrl: " + getBeforeLoginUrl());
          let redirect = getBeforeLoginUrl() || '/viewer';
          this.$router.push({ path: redirect });
          removeBeforeLoginUrl();

        }).catch(error => {
          //console.log(error)
        });
      }
    },
    methods: {
    }
  }
</script>
