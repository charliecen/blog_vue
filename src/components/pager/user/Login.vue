<template>
  <div class="wrapper" >
    <h1>
      后台管理系统
    </h1>
    <div class="login">
      <i-form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="email">
          <Input v-model="formInline.email">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input v-model="formInline.password" type="password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <i-button type="success" @click.native="handleSubmit('formInline')" long>登录</i-button>
        </Form-item>
      </i-form>
    </div>
  </div>
</template>
<style>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;
    /*background: -webkit-gradient(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));*/
    /*background: #fff;*/
    /*url(http://78rbeb.com1.z0.glb.clouddn.com/wp-content/uploads/2014/03/free-blurred-web-backgrounds-04.jpg);*/
  }
  .wrapper > h1{
    text-align: center;
    vertical-align: middle;
    margin-bottom: 20px;
    color: #000;
  }
  .login {
    margin: 0 auto;
    padding: 200px auto;
    width: 200px;
    height: 100%;
  }
</style>
<script>
  export default {
    data () {
      return {
        formInline: {
          email: '',
          password: ''
        },
        ruleInline: {
          email: [
            { required: true, message: '请填写邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (formInline) {
        var _this = this
        var _duration = 2 * 1000
        _this.$refs[formInline].validate((valid) => {
          if (valid) {
            _this.$http.post('/auth/login', _this.formInline).then(function (response) {
              let data = response.data
              if (data.status === 200) {
                sessionStorage.setItem('name', JSON.stringify(data.data.name))
                _this.$Message.success(data.info)
                setTimeout(function () {
                  _this.$router.push({path: '/dashboard'})
                }, _duration)
              } else {
                _this.$Message.error(data.info)
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            _this.$Message.error('请填写邮箱和密码!')
          }
        })
      },
      resetForm (formInline) {
        this.$refs[formInline].resetFields()
      }
    }
  }
</script>

