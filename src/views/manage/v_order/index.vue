<template>
    <div class="app-container">
        <eHeader :query="query" />
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
            <el-table-column prop="cusId" label="用户id" />
            <el-table-column prop="status" label="订单状态1:预约，2：已确认服务" />
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cookId" label="私厨id" />
            <el-table-column prop="startTime" label="预约开始时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.startTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="endTime" label="预约结束时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.endTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="scope">
                    <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this" />
                    <el-popover v-if="checkPermission(['ADMIN'])" :ref="scope.row.id" placement="top" width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popover>
                    <el-button @click="toAdd(scope.row)" v-else-if="scope.row.status==1">确认服务完成</el-button>
                    <el-button @click="toComment(scope.row)" v-else>评价</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'预约'" width="500px">
            <el-form ref="form" :model="form" size="small" label-width="80px">

                 <!-- <el-form-item label="客户id" prop="name">
                    <el-input v-model="form.cus_id" style="width: 370px;" />

                </el-form-item> -->
                <el-form-item label="评分" prop="name">
                    <el-input v-model="form.rate" style="width: 370px;" />

                </el-form-item>
                
                <el-form-item label="内容" prop="description">
                    <el-input type="texterea" v-model="form.comment" style="width: 370px;" />

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
import { del } from "@/api/vOrder";
import { parseTime } from "@/utils/index";
import eHeader from "./module/header";
import edit from "./module/edit";
import { v_order } from "@/sqlMap.js";
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
       form: {},
      dialog: false
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = "api/vOrder";
      const sort = "id,desc";
      this.params = { page: this.page, size: this.size, sort: sort };
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
      var sql = v_order.update.replace("?", row.id);
      this.$http
        .post("action", {
          sql: sql
        })
        .then(res => {
          this.$nextTick(() => {
            this.init();
          });
        });
    },
     toComment(row) {
      this.dialog=true
      this.form.order_id=row.id
    //   debugger
      this.form.cook_id=row.cookId
       this.form.cus_id=row.cusId
    },
     doSubmit() {
      this.$http
        .post("insert", {
          table: "commentlist",
          data: this.form
        })
        .then(res => {
           this.dialog=false
        });
    }
  }
};
</script>

<style scoped>
</style>
