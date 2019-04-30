<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="用户id" prop="cusId">
            <el-input v-model="form.cusId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="订单状态1:预约，2：已确认服务" prop="status">
            <el-input v-model="form.status" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
                    v-model="form.createTime"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="私厨id" prop="cookId">
            <el-input v-model="form.cookId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="预约开始时间" prop="startTime">
            <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="预约结束时间" prop="endTime">
            <el-date-picker
                    v-model="form.endTime"
                    type="date"
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
import { add, edit } from '@/api/vOrder'
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
        cusId: '',
        status: '',
        createTime: '',
        cookId: '',
        startTime: '',
        endTime: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'ID',trigger: 'blur'}
        ],
        cusId: [
            {}
        ],
        status: [
            {}
        ],
        createTime: [
            {required: true,message:'创建时间',trigger: 'blur'}
        ],
        cookId: [
            {}
        ],
        startTime: [
            {required: true,message:'预约开始时间',trigger: 'blur'}
        ],
        endTime: [
            {required: true,message:'预约结束时间',trigger: 'blur'}
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
        cusId: '',
        status: '',
        createTime: '',
        cookId: '',
        startTime: '',
        endTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
