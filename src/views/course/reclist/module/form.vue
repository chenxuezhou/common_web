<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="课程名" prop="title">
            <el-input v-model="form.title" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="难度" prop="level">
            <el-input v-model="form.level" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="图片展示" prop="icon">
            <el-input v-model="form.icon" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="价格" prop="money">
            <el-input v-model="form.money" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="报名人数" prop="people">
            <el-input v-model="form.people" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="是否停止" prop="istop">
            <el-input v-model="form.istop" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="关联的详情id" prop="claId">
            <el-input v-model="form.claId" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="参数id" prop="intro">
            <el-input v-model="form.intro" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/reclist'
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
        title: '',
        level: '',
        icon: '',
        money: '',
        people: '',
        istop: '',
        claId: '',
        intro: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        title: [
            {required: true,message:'课程名',trigger: 'blur'}
        ],
        level: [
            {required: true,message:'难度',trigger: 'blur'}
        ],
        icon: [
            {required: true,message:'图片展示',trigger: 'blur'}
        ],
        money: [
            {required: true,message:'价格',trigger: 'blur'}
        ],
        people: [
            {required: true,message:'报名人数',trigger: 'blur'}
        ],
        istop: [
            {required: true,message:'是否停止',trigger: 'blur'}
        ],
        claId: [
            {}
        ],
        intro: [
            {required: true,message:'参数id',trigger: 'blur'}
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
        title: '',
        level: '',
        icon: '',
        money: '',
        people: '',
        istop: '',
        claId: '',
        intro: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
