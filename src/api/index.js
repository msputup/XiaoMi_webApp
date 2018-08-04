import axios from 'axios'
import url from './url.js'

function fetch (api, data) {
  return new Promise((resolve, reject) => {
    axios.post(url[api], data).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
  })
}

export default fetch
