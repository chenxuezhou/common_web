<template>
    <div class="app-container">
        <eHeader :query="query" :options="options" />
     <el-select v-if="!checkPermission(['ADMIN'])" v-model="dish_id" clearable placeholder="类型" class="filter-item" style="width: 130px" @change="findCook" >
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="介绍" />
            <el-table-column prop="age" label="岁数" />
            <el-table-column prop="dishId" label="菜品id" />
            <el-table-column prop="count" label="月预约数" />
            <el-table-column prop="adress" label="住址" />
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="scope">
                    <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this" :options="options" />
                    <el-popover v-if="checkPermission(['ADMIN'])" :ref="scope.row.id" placement="top" width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popover>
                    <el-button @click="toAdd(scope.row)" v-else>预约</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'预约'" width="500px">
            <el-form ref="form" :model="form" size="small" label-width="80px">

                <el-form-item label="客户id" prop="name">
                    <el-input v-model="form.cus_id" style="width: 370px;" />

                </el-form-item>
                <el-form-item label="开始时间" prop="createTime">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.start_time" type="date" style="width: 370px;" placeholder="选择日期">
                    </el-date-picker>

                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.end_time" type="date" style="width: 370px;" placeholder="选择日期">
                    </el-date-picker>

                </el-form-item>
                <el-form-item label="厨师id" prop="description">
                    <el-input v-model="form.cook_id" style="width: 370px;" />
                </el-form-item>
                <el-form-item label="地址" >
                    <el-select v-if="!checkPermission(['ADMIN'])" v-model="form.address" clearable placeholder="地址" class="filter-item" style="width: 130px">
                    <el-option v-for="item in addressList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">

                <el-button type="primary" @click="doSubmit">确认</el-button>
            </div>
        </el-dialog>
        <!--分页组件-->
        <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
    </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { del } from "@/api/cook";
import { parseTime } from "@/utils/index";
import eHeader from "./module/header";
import edit from "./module/edit";
import { dish ,address,userOpt,cookOpt} from "@/sqlMap.js";
import { login, getInfo } from '@/api/login'
import Cookies from 'js-cookie'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      form: {},
      dialog: false,
      options:[],
      dish_id:'',
      addressList:[]
    };
  },
 
  created() {
    
    var sql = dish.getAll
        this.$http.post("action", {
            sql: sql
        }).then(res => {
            this.options=res.data
    });
    const username = Cookies.get('username')
    getInfo().then(res => {
        //   debugger
           sql= userOpt.getOne.replace('?',res.username)
      this.$http.post("action", {
            sql: sql
        }).then(res => {
          
           var user=res.data[0]
           sql= address.find.replace('?',user.id)
           this.$http.post("action", {
            sql: sql
        }).then(res => {
            this.addressList=res.data
        })
    });
        })
    
    
    this.$nextTick(() => {
      this.init();
    //   console.log(this.mixins)
    // this.data.data[0].count=1
    });
  },
  mounted(){
      console.log(this.data)
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = "api/cook";
      const sort = "id,desc";
      this.params = { page: this.page, size: this.size, sort: sort };
      const query = this.query;
      const type = query.type;
      const value = query.value;
      if (type && value) {
        this.params[type] = value;
      }
      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then(res => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    toAdd(row) {
      this.dialog = true;
      this.form.cook_id = row.id;
      this.form.status = 1;
    },
    doSubmit() {
      this.$http
        .post("insert", {
          table: "v_order",
          data: this.form
        })
        .then(res => {
           this.dialog=false
        });
    },
    findCook(event) {
        // debugger
      var sql=cookOpt.find.replace('?',event)
        this.$http.post("action", {
          sql:sql
        })
        .then(res => {
           this.data=res.data.map(item=>{
               item.createTime=item.create_time
               item.dishId=item.dish_id
               return item
           })
        });
    }
  }
};
</script>

<style scoped>
</style>
