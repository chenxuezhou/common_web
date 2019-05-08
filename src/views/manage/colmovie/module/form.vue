<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
    
      <el-form-item label="收藏地址" prop="movieUrl">
            <el-input v-model="form.movieUrl" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="用户id" prop="userId">
                <el-select v-model="form.userId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>

      </el-form-item>
      <el-form-item label="添加时间" prop="addtime">
            <el-date-picker
                    v-model="form.addtime"
                    type="date"
                    style="width: 370px;"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/colmovie'
import { user } from "@/sqlMap.js";

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
      loading: false, dialog: false,
      form: {
        id: '',
        movieUrl: '',
        userId: '',
        addtime: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'',trigger: 'blur'}
        ],


        addtime: [
            {required: true,message:'添加时间',trigger: 'blur'}
        ]
      },
      options:[]
    }
  },
    created() {
        var sql = user.getAll
        this.$http.post("action", {
            sql: sql
        }).then(res => {
            this.options=res.data
    });
    },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        movieUrl: '',
        userId: '',
        addtime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
