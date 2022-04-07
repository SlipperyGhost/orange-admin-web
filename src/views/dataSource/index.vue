<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <h2>Data Source</h2>
        <el-button type="primary" @click="handlerAdd">
          添加
        </el-button>
      </div>
      <el-card>
        <div class="card-list">
          <el-card v-for="item in list" :key="item">
            <div class="source-item">
              <div class="info">
                <img src="" alt="">
                <h3>Data Source Title</h3>
              </div>
              <el-button type="text" @click="handlerEdit('BlockChain')">主要按钮</el-button>
            </div>
          </el-card>
        </div>
      </el-card>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="Icon">
          <el-input v-model="icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Item Name">
          <el-input v-model="currentItem" autocomplete="off" />
        </el-form-item>
      </el-form>
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
      type: '',
      icon: '',
      list: [1, 2, 3, 4, 5, 6, 7, 8]
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
.source-item {
  text-align: center;
  .info {
    margin-bottom: 10px;
    img {
      display: block;
      width: 60px;
      height: 60px;
      background: #cccccc;
      margin: 0 auto 8px;
    }
  }
}
</style>
