
<template>
    <div>
        <h1 style="center">{{form.title}}</h1>
        <h2>{{form.topic}}</h2>
        <div v-for="src in pic" :key="src">
            <img :src="src">
        </div>
        <div v-for="src in video" :key="src">
            <video :src="src" controls="controls">
            </video>
        </div>
        <div>{{form.content}}</div>
    </div>
</template>

<script>
import { initData } from "@/api/data";
import { resource,pub_content } from "@/sqlMap";
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
      video: []
    };
  },
  created() {
    var id = this.$route.params.id;
    var sql =pub_content.getOne.replace("?", id);
    this.$http.post("/action", { sql: sql })
      .then(res => {
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
      })
      .catch(err => {});
  }
};
</script>
<style scoped>
</style>
