<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Links</h2>
    <ul>
      <router-link id="home" to="/Home">Home</router-link>
      <router-link id="FirstPage" to="/FirstPage">First Page</router-link>
      <router-link id="SecondPage" to="/SecondPage">SecondPage</router-link>
      <router-link id="login" to="/login">login</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎来到签到网站'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
