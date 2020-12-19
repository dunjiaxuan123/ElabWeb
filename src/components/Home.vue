<template>
  <div>
    <h1>签到时长统计</h1>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      openid: "oE7am5L-Dtr_sikITUARaz7e1p1Y",
      info: "1",
    };
  },
  methods: {
    click () {
      console.log("这个按钮被点击了")
      axios
        .post("/getinformation.php", {
          openid: "oE7am5L-Dtr_sikITUARaz7e1p1Y",
        })
        .then((response) => (this.info = response))
        .catch(function (error) {
          console.log(error);
        });
      console.log(this.info);
    },
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
