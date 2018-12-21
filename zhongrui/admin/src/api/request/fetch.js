import axios from 'axios'
import { Loading,Message } from 'element-ui';
import Vue from 'vue'

export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60 * 1000 // 30秒超时
    })
    instance.interceptors.request.use(config => {
      // let loadingInstance = Loading.service({text:'正在努力的加载中!'});
      return config
    }, error => {
      Message({
        message: '加载超时',
        type: 'error'
      });
      // Vue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close();
      // });
      return Promise.reject(error)
    })
    instance(options)
      .then(response => { // then 请求成功之后进行什么操作
        // Vue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        //   loadingInstance.close();
        // });
        resolve(response) // 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error)
        // Vue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        //   loadingInstance.close();
        // });
        Message({
          message: '访问服务器出错!',
          type: 'error'
        });
        reject(error)
      })
  })
}
