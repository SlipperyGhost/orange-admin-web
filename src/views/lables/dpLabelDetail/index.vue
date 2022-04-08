<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <h2>{{ type }}</h2>
        <el-button type="primary" @click="handlerAdd">
          添加
        </el-button>
      </div>
      <el-card v-loading="loading">
        <div class="card-list">
          <el-button v-for="item in list" :key="item" type="success" round plain @click="handlerEdit(item)">
            {{ item }}</el-button>
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
import { getDPLabelList } from '@/api/label'

export default {
  data() {
    return {
      isAdd: false,
      currentItem: '',
      dialogFormVisible: false,
      type: '',
      loading: false,
      list: []
    }
  },
  computed: {
    dialogTitle() {
      return this.isAdd ? '添加' : '修改'
    }

  },
  mounted() {
    this.type = this.$route.params.label
    this.handlerGetDPLabelList()
  },
  methods: {
    async handlerGetDPLabelList() {
      this.loading = true
      const result = await getDPLabelList()
      this.loading = false
      if (this.type === 'Blockchain') {
        this.list = result.data.queryDPLabels['blockChain']
      } else {
        this.list = result.data.queryDPLabels[this.type.toLowerCase()]
      }
    },
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
