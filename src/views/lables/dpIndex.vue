<template>
  <div class="app-container">
    <el-card>
      <div class="flex-css">
        <h3>Blockchain</h3>
        <el-button type="text" @click="$router.push({path: 'dp-label-detail/Blockchain'})">查看详情</el-button>
      </div>
    </el-card>
    <el-card>
      <div class="flex-css">
        <h3>Category</h3>
        <el-button type="text" @click="$router.push({path: 'dp-label-detail/Category'})">查看详情</el-button>
      </div>
    </el-card>
    <el-card>
      <div class="flex-css">
        <h3>Scenario</h3>
        <el-button type="text" @click="$router.push({path: 'dp-label-detail/Scenario'})">查看详情</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.flex-css {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  margin-bottom: 20px;
}
</style>
