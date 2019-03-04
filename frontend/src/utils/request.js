import axios from 'axios'
import config from '../config'
import store from '../store/index'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: config.BASE_API,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

service.interceptors.request.use(config => {
  const tk = store.state.token
  if (tk !== '') {
    config.headers['X-access-Token'] = tk
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    response = response.data
    return response;
  },
  error => {
    if (error.response && error.response.status) {            
        switch (error.response.status) {                
            case 401:                    
                this.$router.replace({                        
                    path: '/login',                        
                    query: { redirect: this.$router.currentRoute.fullPath } 
                });
                break;               
            case 403:                     
                Message({                        
                    message: '登录过期，请重新登录',                        
                    duration: 1000,
                    type: 'error'                       
                });                    
                localStorage.removeItem('token');                    
                store.commit('loginSuccess', null);                    
                this.$router.replace({                            
                  path: '/login',                            
                  query: { 
                      redirect: this.$router.currentRoute.fullPath 
                  }                        
                });                    
                break; 
            case 404:                    
                Message({                        
                    message: '网络请求不存在',                        
                    duration: 1500,                        
                    type: 'error'                   
                });                    
            break;                
            // 其他错误，直接抛出错误提示                
            default:                    
                Message({                        
                    message: error.response.data.message,                        
                    duration: 1500,                        
                    type: 'error'                    
                });            
        }            
        return Promise.reject(error.response);        
    }       
});

const request = arg => {
  return new Promise((resolve, reject) => {
    service(arg)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default request
