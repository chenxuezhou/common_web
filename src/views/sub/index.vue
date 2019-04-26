<template>
    <div class="app-container">
        <eHeader :query="query" />
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
            <el-table-column prop="dinyue" label="订阅" />
            <el-table-column prop="topic" label="主题" />
            <el-table-column prop="userId" label="用户id" />
            <el-table-column prop="soucan" label="收藏" />
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="scope">
                    <!-- <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this"/> -->
                    <el-popover v-if="checkPermission(['ADMIN'])" :ref="scope.row.id" placement="top" width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
    </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { del } from "@/api/sub";
import eHeader from "./module/header";
import edit from "./module/edit";
import { getInfo } from "@/api/login";
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      user_id:''
    };
  },
  created() {
    this.$nextTick(() => {
      getInfo().then(res => {
        var name = res.username;
        this.params.user_id = name;
        this.user_id=name
        this.init();
      });
    });
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = "api/sub";
      const sort = "id,desc";

      this.params = { page: this.page, size: this.size, sort: sort,userId:this.user_id };
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
    }
  }
};
</script>

<style scoped>
</style>
