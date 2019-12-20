# vue-service
> vue-service demo

## Build Setup

``` bash
# install dependencies
npm install   //安装依赖

# serve with hot reload at localhost:8080
npm run dev   

# build for production with minification
npm run build
```

## nginx.conf配置部署

``` bash
location /service {
	try_files $uri $uri/ /service/index.html;
	default_type text/html;
	alias /home/zhangbiwu/nginx/vue_projects/service/dist;
}
```

## aponline查询示例链接

https://service-test.sunclouds.com/service/userinfo
