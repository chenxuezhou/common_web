<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
    
      <el-form-item label="卫浴数目" prop="toiletnum">
            <el-input v-model="form.toiletnum" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="客厅数目" prop="parlournum">
            <el-input v-model="form.parlournum" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
                    v-model="form.createTime"
                    type="date"
                    style="width: 370px;"
                    placeholder="选择日期">
            </el-date-picker>

      </el-form-item>
      <el-form-item label="资源id" prop="cover">
            <el-input v-model="form.cover" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="城市" prop="area">
            <el-input v-model="form.area" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="用户id" prop="cusId">
                <el-select v-model="form.cusId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>

      </el-form-item>
      <el-form-item label="居室数目" prop="bedroomnum">
            <el-input v-model="form.bedroomnum" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="房屋类型" prop="housetype">
            <el-input v-model="form.housetype" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="出租类型" prop="rentaltype">
            <el-input v-model="form.rentaltype" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="起租单位" prop="rentalperiodunit">
            <el-input v-model="form.rentalperiodunit" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="起租时间" prop="rentalperiod">
            <el-input v-model="form.rentalperiod" style="width: 370px;"/>

      </el-form-item>
      <el-form-item label="价格" prop="rentalprice">
            <el-input v-model="form.rentalprice" style="width: 370px;"/>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/pubHouse'
import { cus } from "@/sqlMap.js";

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
        toiletnum: '',
        parlournum: '',
        createTime: '',
        cover: '',
        name: '',
        area: '',
        cusId: '',
        bedroomnum: '',
        housetype: '',
        rentaltype: '',
        rentalperiodunit: '',
        rentalperiod: '',
        rentalprice: ''
      },
      rules: {
          author: [
              { required: true, message: '作者不能为空', trigger: 'blur' }
          ],
        id: [
            {required: true,message:'ID',trigger: 'blur'}
        ],


        createTime: [
            {required: true,message:'创建时间',trigger: 'blur'}
        ],










      },
      options:[]
    }
  },
    created() {
        var sql = cus.getAll
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
        toiletnum: '',
        parlournum: '',
        createTime: '',
        cover: '',
        name: '',
        area: '',
        cusId: '',
        bedroomnum: '',
        housetype: '',
        rentaltype: '',
        rentalperiodunit: '',
        rentalperiod: '',
        rentalprice: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
