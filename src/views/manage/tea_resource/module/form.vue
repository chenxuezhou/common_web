<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <el-form-item label="教案名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;" />

            </el-form-item>

            <el-form-item label="教案类型" prop="type">
                <el-input v-model="form.type" style="width: 370px;" />

            </el-form-item>
            <el-form-item label="文件">
                <el-upload action="http://localhost:3000/api/base/upload"  :on-remove="handleRemove" :on-success="handleSuccess" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">文件大小不能超过100M</div>
                </el-upload>
            </el-form-item>
            <!-- <el-form-item label="文件后缀" prop="fileType">
                <el-input v-model="form.fileType" style="width: 370px;" />

            </el-form-item> -->
            <el-form-item label="是否是特色教案" prop="isSpecial">
                <!-- <el-input v-model="form.isSpecial" style="width: 370px;" /> -->
                <el-radio v-model="form.isSpecial" label="1">是</el-radio>
                    <el-radio v-model="form.isSpecial" label="0">否</el-radio>
            </el-form-item>
            <!-- <el-form-item label="评分" prop="score">
            <el-input v-model="form.score" style="width: 370px;"/>

      </el-form-item> -->
            <el-form-item label="班级id" prop="claId">
                <el-input v-model="form.claId" style="width: 370px;" />

            </el-form-item>

            <el-form-item label="上传人编号" prop="createId">
                <el-select v-model="form.createId" placeholder="请选择" style="width: 370px;" @change="getOne">
                    <el-option v-for="item in options" :key="item.id" :label="item.id" :value="item.id">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="上传人姓名" prop="createName">
                <el-input :readonly=true v-model="form.createName" style="width: 370px;" />

            </el-form-item>
            <el-form-item label="简介" prop="info">
                <el-input type="textarea" v-model="form.info" style="width: 370px;" />

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/teaResource";
import { userOpt, resource } from "@/sqlMap.js";

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
      fileList: [],
      form: {
        id: "",
        name: "",
        createTime: "",
        type: "",
        fileType: "",
        isSpecial: "",
        score: 0,
        info: "",
        createId: "",
        createName: "",
        claId: ""
      },
      rules: {
        name: [{ required: true, message: "name", trigger: "blur" }],

        type: [{ required: true, message: "type", trigger: "blur" }]
      },
      options: []
    };
  },
  created() {
    var sql = userOpt.find;
    this.$http
      .post("action", {
        sql: sql
      })
      .then(res => {
        this.options = res.data;
      });
  },
  methods: {
    cancel() {
      this.resetForm();
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
        name: "",
        createTime: "",
        type: "",
        fileType: "",
        isSpecial: "",
        score: "",
        info: "",
        createId: "",
        createName: "",
        claId: ""
      };
    },
    getOne(event) {
      this.options.forEach(item => {
        if (item.id == event) {
          this.form.createName = item.username;
        }
      });
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleRemove(file, fileList) {
      
      var index = this.fileList.indexOf(file);
      if (index > -1) {
        this.fileList.splice(index, 1);
      }
    },
    handleSuccess(res, file) {
      var sql = resource.getOne.replace("?", res[0]);

      this.$http.post("action", { sql: sql }).then(res => {
        var data = res.data[0];
        debugger
        this.form.fileType="http://localhost:3000/" + data.fileName
        this.fileList.push({
          name: data.originalname,
          url: "http://localhost:3000/" + data.fileName
        });
      });
    }
  }
};
</script>

<style scoped>
</style>
