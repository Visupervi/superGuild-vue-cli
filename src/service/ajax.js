import axios from '../service';
import {Toast} from 'vant'

/**
 * @Author Visupervi
 * @Date 2019/12/16 10:54
 * @Name 请求封装
 * @Param
 * @Return
 * @Description 对axios封装，错误信息统一处理
 */
// Axios.defaults.headers['Content-Type'] = 'application/json';
// Axios.defaults.headers['Vary'] = 'application/json';
// Axios.defaults.headers['Origin'] = 'localhost';

export default function $axios(url, data = {}, type = "GET", config = {}) {
  return new Promise((resolve, reject) => {
      let promise;
      if (type.toLocaleLowerCase() === "get") {
        promise = axios.get(url, {params: data})
      } else {
        promise = axios.post(url, data, config)
      }
      promise.then(res => {
        resolve(res);
      }).catch(err => {
      })
    }
  )
}
