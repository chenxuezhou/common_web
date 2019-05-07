<template>
    <div>
        <el-button size="mini" type="success" @click="to">编辑</el-button>
        <eForm ref="form" :sup_this="sup_this" :is-add="false" :options="options" />
    </div>
</template>
<script>
import eForm from "./form";
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
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form;
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        createTime: this.data.createTime,
        description: this.data.description,
        age: this.data.age,
        dishId: this.data.dishId,
        adress: this.data.adress
      };
      _this.dialog = true;
    }
  }
};
</script>

<style scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
