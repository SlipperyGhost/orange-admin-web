<template>
  <div class="app-container">
    <div class="card-list">
      <el-card v-for="(item, idx) in list" :key="idx">
        <h3>{{ item.title }}</h3>
        <div class="button-group">
          <el-button type="text" @click="handleClick(item.id)">查看详情</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [{
        title: 'AP 入驻审核',
        id: 'AP'
      }, {
        title: 'DP 入驻审核',
        id: 'DP'
      }, {
        title: 'Model 审核',
        id: 'Model'
      }, {
        title: 'Dateset 审核',
        id: 'Dateset'
      }, {
        title: 'NFT Template 审核',
        id: 'NFT'
      }]
    }
  },
  methods: {
    handleClick(data) {
      if (data === 'AP') {
        this.$router.push({ path: 'review-ap-list' })
      } else if (data === 'DP') {
        this.$router.push({ path: 'review-dp-list' })
      } else if (data === 'Model') {
        this.$router.push({ path: 'review-model-list' })
      } else if (data === 'Dateset') {
        this.$router.push({ path: 'review-dataset-list' })
      } else if (data === 'NFT') {
        this.$router.push({ path: 'review-nft-list' })
      }
      return data
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
