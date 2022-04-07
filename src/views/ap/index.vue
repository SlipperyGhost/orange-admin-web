<template>
  <div class="app-container">
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
</template>

<script>
import { getProposalList } from '@/api/proposal'
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
    // this.fetchData()
  },
  methods: {
    handleClick(data) {
      this.$router.push({ path: 'ap-detail/' + data })
      return data
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getProposalList({ pageNumber: this.pageNumber, pageSize: this.pageSize })
        .then((response) => {
          const { count, list } = response.result
          this.list = list
          this.total = count
          this.listLoading = false
          // eslint-disable-next-line handle-callback-err
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.listLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-lay {
  margin-top: 20px;
  text-align: right;
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
