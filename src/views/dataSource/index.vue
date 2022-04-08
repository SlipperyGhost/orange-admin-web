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
          <el-card v-for="(item, idx) in list" :key="idx">
            <div class="source-item">
              <div class="info">
                <img :src="item.Icon" alt="">
                <h3>{{ item.Name }}</h3>
              </div>
              <el-button type="text" @click="handlerEdit(item)">编辑</el-button>
            </div>
          </el-card>
        </div>
      </el-card>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="Icon">
          <el-input v-model="selectItem.Icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Item Name">
          <el-input v-model="selectItem.Name" autocomplete="off" />
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

import { queryDPDataSource } from '@/api/dataSource'

export default {
  data() {
    return {
      isAdd: false,
      currentItem: '',
      dialogFormVisible: false,
      type: '',
      list: [],
      selectItem: {
        Icon: '',
        Name: ''
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.isAdd ? '添加' : '修改'
    }
  },
  mounted() {
    this.type = this.$route.params.label
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await queryDPDataSource()
      this.list = data.queryDPDataSource.dataSource
    },
    handlerEdit(item) {
      this.isAdd = false
      this.selectItem = item
      this.dialogFormVisible = true
    },
    handlerAdd() {
      this.isAdd = true
      this.selectItem = {
        Icon: '',
        Name: ''
      }
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
      margin: 0 auto 8px;
    }
  }
}
</style>
