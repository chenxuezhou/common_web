<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
    
      <el-form-item label="名称" prop="username">
            <el-input v-model="form.username" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="班级id" prop="claId">
          <el-input v-model="form.claId" style="width: 370px;"/>
                <!-- <el-select v-model="form.claId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select> -->

      </el-form-item>
      <el-form-item label="班级名称" prop="claName">
            <el-input v-model="form.claName" style="width: 370px;"/>

      </el-form-item>
   
      
      <el-form-item label="老师id" prop="teaId">
          <el-input v-model="form.teaId" style="width: 370px;"/>
                <!-- <el-select v-model="form.teaId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select> -->

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/student'
import { tea } from "@/sqlMap.js";

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
        username: '',
        claId: '',
        claName: '',
        createTime: '',
        password: '',
        teaId: ''
      },
      rules: {
        id: [
            {required: true,message:'',trigger: 'blur'}
        ],
        username: [
            {required: true,message:'名称',trigger: 'blur'}
        ],


        createTime: [
            {required: true,message:'创建日期',trigger: 'blur'}
        ],


      },
      options:[]
    }
  },
    created() {
        var sql = tea.getAll
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
        username: '',
        claId: '',
        claName: '',
        createTime: '',
        password: '',
        teaId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
