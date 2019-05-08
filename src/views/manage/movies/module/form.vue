<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
    
      <el-form-item label="剧名" prop="title">
            <el-input v-model="form.title" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="播放地址" prop="url">
            <el-input v-model="form.url" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="简介" prop="info">
            <el-input v-model="form.info" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="展示logo" prop="logo">
            <el-input v-model="form.logo" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评分" prop="score">
            <el-input v-model="form.score" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="播放次数" prop="playnum">
            <el-input v-model="form.playnum" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="评论数" prop="commentnum">
            <el-input v-model="form.commentnum" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="releaseTime" prop="releaseTime">
            <el-date-picker
                    v-model="form.releaseTime"
                    type="date"
                    style="width: 370px;"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="添加时间" prop="addtime">
            <el-date-picker
                    v-model="form.addtime"
                    type="date"
                    style="width: 370px;"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="类型" prop="type">
            <el-input v-model="form.type" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="地区" prop="area">
            <el-input v-model="form.area" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="主题" prop="topic">
            <el-input v-model="form.topic" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/movies'

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
        url: '',
        info: '',
        logo: '',
        score: '',
        playnum: '',
        commentnum: '',
        releaseTime: '',
        addtime: '',
        type: '',
        area: '',
        topic: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'',trigger: 'blur'}
        ],







        releaseTime: [
            {required: true,message:'',trigger: 'blur'}
        ],
        addtime: [
            {required: true,message:'添加时间',trigger: 'blur'}
        ],



      },
      options:[]
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
        url: '',
        info: '',
        logo: '',
        score: '',
        playnum: '',
        commentnum: '',
        releaseTime: '',
        addtime: '',
        type: '',
        area: '',
        topic: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
