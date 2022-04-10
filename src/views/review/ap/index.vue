<template>
  <div class="app-container">
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
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
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100,
      pageSize: 10,
      pageNumber: 1,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        id: 4
      }]
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNumber = val
    },
    handleClick(ele) {
      console.log(ele)
      this.$router.push({
        name: 'ReviewAPDetail',
        params: {
          id: ele.id
        }
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
