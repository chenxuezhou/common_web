<template>
  <div class="app-container">
    
    <eHeader :roles="roles" :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="username" label="用户名"/>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="el-avatar">
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.enabled ? '激活':'锁定' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="生成二维码">
        <template slot-scope="scope">
          <el-button slot="reference" @click="createQrc(scope.row)" size="mini">生成二维码</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
         
          <edit v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT'])" :data="scope.row" :roles="roles" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','USER_ALL','USER_DELETE'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
     
      <div class="banner-box">
      <canvas id="qrccode-canvas"></canvas>
    </div>
  
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/user'
import { getRoleTree } from '@/api/role'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import Cookies from 'js-cookie'
import edit from './module/edit'
var canvas = ''
var QRCode = require('qrcode')
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      roles: [], delLoading: false, sup_this: this,
      bedialog:false
    }
  },
  created() {
    this.getRoles()
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted () {
    this.$nextTick(function () {
      // DOM操作
      canvas = document.getElementById('qrccode-canvas')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/users'
      const sort = 'id,desc'
      const query = this.query
      const type = query.type
      const value = query.value
      const enabled = query.enabled
      this.params = { page: this.page, size: this.size, sort: sort }
      if (type && value) { this.params[type] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    getRoles() {
      getRoleTree().then(res => {
        this.roles = res
      })
    },
    createQrc: function (row) {
      if (!row) {
        window.alert('链接不能为空')
        return false
      }
      this.bedialog=true
      var obj={username:Cookies.get('username'),params:row}
      
      var url='http://localhost:3000/api/base/log?obj='+encodeURI(JSON.stringify(obj))
      console.log(url)
    //   url=JSON.stringify(url)
      QRCode.toCanvas(canvas,url, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log('success')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
