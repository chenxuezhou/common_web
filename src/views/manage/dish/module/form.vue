<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="类别" prop="type">
            <el-input v-model="form.type" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
                    v-model="form.createTime"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="介绍" prop="description">
            <el-input v-model="form.description" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="辣度" prop="level">
            <el-input v-model="form.level" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="菜品名" prop="name">
            <el-input v-model="form.name" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/dish'
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
        type: '',
        createTime: '',
        description: '',
        level: '',
        name: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'ID',trigger: 'blur'}
        ],
        type: [
            {}
        ],
        createTime: [
            {required: true,message:'创建时间',trigger: 'blur'}
        ],
        description: [
            {}
        ],
        level: [
            {}
        ],
        name: [
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
        type: '',
        createTime: '',
        description: '',
        level: '',
        name: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
