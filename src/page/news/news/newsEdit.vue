<template>
  <div class="m-odr"
       v-loading="loading">
    <transition name="el-fade-in-linear">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        size="mini"
        class="demo-ruleForm s-ov-au">
        <el-form-item style="width: 50%;float: left;" label="登录名" prop="userName">
          <el-input v-model="ruleForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item style="width: 50%;float: left;" label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item style="width: 50%;float: left;" label="电子邮箱" prop="eMail">
          <el-input v-model="ruleForm.eMail"></el-input>
        </el-form-item>
        <el-form-item style="width: 50%;float: left;" label="手机" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item style="float: left">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // 编辑用户
  const EditAccount = (vue, id) => {
    const account = new Promise((resolve, reject) => {
      vue.$http({
        method: 'post',
        url: window.config.serverLogin + '/api/v1/accounts/' + id,
        data: {
          id: id,
          name: vue.ruleForm.name,
          email: vue.ruleForm.eMail,
          mobile: vue.ruleForm.mobile
        },
        headers: {
          'languageCode': vue.$route.params.lang,
          'Authorization': 'Bearer ' + vue.$cookie.get('token')
        }
      }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
    return account
  }
  // 获取用户信息
  const GetAccountInfo = (vue, id) => {
    const account = new Promise((resolve, reject) => {
      vue.$http({
        method: 'get',
        url: window.config.serverLogin + '/api/v1/accounts/' + id,
        params: {},
        headers: {
          'languageCode': vue.$route.params.lang,
          'Authorization': 'Bearer ' + vue.$cookie.get('token')
        }
      }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
    return account
  }
  export default {
    data () {
      return {
        props: {
          value: 'label',
          children: 'cities'
        },
        ruleForm: {
          id: '', // id
          userName: '', // 用户名
          name: '', // 姓名
          eMail: '', // 电子邮箱
          mobile: '' // 手机
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { pattern: /\S+/, message: '不能全为空格' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { pattern: /\S+/, message: '不能全为空格' }
          ],
          eMail: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/, message: 'E-mail格式错误', trigger: 'blur' },
            { pattern: /\S+/, message: '不能全为空格' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /\S+/, message: '不能全为空格' }
          ]
        },
        loading: true
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 编辑用户
            const Account = EditAccount(this, this.$route.params.accountId)

            Account.then((resolve) => {
              if (this.$cookie.get('userType') === '0') {
                this.$confirm('账户信息编辑成功', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'success'
                }).then(() => {
                  this.$router.push('/' + this.$route.params.lang + '/systemManagement/account/accountList')
                })
              }
              if (this.$cookie.get('userType') === '1') {
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                })
              }
            }).catch((reject) => {
              window.publicFunction.error(reject)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        const userName = this.ruleForm.userName
        const id = this.ruleForm.id
        this.$refs[formName].resetFields()
        this.ruleForm.userName = userName
        this.ruleForm.id = id
      }
    },
    created: function () {
      // 数据回显
      const AccountInfo = GetAccountInfo(this, this.$route.params.accountId)

      AccountInfo.then((resolve) => {
        const ruleForm = {
          id: resolve.data.id,
          userName: resolve.data.account, // 用户名
          name: resolve.data.name, // 姓名
          eMail: resolve.data.email, // 电子邮箱
          mobile: resolve.data.mobile // 手机
        }
        this.ruleForm = ruleForm
        this.loading = false
      }).catch((reject) => {
        window.publicFunction.error(reject)
      })
    }
  }
</script>

<style scoped>
  .m-odr{
    overflow: auto;
    padding: 30px 30px 0 0;
  }
</style>
