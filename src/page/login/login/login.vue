<template>
  <div class="m-lgn">
    <transition
      name="el-fade-in-linear">
      <div class="loginPage">
        <el-form
          class="form"
          :model="ruleForm"
          ref="ruleForm">
          <div class="item">
            <input
              type="text"
              name="username"
              placeholder="请输入用户名"
              autocomplete="off"
              ref="username">
          </div>
          <div class="item">
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              autocomplete="off"
              @keyup.enter="submitForm('ruleForm')"
              ref="pwd">
          </div>
          <div class="btn">
            <button
              data-v-d1feee42=""
              type="button"
              @click="submitForm('ruleForm')">登录</button>
          </div>
        </el-form>
      </div>
    </transition>
    <div class="backstretch">
      <img class="bg-img"
           @load="imgSize"
           :style="bgImg1"
           src="../../../assets/images/login/bgimg.jpg"
           ref="bgImg">
      <img class="bg-img"
           @load="imgSize"
           :style="bgImg2"
           src="../../../assets/images/login/bgimg2.jpg"
           ref="bgImg2">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 用户登录
//  const LoginAccount = vue => {
//    const login = new Promise((resolve, reject) => {
//      vue.$http({
//        method: 'post',
//        url: window.config.serverLogin + '/api/auth/login',
//        data: {
//          username: vue.ruleForm.userName,
//          password: vue.ruleForm.pwd
//        },
//        headers: {
//          'languageCode': vue.$route.params.lang
//        }
//      }).then((response) => {
//        resolve(response)
//      }).catch((error) => {
//        reject(error)
//      })
//    })
//    return login
//  }
//  // 获取用户详细信息
//  const GetUserInfo = vue => {
//    const userInfo = new Promise((resolve, reject) => {
//      vue.$http({
//        method: 'get',
//        url: window.config.serverLogin + '/api/me',
//        headers: {
//          'languageCode': vue.$route.params.lang,
//          'Authorization': 'Bearer ' + vue.$cookie.get('token')
//        }
//      }).then((response) => {
//        resolve(response)
//      }).catch((error) => {
//        reject(error)
//      })
//    })
//    return userInfo
//  }
  export default {
    name: '',
    data () {
      return {
        bgImg1: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        },
        bgImg2: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        },
        screenWidth: document.body.clientWidth,
        props: {
          value: 'label',
          children: 'cities'
        },
        ruleForm: {
          userName: '', // 用户名
          pwd: '' // 密码
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { pattern: /\S+/, message: '不能全为空格' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { pattern: /\S+/, message: '不能全为空格' }
          ]
        },
        loading: false
      }
    },
    components: {},
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.userName = this.$refs.username.value
            this.ruleForm.pwd = this.$refs.pwd.value
            // 登录用户
            if (this.ruleForm.userName === 'admin') {
              this.$cookie.set('user', this.ruleForm.userName, 1)
              this.$router.push('/' + this.$route.params.lang + '/news/news/newsList')
              console.log('ppp')
            } else {
              alert('用户名或密码错误')
            }
//            const Login = LoginAccount(this)
//
//            Login.then((resolve) => {
//              this.$cookie.set('token', resolve.data.token, 7)
//
//              const UserInfo = GetUserInfo(this)
//
//              UserInfo.then((resolve) => {
//                if (resolve.data.userType === 'PLATFORM') { // 运营
//                  this.$cookie.set('userType', '0', 1)
//                  this.$cookie.set('user', resolve.data.username, 1)
//                  let redirect = this.$route.query.redirect || '/'
//                  redirect = '/'
//                  this.$router.push(redirect)
//                }
//                if (resolve.data.userType === 'OPERATOR') { // 业主
//                  this.$cookie.set('userType', '1', 1)
//                  this.$cookie.set('user', resolve.data.username, 1)
//                  let redirect = this.$route.query.redirect || '/'
//                  redirect = '/'
//                  this.$router.push(redirect)
//                }
//              }).catch((reject) => {
//                window.publicFunction.error(reject)
//              })
//            }).catch((reject) => {
//              window.publicFunction.error(reject)
//            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      imgSize () {
        if (this.$refs.bgImg) {
          const naturalWidth = this.$refs.bgImg.naturalWidth || 0
          const naturalHeight = this.$refs.bgImg.naturalHeight || 0
          let widthSize = window.innerWidth / naturalWidth
          let heightSize = window.innerHeight / naturalHeight
          if (widthSize > heightSize) {
            this.bgImg1 = {
              position: 'absolute',
              top: (window.innerHeight - widthSize * naturalHeight) / 2 + 'px',
              left: 0,
              zIndex: 2,
              width: '100%',
              height: 'auto',
              opacity: 1
            }
            this.bgImg2 = {
              position: 'absolute',
              top: (window.innerHeight - widthSize * naturalHeight) / 2 + 'px',
              left: 0,
              zIndex: 1,
              width: '100%',
              height: 'auto',
              opacity: 1
            }
          } else {
            this.bgImg1 = {
              position: 'absolute',
              top: 0,
              left: (window.innerWidth - heightSize * naturalWidth) / 2 + 'px',
              zIndex: 2,
              width: 'auto',
              height: '100%',
              opacity: 1
            }
            this.bgImg2 = {
              position: 'absolute',
              top: 0,
              left: (window.innerWidth - heightSize * naturalWidth) / 2 + 'px',
              zIndex: 1,
              width: 'auto',
              height: '100%',
              opacity: 1
            }
          }
        }
      }
    },
    mounted: function () {
//      this.imgSize()
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
          this.imgSize()
        })()
      }
    },
    watch: {
      screenWidth (val) {
        this.screenWidth = val
      }
    }
  }
</script>

<style scoped>
  *{
    font-family:"PingFang SC","PingHei","STHeitiSC-Light", "Myriad Set Pro", "Lucida Grande","Helvetica Neue", "Helvetica","microsoft yahei","SimHei", "tahoma", "Arial","Verdana", "sans-serif";
    margin:0;
    padding:0;
    outline:none;
    hide-focus:expression(this.hideFocus=true);
  }
  .loginPage{
    width:490px;
    height:380px;
    position:absolute;
    left:50%;
    top:50%;
    margin:-190px 0 0 -245px;
    background:#fff;
    z-index:9;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border-radius:6px;
    border-top:5px solid #fc7b29;
  }
  .form{
    padding:140px 80px 20px 80px;
    background:url(../../../assets/images/login/logo.png) no-repeat center 60px;
  }
  .form .item{
    height:44px;
    width:330px;
    border:1px solid #dddee1;
    border-radius:5px;
    margin-bottom:18px;
  }
  .form .item input{
    width:100%;
    height:100%;
    border:0;
    background:none;
    text-indent:12px;
  }
  .form .btn{
    background: url(../../../assets/images/login/btn.png) no-repeat center center;
    width:344px;
    height:55px;
    line-height:55px;
    color:#fff;
    position:relative;
    left:-2px;
    margin-top:32px;
  }
  .form .btn button{
    display: block;
    width:100%;
    height:46px;
    border:0;
    background:none;
    font-size:14px;
    line-height:46px;
    color:#fff;
    cursor:pointer;
  }

  .backstretch{
    left: 0;
    top: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    z-index: -999999;
    position: fixed;
  }
  @keyframes bg-img1 {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes bg-img2 {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .bg-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .bg-img:nth-last-of-type(1){
    animation: bg-img1 10s infinite;
  }
  .bg-img:nth-last-of-type(2){
    animation: bg-img2 10s infinite;
  }
</style>

<style>
  .m-lgn .el-form-item__label{
    color: #dadada;
  }
</style>
