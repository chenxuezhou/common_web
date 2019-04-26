
<template>
    <div class="home-main">
        <el-row>
            <el-col span="24">
                <el-carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arel-row="setting.arelRow">
                    <!-- <el-carousel-item v-for="pic in picList" :key="pic.id">
              <img class="carousel" v-bind:src="pic.url"/>
            </el-carousel-item> -->
                    <el-carousel-item>
                        <div class="carousel cal2"></div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <div class="carousel cal3"></div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <div class="carousel cal4"></div>
                    </el-carousel-item>
                </el-carousel>
            </el-col>

        </el-row>
        <el-row class="margin-top-10">
            <el-col span="12">
                <el-card>
                    <h4>
                        <!-- <svg-icon :icon-class="item"  /> -->
                        <!-- <Icon type="android-archive"></Icon> -->
                        <i class="el-icon-plus">{{s1}}</i>
                        <div style="float:right">
                            <el-button type="small" @click="todinyue(s1)">{{diyue?'取消订阅':'订阅'}}</el-button>
                            <i :class="soucan?'el-icon-star-on':'el-icon-star-off'" @click="tosoucan(s1)" style="font-size:25px"></i>
                        </div>
                    </h4>
                    <div class="to-do-list-con">
                        <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                            <li class="Li" :title="item.title" @click="toDetail(item.id)">{{item.title}}</li>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col span="12">
                <el-card class="margin-left-10">
                    <h4>
                        <!-- <svg-icon :icon-class="android-archive" /> -->
                        <i class="el-icon-edit">主题二</i>
                        <div style="float:right">
                            <el-button type="small" @click="todinyue(s2)">{{diyue1?'取消订阅':'订阅'}}</el-button>
                            <i :class="soucan1?'el-icon-star-on':'el-icon-star-off'" @click="tosoucan(s2)" style="font-size:25px"></i>
                        </div>
                    </h4>
                    <div class="to-do-list-con">
                        <div v-for="(item, index) in toDoList1"  :key="'todo-item' + (toDoList1.length - index)" class="to-do-item">
                            <li class="Li" :title="item.title" @click="toDetail(item.id)">{{item.title}}</li>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col span="12">
                <el-card>
                    <h4>
                        <i class="el-icon-edit">主题三</i>
                        <div style="float:right">
                            <el-button type="small" @click="todinyue(s3)">{{diyue2?'取消订阅':'订阅'}}</el-button>
                            <i :class="soucan2?'el-icon-star-on':'el-icon-star-off'" @click="tosoucan(s3)" style="font-size:25px"></i>
                        </div>
                    </h4>
                    <div class="to-do-list-con">
                        <div v-for="(item, index) in toDoList2" :key="'todo-item' + (toDoList2.length - index)" class="to-do-item">
                            <li class="Li" :title="item.title" @click="toDetail(item.id)">{{item.title}}</li>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col span="12">
                <el-card class="margin-left-10">
                    <h4>
                        <i class="el-icon-edit">主题四</i>
                        <div style="float:right">
                            <el-button type="small" @click="todinyue(s4)">{{diyue3?'取消订阅':'订阅'}}</el-button>
                            <i :class="soucan3?'el-icon-star-on':'el-icon-star-off'" @click="tosoucan(s4)" style="font-size:25px"></i>
                        </div>
                    </h4>
                    <div class="to-do-list-con">
                        <div v-for="(item, index) in toDoList3" :key="'todo-item' + (toDoList3.length - index)" class="to-do-item">
                            <li class="Li" :title="item.title" @click="toDetail(item.id)">{{item.title}}</li>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { initData } from "@/api/data";
import { getInfo } from "@/api/login";
import { s1, s2, s3, s4 } from "@/constant";
import { resource, subOpt } from "@/sqlMap";
export default {
  name: "home",
  data() {
    return {
      value3: 3,
      setting: {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: "inside",
        trigger: "click",
        arelRow: "hover"
      },
      s1: s1,
      s2: s2,
      s3: s3,
      s4: s4,
      toDoList: [],
      toDoList1: [],
      toDoList2: [],
      toDoList3: [],
      diyue: false,
      diyue1: false,
      diyue2: false,
      diyue3: false,

      soucan: false,
      soucan1: false,
      soucan2: false,
      soucan3: false,
      user_id: ""
    };
  },
  created() {
    initData("api/pubContent", {}).then(res => {
      var data = res.content;
      data.forEach(element => {
        console.log(s1);
        if (element.topic === s1) {
          this.toDoList.push(element);
        } else if (element.topic === s2) {
          this.toDoList1.push(element);
        } else if (element.topic === s3) {
          this.toDoList2.push(element);
        } else if (element.topic === s4) {
          this.toDoList3.push(element);
        }
      });
    });

    getInfo().then(res => {
      var name = res.username;

      this.user_id = name;
      var sql = subOpt.find.replace("?", name);
      this.$http.post("/action", { sql: sql }).then(res => {
        res.data.forEach(element => {
          //   debugger
          if (element.topic === s1) {
            this.diyue = element.dinyue == 1 ? true : false;
            this.soucan = element.soucan == 1 ? true : false;
          } else if (element.topic === s2) {
            this.toDoList1.push(element);
            this.diyue1 = element.dinyue == 1 ? true : false;
            this.soucan1 = element.soucan == 1 ? true : false;
          } else if (element.topic === s3) {
            this.toDoList2.push(element);
            this.diyue2 = element.dinyue == 1 ? true : false;
            this.soucan2 = element.soucan == 1 ? true : false;
          } else if (element.topic === s4) {
            this.toDoList3.push(element);
            this.diyue3 = element.dinyue == 1 ? true : false;
            this.soucan3 = element.soucan == 1 ? true : false;
          }
        });
      });
    });
  },
  methods: {
    toDetail: function(id) {
      let routeData = this.$router.resolve({ path: "/pub_detail/" + id });
      window.open(routeData.href, "_blank");
      //   this.$router.push('pub_detail/'+id)
    },
    todinyue: function(topic) {
      var sql = "";
      if (topic === s1) {
        sql = subOpt.update_dinyue
          .replace("?", this.diyue ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.diyue = !this.diyue;
      } else if (topic === s2) {
        sql = subOpt.update_dinyue
          .replace("?", this.diyue1 ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.diyue1 = !this.diyue1;
      } else if (topic === s3) {
        sql = subOpt.update_dinyue
          .replace("?", this.diyue2 ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.diyue2 = !this.diyue2;
      } else if (topic === s4) {
        sql = subOpt.update_dinyue
          .replace("?", this.diyue3 ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.diyue3 = !this.diyue3;
      }
      this.$http.post("/action", { sql: sql }).then(res => {
        if (res.data.affectedRows == 0) {
          this.$http
            .post("/insert", {
              table: "sub",
              data: {
                dinyue: 1,
                topic: topic,
                user_id: this.user_id,
                soucan: 0
              }
            })
            .then(res => {});
        }
      });
    },
     tosoucan: function(topic) {
      var sql = "";
      if (topic === s1) {
        sql = subOpt.update_soucan
          .replace("?", this.soucan ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.soucan = !this.soucan;
      } else if (topic === s2) {
        sql = subOpt.update_soucan
          .replace("?", this.soucan1 ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.soucan1 = !this.soucan1;
      } else if (topic === s3) {
        sql = subOpt.update_soucan
          .replace("?", this.soucan2 ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.soucan2 = !this.soucan2;
      } else if (topic === s4) {
        sql = subOpt.update_soucan
          .replace("?", this.soucan3 ? 0 : 1)
          .replace("?", this.user_id)
          .replace("?", topic);
        this.soucan3 = !this.soucan3;
      }
      this.$http.post("/action", { sql: sql }).then(res => {
        if (res.data.affectedRows == 0) {
          this.$http
            .post("/insert", {
              table: "sub",
              data: {
                dinyue: 0,
                topic: topic,
                user_id: this.user_id,
                soucan: 1
              }
            })
            .then(res => {});
        }
      });
    },

  }
};
</script>
<style scoped>
.carousel {
  width: 100%;
  height: 420px;
  background-size: cover;
  background-position: center;
}
.cal1 {
  background-image: url("../../images/b4.jpg");
}
.cal2 {
  background-image: url("../../images/b5.jpg");
}
.cal3 {
  background-image: url("../../images/b6.jpg");
}
.cal4 {
  background-image: url("../../images/b3.jpg");
}
.Li {
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-infor {
  height: 135px;
}
.avator-img {
  display: block;
  width: 80%;
  max-width: 100px;
  height: auto;
}
.card-user-infor-name {
  font-size: 2em;
  color: #2d8cf0;
}
.card-title {
  color: #abafbd;
}
.made-child-con-middle {
  height: 100%;
}
.to-do-list-con {
  height: 250px;
  overflow: auto;
}
.to-do-item {
  padding: 2px;
}
.infor-card-con {
  height: 100px;
}
.infor-card-icon-con {
  height: 100%;
  color: white;
  border-radius: 3px 0 0 3px;
}
.map-con {
  height: 305px;
}
.map-incon {
  height: 100%;
}
.data-source-row {
  height: 200px;
}
.line-chart-con {
  height: 150px;
}
</style>
