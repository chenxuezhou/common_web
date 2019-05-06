<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        toiletnum: this.data.toiletnum,
        parlournum: this.data.parlournum,
        createTime: this.data.createTime,
        cover: this.data.cover,
        name: this.data.name,
        area: this.data.area,
        cusId: this.data.cusId,
        bedroomnum: this.data.bedroomnum,
        housetype: this.data.housetype,
        rentaltype: this.data.rentaltype,
        rentalperiodunit: this.data.rentalperiodunit,
        rentalperiod: this.data.rentalperiod,
        rentalprice: this.data.rentalprice
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
