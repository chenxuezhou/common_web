<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="评分" prop="rate">
            <el-input v-model="form.rate" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评论内容" prop="comment">
            <el-input v-model="form.comment" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="用户id" prop="cusId">
            <el-input v-model="form.cusId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="订单id" prop="orderId">
            <el-input v-model="form.orderId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="私厨id" prop="cookId">
            <el-input v-model="form.cookId" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/commentlist'
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
        rate: '',
        comment: '',
        cusId: '',
        orderId: '',
        cookId: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'',trigger: 'blur'}
        ],
        rate: [
            {required: true,message:'评分',trigger: 'blur'}
        ],
        comment: [
            {}
        ],
        cusId: [
            {required: true,message:'用户id',trigger: 'blur'}
        ],
        orderId: [
            {required: true,message:'订单id',trigger: 'blur'}
        ],
        cookId: [
            {required: true,message:'私厨id',trigger: 'blur'}
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
        rate: '',
        comment: '',
        cusId: '',
        orderId: '',
        cookId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
