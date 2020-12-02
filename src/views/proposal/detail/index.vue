<template>
  <div class="app-container">
    <el-card class="el-card-css">
      <ul>
        <li>
          <div class="label-title">地址</div>
          <div class="label-info">{{ proposal.address }}</div>
        </li>
        <li v-if="proposal.wing">
          <div class="label-title">持有 WING 数量</div>
          <div class="label-info">{{ proposal.wing }}</div>
        </li>
        <li>
          <div class="label-title">提案名称</div>
          <div class="label-info">{{ proposal.title }}</div>
        </li>
        <li>
          <div class="label-title">提案详情</div>
          <div class="label-info">{{ proposal.detail }}</div>
        </li>
        <li>
          <div class="label-title">提案状态</div>
          <div class="label-info">
            <el-tag v-if="proposal.state === 0" type="info">审核中</el-tag>
            <el-tag v-if="proposal.state === 1" type="success">通过</el-tag>
            <el-tag v-if="proposal.state === 2" type="danger">拒绝</el-tag>
            <el-tag v-if="proposal.state === 3" type="gray">取消</el-tag>
          </div>
        </li>
        <li>
          <div class="label-title">提交时间</div>
          <div class="label-info">{{ getUTCTime(proposal.createTime) }}</div>
        </li>
        <li>
          <div class="label-title">讨论地址</div>
          <div class="label-info">
            <a style="color: #20a0ff; text-decoration: underline" target="_blank" :href="proposal.discussionLink">{{ proposal.discussionLink }}</a>
          </div>
        </li>
        <li>
          <div class="label-title">备注</div>
          <div class="label-info">{{ proposal.remark }}</div>
        </li>
      </ul>
    </el-card>
    <div v-if="proposal.state !== 2 && proposal.state !== 3">
      <el-card v-if="!proposal.level" class="el-card-css">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top" class="demo-ruleForm">
          <el-form-item label="等级" prop="level">
            <el-select v-model="ruleForm.level" placeholder="请设置等级">
              <el-option label="等级一" :value="1" />
              <el-option label="等级二" :value="2" />
              <el-option label="等级三" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">通过</el-button>
            <el-button type="danger" @click="handlerAudit(2)">拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-card class="el-card-css"><ul>
      <li>
        <div class="label-title">修改备注</div>
        <div class="label-info">
          <textarea id="" v-model="remark" name="" cols="30" rows="10" />
        </div>
        <el-button type="primary" @click="saveRemake">提交</el-button>
      </li>
    </ul></el-card>

  </div>
</template>

<script>
import { getProposalDetail, handlerAudit, handlerRemark } from '@/api/proposal'
import { getUTCTime } from '@/utils'
export default {
  data() {
    return {
      remark: '',
      proposal: {
        remark: ''
      },
      listLoading: true,
      ruleForm: {
        level: null
      },
      rules: {
        level: [
          { required: true, message: '请设置等级', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getData(this.$route.params.proposalId)
  },
  methods: {
    getUTCTime(time) {
      return getUTCTime(time)
    },
    async getData(id) {
      const result = await getProposalDetail(id)
      console.log(result)
      this.proposal = result.result
      if (this.proposal.level) {
        this.ruleForm.level = this.proposal.level
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handlerAudit(1)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async handlerAudit(audit) {
      const result = await handlerAudit({ id: this.$route.params.proposalId, audit, level: this.ruleForm.level })
      if (result.desc !== 'SUCCESS') {
        this.$notify({
          title: `Notification`,
          message: `操作失败，请重试!`,
          type: 'error'
        })
        return false
      }
      this.$notify({
        title: `Notification`,
        message: `操作成功!`,
        type: 'success'
      })
      this.getData(this.$route.params.proposalId)
    },
    async saveRemake() {
      const result = await handlerRemark({
        id: this.$route.params.proposalId,
        remark: this.remark
      })
      if (result.desc !== 'SUCCESS') {
        this.$notify({
          title: `Notification`,
          message: `操作失败，请重试!`,
          type: 'error'
        })
        return false
      }
      this.$notify({
        title: `Notification`,
        message: `操作成功!`,
        type: 'success'
      })
      this.remark = ''
      this.getData(this.$route.params.proposalId)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  max-width: 800px;
  li {
    margin-bottom: 20px;
    .label-title {
      margin-bottom: 6px;
    }
  }
}
.el-card-css {
  margin-bottom: 40px;
}
textarea {
  width: 100%;
  height: 200px;
  resize: none;
  font-size: 12px;
  line-height: 16px;
  padding: 10px;
}
.label-title {
  font-size: 16px;
  line-height: 24px;
}
.label-info {
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
}
</style>
