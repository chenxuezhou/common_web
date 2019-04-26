<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" style="width: 370px;" />

            </el-form-item>
            <el-form-item label="资源id" prop="resId">
                <el-upload action="http://localhost:3000/api/base/upload" multiple :limit="3" :on-success="handleAvatarSuccess" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>

                </el-upload>
                <!-- <el-input v-model="form.resId" style="width: 370px;"/> -->

            </el-form-item>
            <el-form-item label="主题" prop="topic">
                <el-select v-model="form.topic" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="form.topic" style="width: 370px;"/> -->

            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="form.content" style="width: 370px;" />

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/pubContent";
import { s1, s2, s3, s4 } from "@/constant";
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
        id: "",
        title: "",
        resId: "",
        topic: "",
        content: ""
      },
      rules: {
        author: [{ required: true, message: "作者不能为空", trigger: "blur" }],
        id: [{}],
        title: [{ required: true, message: "标题", trigger: "blur" }],
        resId: [{ required: true, message: "资源id", trigger: "blur" }],
        topic: [{ required: true, message: "主题", trigger: "blur" }],
        content: [{ required: true, message: "内容", trigger: "blur" }]
      },
      options: [
        {
          value: s1,
          label: s1
        },
        {
          value: s2,
          label: s2
        },
        {
          value: s3,
          label: s3
        },
        {
          value: s4,
          label: s4
        }
      ],
      fileList: [],
      fileIdList: []
    };
  },
  methods: {
    cancel() {
      this.resetForm();
      this.fileIdList = [];
      this.fileList = [];
    },
    doSubmit() {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd();
      } else this.doEdit();
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
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
        title: "",
        resId: "",
        topic: "",
        content: ""
      };
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.fileIdList = this.fileIdList.concat(res);
      this.form.resId = JSON.stringify(this.fileIdList);
      // this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style scoped>
</style>
