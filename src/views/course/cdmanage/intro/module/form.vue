<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="难度级别" prop="level">
            <el-input v-model="form.level" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="价格" prop="disccount">
            <el-input v-model="form.disccount" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评分" prop="rate">
            <el-input v-model="form.rate" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="人数" prop="people">
            <el-input v-model="form.people" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="详情id" prop="claId">
            <el-input v-model="form.claId" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/intro'
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
        level: '',
        disccount: '',
        rate: '',
        people: '',
        claId: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        level: [
            {required: true,message:'难度级别',trigger: 'blur'}
        ],
        disccount: [
            {required: true,message:'价格',trigger: 'blur'}
        ],
        rate: [
            {required: true,message:'评分',trigger: 'blur'}
        ],
        people: [
            {required: true,message:'人数',trigger: 'blur'}
        ],
        claId: [
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
        level: '',
        disccount: '',
        rate: '',
        people: '',
        claId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
