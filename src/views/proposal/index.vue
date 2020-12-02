<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          <span>{{ (pageNumber - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Address">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Link">
        <template slot-scope="scope">
          <a
            v-if="scope.row.discussionLink"
            target="_blank"
            style="color: dodgerblue"
            :href="scope.row.discussionLink"
            >{{ scope.row.discussionLink | subStringFn }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="Level">
        <template slot-scope="scope">
          {{ scope.row.level }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{
            scope.row.state | stateWord
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="CreateTime"
        width="300"
      >
        <template slot-scope="scope">
          <i
            v-if="scope.row.createTime"
            class="el-icon-time"
            style="margin-right: 4px"
          />
          <span>{{ (scope.row.createTime * 1000) | getUTCTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)"
            >操作</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
import { getUTCTime } from '@/utils'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = ['gray', 'success', 'danger', 'info']
      return statusMap[status]
    },
    stateWord(status) {
      const statusMap = ['待审核', '通过', '拒绝', '取消']
      return statusMap[status]
    },
    subStringFn(str) {
      if (str.length < 20) {
        return str
      }
      return str.substring(0, 20) + '......'
    },
    getUTCTime(time) {
      return getUTCTime(time)
    }
  },
  data() {
    return {
      list: null,
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
      this.$router.push({ path: 'proposal-detail/' + data.id })
      return data
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getProposalList({ pageNumber: this.pageNumber, pageSize: this.pageSize })
        .then(response => {
          const { count, list } = response.result
          this.list = list
          this.total = count
          this.listLoading = false
          // eslint-disable-next-line handle-callback-err
        })
        .catch(error => {
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
</style>
