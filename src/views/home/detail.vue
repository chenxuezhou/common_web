
<template>
    <div>
        <h1 style="center">标题:{{form.title}}
            <i :class="soucan?'el-icon-star-on':'el-icon-star-off'" @click="tosoucan(form.topic)" style="font-size:25px"></i>
        </h1>
        <h2>主题:{{form.topic}}</h2>
        <div v-for="src in pic" :key="src">
            <img :src="src">
        </div>
        <div v-for="src in video" :key="src">
            <video :src="src" controls="controls">
            </video>
        </div>
        <h2>内容:=============</h2>
        <div>{{form.content}}</div>
    </div>
</template>

<script>
import { initData } from "@/api/data";
import { resource, pub_content, collect } from "@/sqlMap";
import Cookies from "js-cookie";
export default {
  name: "home",
  data() {
    return {
      form: {
        id: "",
        title: "",
        resId: "",
        topic: "",
        content: ""
      },
      pic: [],
      video: [],
      soucan: false
    };
  },
  created() {
    var id = this.$route.params.id;
    var sql = pub_content.getOne.replace("?", id);
    this.$http.post("/action", { sql: sql }).then(res => {
      //   debugger
      var data = res.data[0];
      this.form = data;

      var reslist = JSON.parse(data.res_id);
      // debugger
      reslist.forEach(element => {
        sql = resource.getOne.replace("?", element);

        this.$http.post("/action", { sql: sql }).then(res => {
          let data = res.data[0];
          if (data.fileName.endsWith(".jpg")) {
            this.pic.push("http://localhost:3000/" + data.fileName);
          } else if (data.fileName.endsWith(".mp4")) {
            this.video.push("http://localhost:3000/" + data.fileName);
          }
        });
      });
    });
    sql = collect.find.replace("?", Cookies.get("username")).replace("?", id);
    this.$http.post("/action", { sql: sql }).then(res => {
      //   debugger
      if (res.data.length != 0) {
        this.soucan = true;
      }
    });
  },
  methods: {
    tosoucan: function(topic) {
      var sql = "";
      var id = this.$route.params.id;

      if (!this.soucan) {
        //   debugger
        var username = Cookies.get("username");
        this.$http
          .post("/insert", {
            table: "collect",
            data: {
              topic: topic,
              user_id:username,
              pub_id: id
            }
          })
          .then(res => {
            this.soucan = !this.soucan;
          });
      } else {
        sql = collect.delete
          .replace("?", Cookies.get("username"))
          .replace("?", id);
        this.$http.post("/action", { sql: sql }).then(res => {
          this.soucan = !this.soucan;
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
