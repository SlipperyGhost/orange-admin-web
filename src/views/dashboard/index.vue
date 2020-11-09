<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <img src="../../assets/dashboard.svg" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    min-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-text {
    width: 100%;
    height: 100%;
    font-size: 30px;
    line-height: 46px;
    text-align: center;
  }
}
</style>
