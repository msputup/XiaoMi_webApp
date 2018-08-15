function routerParse (type, path) {
  switch (type) {
    case 'cate': this.$router.push({name: 'productList', params: {id: path}})
      break
    default:console.log('未匹配的点击事件')
      break
  }
}
export default routerParse
