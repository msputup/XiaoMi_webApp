// const host = 'http://rap2api.taobao.org/app/mock/25079'
const host = 'http://127.0.0.1:8989'
const url = {
  login: '/user/login',
  getCode: '/user/getCode',
  homeNav: '/home/homeNav',
  PageData: '/home/pageData'
}

// 第一种方法
// Object.keys()转成数组遍历
Object.keys(url).forEach(key => {
  url[key] = host + url[key]
})

// 第二种方法
// for .. in 遍历
// for (let i in url) {
//   url[i] = host + url[i]
// }

// 第三种方法
// axios.defaults.baseURL = xxx 需要在index.js里操作
export default url
