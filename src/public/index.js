const error = (error) => {
  if (error.toString().indexOf('401') !== -1) {
    console.log('error', error)
    window.location.href = '/#/zh-cn/login'
  }
}

export default {
  error: error
}
