<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
    
      <el-form-item label="试卷名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="试卷类型" prop="type">
            <el-input v-model="form.type" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="作答时间" prop="time">
            <el-input v-model="form.time" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="合格分" prop="okScore">
            <el-input v-model="form.okScore" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="出卷人编号" prop="createId">
                <el-select v-model="form.createId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>

      </el-form-item>
      <el-form-item label="出卷人名称" prop="createName">
            <el-input v-model="form.createName" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="考试开始时间" prop="startTime">
            <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    style="width: 370px;"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="考试结束时间" prop="endTime">
            <el-date-picker
                    v-model="form.endTime"
                    type="date"
                    style="width: 370px;"
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
import { add, edit } from '@/api/exam'
import { create } from "@/sqlMap.js";

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
        name: '',
        type: '',
        time: '',
        okScore: '',
        createId: '',
        createName: '',
        startTime: '',
        endTime: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'编号',trigger: 'blur'}
        ],


        time: [
            {required: true,message:'作答时间',trigger: 'blur'}
        ],
        okScore: [
            {required: true,message:'合格分',trigger: 'blur'}
        ],
        createId: [
            {required: true,message:'出卷人编号',trigger: 'blur'}
        ],
        createName: [
            {required: true,message:'出卷人名称',trigger: 'blur'}
        ],


      },
      options:[]
    }
  },
    created() {
        var sql = create.getAll
        this.$http.post("action", {
            sql: sql
        }).then(res => {
            this.options=res.data
    });
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
        name: '',
        type: '',
        time: '',
        okScore: '',
        createId: '',
        createName: '',
        startTime: '',
        endTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
