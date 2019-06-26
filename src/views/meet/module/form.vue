<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" size="small" label-width="80px">
            <el-form-item label="创建人用户id">
                <el-input v-model="form.user_id" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="会议时间">
                <el-input v-model="form.create_time" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="会议主持人">
                <el-input v-model="form.host_per" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="会议出席人">
                <el-input v-model="form.out_per" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="会议地点">
                <el-input v-model="form.address" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="主题">
                <el-input v-model="form.topic" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="form.content" style="width: 370px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/meeting";
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
          user_id:''
      }
    };
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd();
      } else this.doAdd();
    },
    doAdd() {
        debugger
      this.$http.post("insert", { table: "meeting", data: this.form }).then(res => {
          this.loading = false;
          if (res.data.code) {
            this.$notify({
              title: res.data.msg,
              type: "error",
              duration: 2500
            });
            return;
          }
          this.resetForm();
          this.$notify({
            title:this.isAdd? "添加成功":"修改成功",
            type: "success",
            duration: 2500
          });
          this.$parent.$parent.init();
        })
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.sup_this.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        userId: "",
        createTime: "",
        hostPer: "",
        outPer: "",
        address: "",
        topic: "",
        content: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
