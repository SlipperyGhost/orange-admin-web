<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <div class="flex-label">
          <img class="icon" :src="info.icon" alt="">
          <div>
            <h3>{{ info.title }}</h3>
            <div>{{ info.did }}</div>
            <div class="desc">{{ info.introduction }}</div>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="handlerOpen">更新信息</el-button>
        </div>
      </div>
      <el-card>
        <div class="model">
          <h3>Model</h3>
          <div class="card-list">
            <el-card v-for="(item, idx) in list" :key="idx">
              <img :src="item.icon" alt="">
              <h3>{{ item.methodName }}</h3>
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
          <el-input v-model="currentInfo.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="AP Name" :label-width="formLabelWidth">
          <el-input v-model="currentInfo.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="AP Description" :label-width="formLabelWidth">
          <el-input v-model="currentInfo.introduction" :rows="10" type="textarea" autocomplete="off" />
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
import { getAlgorithmProvider, getAllAlgorithmProviderMethod } from '@/api/providers'

export default {
  name: 'APDetailIndex',
  data() {
    return {
      list: [],
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
      formLabelWidth: '120px',
      did: '',
      info: {},
      currentInfo: {}
    }
  },
  mounted() {
    this.did = this.$route.params.id
    this.handlerGetInfo()
    this.handlerGetMethods()
  },
  methods: {
    handlerOpen() {
      this.currentInfo = this.info
      this.dialogFormVisible = true
    },
    handleClick(data) {
      console.log('data', data)
      this.$router.push({ path: `/ap-dp/model-detail/${this.did}/${data.method}` })
      return data
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.handlerGetMethods()
    },
    async handlerGetInfo() {
      const result = await getAlgorithmProvider(this.did)
      console.log('result', result)
      this.info = result.data.getAlgorithmProvider
    },
    async handlerGetMethods() {
      const result = await getAllAlgorithmProviderMethod({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        did: this.did
      })
      this.list = result.data.getAllAlgorithmProviderMethod.data
      this.total = result.data.getAllAlgorithmProviderMethod.total
      console.log('methods data', result)
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
  .flex-label {
    margin-right: 20px;
  }
}
.flex-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.icon {
  width: 100px;
  margin-right: 20px;
}
.model {
  .card-list {
    margin-top: 40px;
    h3 {
      text-align: center;
    }
    img {
      display: block;
      width: 60px;
      margin: 0 auto 12px;
    }
  }
}
.pagination-lay {
  text-align: right;
  margin-top: 20px;
}
.dialog-footer {
  text-align: center;
}
.desc {
  margin-top: 12px;
  font-size: 12px;
  color: rgba(0,0,0,0.6);
}
</style>
