<template>
  <div>
    <div class="container" v-title data-title="签到时长">
      <div class="process_container"  v-for="item in arr" :key="item.id">
        <div class="avatar">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <p>{{ item.name }}</p>
        </div>
        <div class="process">
          <!--element的进度条组件，format对应进度条的种类，percentage就是进度条的百分比，其余参数查询官网文档即可 -->
          <el-progress
            :format="format"
            :text-inside="true"
            :stroke-width="35"
            :percentage="item.timestamp"
            :color="color"
          ></el-progress>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <!-- 底部的导航栏-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="15"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//这个i是一个全局变量，是用来给每一个进度条的内容赋值的计数量
//只能写在全局变量里，否则会出现渲染无限循环的问题
var i = -1
export default {
  data() {
    return {
      items: [],
      status: false,
      arr: [],
      count: 0,
      total: 1000,
      checkintime: 10,
      //狗头图片的地址
      circleUrl: "https://class.elab-dlut.cn/imgs/dog.jpg",
      currentPage1: 1,
      curPage: 1,
    };  
  },
  methods: {
    //返回签到时长
    format(percentage) {
      i = i + 1;
      return this.arr[i].timestamp === 0
        ? "暂无签到时间"
        : this.arr[i].weekTotalTime;

      //: totalTime()
    },
    //进度条的颜色
    color() {
      if (i + 1 === 0 && this.curPage === 1) {
        return "#FF0000";
      } else if (i + 1 === 1 && this.curPage === 1) {
        return "#FF7F24";
      } else if (i + 1 === 2 && this.curPage === 1) {
        return "#67C23A";
      }
    },
    //暂时没啥用
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //页面底部的翻页条，用来处理每页显示名单的不同
    //根据页数从items里截取15条放在了arr里
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.curPage = val;
      console.log(this.curPage);
      this.arr = this.items.slice(15 * (this.curPage - 1), 15 * this.curPage);
      //this.i = 15 * (this.curPage - 1) - 1;
      i = -1;
    },
  },
  //页面创建时的方法，每次页面刷新也会调用该方法
  created: function () {
    //请求后端接口，res是后端返回的数据
    this.$axios.post("/get", "").then((res) => {
      //这个是查询到的人员总数
      this.total = res.data.total;
      //后端送来的人员数据是按签到时长的降序排列的
      //获取最长的时间用来做基准
      let tmp = res.data.name[0].timestamp;
      for (let i = 0; i < this.total; i++) {
        //计算比例
        res.data.name[i].timestamp = (res.data.name[i].timestamp * 100) / tmp;
        //将计算完的数据放在items数组里
        this.items.push(res.data.name[i]);
      }
      //初始化第一个页面的arr用来渲染
      this.arr = this.items.slice(0, 15);
      //读取数据完成标志位
      this.status = true;
    });
  },
};
</script>

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

.process_container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1100px;
  border: 2px;
  padding: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
}

.process {
  width: 1100px;
  border: 5px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 10px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1500px;
  border: 1px solid green;
  padding: 20px;
  margin: 0 auto;
}

.avatar {
  width: 60px;
  margin-top: 0px;
}
/***vue的css穿透，从上到下分别是修改进度条内文本的颜色，修改进度条的底色
  **因为调用了element的组件的css，而这个css是无法直接修改的，所以使用了css穿透
  **第二个参数就是组件对应的css，在网页上使用F12就可以找到每个组件对应的css
  **更多的信息查询资料即可
***/
.process /deep/ .el-progress-bar__innerText {
  color: #464950;
}
.process /deep/ .el-progress-bar__outer {
  background-color: #fff;
}
</style>

