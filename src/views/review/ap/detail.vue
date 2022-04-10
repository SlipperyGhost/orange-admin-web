<template>
  <div class="app-container">
    <el-card>
      <div class="info">
        <el-form label-position="top">
          <el-form-item label="Icon">
            <div class="icon">
              <img src="" alt="">
            </div>
          </el-form-item>
          <el-form-item label="Title">
            <div>
              Ontology
            </div>
          </el-form-item>
          <el-form-item label="DID">
            <div>
              Ontology
            </div>
          </el-form-item>
          <el-form-item label="Description">
            <div>
              Ontology
            </div>
          </el-form-item>
          <el-form-item label="Status">
            <div>
              <el-tag type="success">通过</el-tag>
              <el-tag type="danger">拒绝</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="操作">
            <el-select v-model="action" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Reason">
            <el-input v-model="message" type="textarea" :rows="6" />
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="$router.go(-1)">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
      message: '',
      options: [
        {
          label: '通过',
          value: 'pass'
        },
        {
          label: '拒绝',
          value: 'reject'
        }
      ],
      action: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
  margin-top: 20px;
}
.icon {
  img {
    width: 100px;
    height: 100px;
  }
}
.info {
  .status {
    margin-bottom: 40px;
  }
  h4 {
    font-size: 14px;
    color: rgba(0,0,0,0.6);
    word-break: break-word;
  }
}
</style>
