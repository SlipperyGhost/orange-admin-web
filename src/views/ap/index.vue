<template>
  <div class="app-container">
    <div class="card-list">
      <el-card v-for="(item, idx) in list" :key="idx">
        <img :src="item.icon" alt="">
        <h3>{{ item.title }}</h3>
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
</template>

<script>
// import { getProposalList } from '@/api/proposal'
import { getAllAProviders } from '@/api/providers'
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      listLoading: true,
      pageNumber: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(data) {
      this.$router.push({ path: 'ap-detail/' + data.did })
      return data
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const result = await getAllAProviders({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      })
      this.listLoading = false
      this.list = result.data.getAllAlgorithmProviders.data
      this.total = result.data.getAllAlgorithmProviders.total
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-lay {
  margin-top: 20px;
  text-align: right;
}
h3 {
  text-align: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
img {
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}
.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
}
.button-group {
    text-align: center;
    margin-top: 20px;
}
</style>
