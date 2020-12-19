<template>
  <el-row type="flex" justify="center">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="user.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="login">登录 </el-button>
        <div>{{msg}}</div>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import qs from 'QS'
export default {
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post("/form" ,qs.stringify({
            username: this.user.name,
            password: this.user.pass
          }))
          this.$axios.post("/get","").then(res=>{
            this.msg = res.data.msg
          })
          if (this.user.name === "admin" && this.user.pass === "123456") {
            this.$notify({
              type: "success",
              message: "欢迎你",
              duration: 3000,
            });
            console.log(this.user);
            var data = this.user;
            this.$router.replace("/");
          } else {
            this.$notify({
              type: "error",
              message: "用户名或密码错误",
              showClose: true,
            });
          }
        } else {
          return false;
        }
      });
    },
  },
  data() {
    return {
      msg: "你们好",
      user: {
        name: "",
        pass: "",
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pass: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
