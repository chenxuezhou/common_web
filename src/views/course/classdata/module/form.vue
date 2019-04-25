<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="详情展示图片" prop="icon">
            <el-input v-model="form.icon" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="详情标题" prop="title">
            <el-input v-model="form.title" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="内容" prop="content">
            <el-input v-model="form.content" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="价格" prop="money">
            <el-input v-model="form.money" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="参数id" prop="intro">
            <el-input v-model="form.intro" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="老师id" prop="teacher">
            <el-input v-model="form.teacher" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评价id" prop="rate">
            <el-input v-model="form.rate" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="章节id" prop="chapterlist">
            <el-input v-model="form.chapterlist" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/classdata'
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
        content: '',
        money: '',
        intro: '',
        teacher: '',
        rate: '',
        chapterlist: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {}
        ],
        icon: [
            {required: true,message:'详情展示图片',trigger: 'blur'}
        ],
        title: [
            {required: true,message:'详情标题',trigger: 'blur'}
        ],
        content: [
            {required: true,message:'内容',trigger: 'blur'}
        ],
        money: [
            {required: true,message:'价格',trigger: 'blur'}
        ],
        intro: [
            {required: true,message:'参数id',trigger: 'blur'}
        ],
        teacher: [
            {required: true,message:'老师id',trigger: 'blur'}
        ],
        rate: [
            {required: true,message:'评价id',trigger: 'blur'}
        ],
        chapterlist: [
            {required: true,message:'章节id',trigger: 'blur'}
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
        content: '',
        money: '',
        intro: '',
        teacher: '',
        rate: '',
        chapterlist: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
