import axios from 'axios';
import config from './config'

//http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.code == 202001){
      router.push({
        path:"/login",
        query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
	// if (url.indexOf('/content') > -1) {
	// 	url = 'https://www.fastmock.site/mock/0372cb2d6c9fb363b21c2faa1cf62e54/api' + url
	// } else {
	// 	url = 'https://www.fastmock.site/mock/0372cb2d6c9fb363b21c2faa1cf62e54' + url
	// }
  return new Promise((resolve,reject) => {
    axios.get(url, { params:params }, config)
	    .then(response => {
	      resolve(response.data);
	    })
	    .catch(err => {
	      reject(err)
	    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url, data, config)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url, data, config)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url, data, config)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}