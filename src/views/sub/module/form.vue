<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="订阅" prop="dinyue">
            <el-input v-model="form.dinyue" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="主题" prop="topic">
            <el-input v-model="form.topic" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="用户id" prop="userId">
            <el-input v-model="form.userId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="收藏" prop="soucan">
            <el-input v-model="form.soucan" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/sub'
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
        dinyue: '',
        topic: '',
        userId: '',
        soucan: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        dinyue: [
            {required: true,message:'订阅',trigger: 'blur'}
        ],
        topic: [
            {required: true,message:'主题',trigger: 'blur'}
        ],
        userId: [
            {required: true,message:'用户id',trigger: 'blur'}
        ],
        soucan: [
            {required: true,message:'收藏',trigger: 'blur'}
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
        dinyue: '',
        topic: '',
        userId: '',
        soucan: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
