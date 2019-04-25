<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="昵称" prop="name">
            <el-input v-model="form.name" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="手机号" prop="tel">
            <el-input v-model="form.tel" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="是否已购买" prop="ifbuy">
            <el-input v-model="form.ifbuy" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="购买课程" prop="courses">
            <el-input v-model="form.courses" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="性别" prop="sex">
            <el-input v-model="form.sex" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="头像" prop="photo">
            <el-input v-model="form.photo" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="班级" prop="classes">
            <el-input v-model="form.classes" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/customers'
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
        name: '',
        tel: '',
        ifbuy: '',
        courses: '',
        sex: '',
        remark: '',
        password: '',
        photo: '',
        classes: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        name: [
            {}
        ],
        tel: [
            {required: true,message:'手机号',trigger: 'blur'}
        ],
        ifbuy: [
            {required: true,message:'是否已购买',trigger: 'blur'}
        ],
        courses: [
            {required: true,message:'购买课程',trigger: 'blur'}
        ],
        sex: [
            {required: true,message:'性别',trigger: 'blur'}
        ],
        remark: [
            {required: true,message:'备注',trigger: 'blur'}
        ],
        password: [
            {required: true,message:'密码',trigger: 'blur'}
        ],
        photo: [
            {required: true,message:'头像',trigger: 'blur'}
        ],
        classes: [
            {required: true,message:'班级',trigger: 'blur'}
        ]
      }
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
        name: '',
        tel: '',
        ifbuy: '',
        courses: '',
        sex: '',
        remark: '',
        password: '',
        photo: '',
        classes: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
