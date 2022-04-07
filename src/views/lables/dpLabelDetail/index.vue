<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <h2>{{ type }}</h2>
        <el-button type="primary" @click="handlerAdd">
          添加
        </el-button>
      </div>
      <el-card>
        <div class="card-list">
          <el-button type="success" round plain @click="handlerEdit('BlockChain')">主要按钮</el-button>
          <el-button type="success" round plain>主要按钮</el-button>
        </div>
      </el-card>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-input v-model="currentItem" autocomplete="off" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerAciton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAdd: false,
      currentItem: '',
      dialogFormVisible: false,
      type: ''
    }
  },
  computed: {
    dialogTitle() {
      return this.isAdd ? '添加' : '修改'
    }
  },
  mounted() {
    this.type = this.$route.params.label
  },
  methods: {
    handlerEdit(item) {
      this.isAdd = false
      this.currentItem = item
      this.dialogFormVisible = true
    },
    handlerAdd() {
      this.isAdd = true
      this.currentItem = ''
      this.dialogFormVisible = true
    },
    handlerAciton() {
      if (this.isAdd) {
        // 添加操作
      } else {
        // update
      }
      // update list
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.el-card {
  margin-bottom: 20px;
}
.dialog-footer {text-align: center}
</style>
