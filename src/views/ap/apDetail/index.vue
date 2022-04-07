<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <div>
          <h3>AP Name</h3>
          <div>did:ont:a12121</div>
        </div>
        <div>
          <el-button type="primary" @click="dialogFormVisible = true">更新信息</el-button>
        </div>
      </div>
      <el-card>
        <div class="model">
          <h3>Model</h3>
          <div class="card-list">
            <el-card v-for="(item, idx) in list" :key="idx">
              <h3>{{ item }}</h3>
              <div class="button-group">
                <el-button type="text" @click="handleClick(item)">查看详情</el-button>
              </div>
            </el-card>
          </div>
          <div class="pagination-lay">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              :current-page="pageNumber"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
    </el-card>

    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="top">
        <el-form-item label="Icon" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="AP Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="AP Description" :label-width="formLabelWidth">
          <el-input v-model="form.description" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'APDetailIndex',
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      listLoading: true,
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      form: {
        icon: '',
        name: '',
        description: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClick(data) {
      console.log('data', data)
      this.$router.push({ path: '/ap-dp/model-detail/' + data })
      return data
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      // this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  h3 {
    margin-bottom: 10px;
  }
}
.model {
  .card-list {
    margin-top: 40px;
  }
}
.pagination-lay {
  text-align: right;
  margin-top: 20px;
}
.dialog-footer {
  text-align: center;
}
</style>
