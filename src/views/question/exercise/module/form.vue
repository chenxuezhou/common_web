<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="习题题目" prop="description">
            <el-input v-model="form.description" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="答案a" prop="ansA">
            <el-input v-model="form.ansA" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="答案b" prop="ansB">
            <el-input v-model="form.ansB" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="答案c" prop="ansC">
            <el-input v-model="form.ansC" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="答案d" prop="ansD">
            <el-input v-model="form.ansD" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="正确答案" prop="ans">
            <el-input v-model="form.ans" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="所属章节" prop="chaId">
            <el-input v-model="form.chaId" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/exercise'
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
        description: '',
        ansA: '',
        ansB: '',
        ansC: '',
        ansD: '',
        ans: '',
        chaId: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        description: [
            {}
        ],
        ansA: [
            {}
        ],
        ansB: [
            {}
        ],
        ansC: [
            {}
        ],
        ansD: [
            {}
        ],
        ans: [
            {}
        ],
        chaId: [
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
        description: '',
        ansA: '',
        ansB: '',
        ansC: '',
        ansD: '',
        ans: '',
        chaId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
