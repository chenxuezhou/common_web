<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
    
      <el-form-item label="用户名" prop="uname">
            <el-input v-model="form.uname" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="pwd" prop="pwd">
            <el-input v-model="form.pwd" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="简介" prop="info">
            <el-input v-model="form.info" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="头像" prop="face">
            <el-input v-model="form.face" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="addtime" prop="addtime">
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
import { add, edit } from '@/api/users'

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
        uname: '',
        pwd: '',
        email: '',
        phone: '',
        info: '',
        face: '',
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
            {required: true,message:'',trigger: 'blur'}
        ]
      },
      options:[]
    }
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
        uname: '',
        pwd: '',
        email: '',
        phone: '',
        info: '',
        face: '',
        addtime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
