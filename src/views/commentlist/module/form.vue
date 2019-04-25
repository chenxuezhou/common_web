<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="头像" prop="avatar">
            <el-input v-model="form.avatar" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评分" prop="rate">
            <el-input v-model="form.rate" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评论内容" prop="comment">
            <el-input v-model="form.comment" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评分id" prop="rateId">
            <el-input v-model="form.rateId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="用户id" prop="cusId">
            <el-input v-model="form.cusId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="订单id" prop="orderId">
            <el-input v-model="form.orderId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="详情id" prop="cdId">
            <el-input v-model="form.cdId" style="width: 370px;"/>

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
        avatar: '',
        name: '',
        rate: '',
        comment: '',
        rateId: '',
        cusId: '',
        orderId: '',
        cdId: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        avatar: [
            {required: true,message:'头像',trigger: 'blur'}
        ],
        name: [
            {required: true,message:'名称',trigger: 'blur'}
        ],
        rate: [
            {required: true,message:'评分',trigger: 'blur'}
        ],
        comment: [
            {required: true,message:'评论内容',trigger: 'blur'}
        ],
        rateId: [
            {required: true,message:'评分id',trigger: 'blur'}
        ],
        cusId: [
            {required: true,message:'用户id',trigger: 'blur'}
        ],
        orderId: [
            {required: true,message:'订单id',trigger: 'blur'}
        ],
        cdId: [
            {required: true,message:'详情id',trigger: 'blur'}
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
        avatar: '',
        name: '',
        rate: '',
        comment: '',
        rateId: '',
        cusId: '',
        orderId: '',
        cdId: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
