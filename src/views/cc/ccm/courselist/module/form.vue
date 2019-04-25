<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="图片地址" prop="icon">
            <el-input v-model="form.icon" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="难度" prop="level">
            <el-input v-model="form.level" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="类型" prop="type">
            <el-input v-model="form.type" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="人数" prop="people">
            <el-input v-model="form.people" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="课程纲目id" prop="ccId">
            <el-input v-model="form.ccId" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/courselist'
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
        icon: '',
        title: '',
        level: '',
        type: '',
        people: '',
        ccId: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        icon: [
            {required: true,message:'图片地址',trigger: 'blur'}
        ],
        title: [
            {required: true,message:'标题',trigger: 'blur'}
        ],
        level: [
            {required: true,message:'难度',trigger: 'blur'}
        ],
        type: [
            {required: true,message:'类型',trigger: 'blur'}
        ],
        people: [
            {required: true,message:'人数',trigger: 'blur'}
        ],
        ccId: [
            {}
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
        icon: '',
        title: '',
        level: '',
        type: '',
        people: '',
        ccId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
