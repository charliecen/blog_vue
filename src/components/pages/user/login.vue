<template>
  <Card class="login" dis-hover>
    <p slot="title">后台管理系统</p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <Form-item prop="email">
        <Input type="text" v-model="formInline.email" placeholder="Email">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
      </Form-item>
    </Form>
  </Card>
</template>
<style>
  body {
    background-color: #324057;
    position: absolute;
    left: 50%;
    top: 250px;
    margin-left: -180px;
    width: 360px;
  }

  Form {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
<script>
  import axios from '@/api/index'
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
        this.$refs[formInline].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: 'auth/login',
              data: this.formInline
            }).then((response) => {
              let data = response.data
              if (data.code === 200) {
                this.$Message.success(data.msg)
                this.$router.push('/')
              } else {
                this.$Message.error(data.msg)
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      }
    }
  }
</script>
