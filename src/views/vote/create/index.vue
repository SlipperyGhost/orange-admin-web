<template>
  <div class="app-container">
    <el-card>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-position="top"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="主标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="副标题" prop="wip">
          <el-input v-model="ruleForm.wip" />
        </el-form-item>
        <el-form-item label="Proposal 提供者地址（选填）">
          <el-input v-model="ruleForm.proposalBy" />
        </el-form-item>
        <el-form-item label="discussionLink（选填）" prop="discussionLink">
          <el-input v-model="ruleForm.discussionLink" />
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-select v-model="ruleForm.level" placeholder="请设置等级">
            <el-option label="等级一" :value="1" />
            <el-option label="等级二" :value="2" />
            <el-option label="等级三" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"
            format="yyyy-MM-dd hh:mm:ss A"
          />
        </el-form-item>
        <el-form-item label="是否立即发布" prop="display">
          <el-select v-model="ruleForm.display" placeholder="请选择">
            <el-option label="稍后发布" :value="false" />
            <el-option label="立即发布" :value="true" />
          </el-select>
        </el-form-item>
        <el-card>
          换行需在换行处添加换行符号<br>
          <div style="margin-top: 10px">
            {{ str }} <el-button size="small" @click="doCopy()">复制</el-button>
          </div>
        </el-card>
        <el-form-item label="详情" prop="detail">
          <el-input
            v-model="ruleForm.detail"
            resize="none"
            :rows="10"
            type="textarea"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="submitForm('ruleForm')"
          >立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { makeVote } from '@/api/vote'
export default {
  data() {
    return {
      btnLoading: false,
      str: '<br />',
      list: null,
      listLoading: true,
      ruleForm: {
        title: '',
        wip: '',
        proposalBy: '',
        discussionLink: '',
        detail: '',
        time: null,
        level: null,
        display: false
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        wip: [{ required: true, message: '请输入活动名称', trigger: 'change' }],
        level: [{ required: true, message: '请设置等级', trigger: 'change' }],
        display: [
          { required: true, message: '请选择是否立即发布', trigger: 'change' }
        ],
        time: [
          {
            type: 'array',
            required: true,
            message: '请设置时间',
            trigger: 'change'
          }
        ],
        detail: [{ required: true, message: '请填写详情', trigger: 'change' }],
        discussionLink: [
          {
            pattern: /^((ht|f)tps?):\/\/([\w]+(\.[\w]+)*\/)*[\w]+(\.[\w]+)*\/?(\?([\w\-.,@?^=%&:/~+#]*)+)?/,
            message: '请输入正确的链接',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    createParams() {
      return {
        ...this.ruleForm,
        options: ['yes', 'no'],
        startTime: this.ruleForm.time[0] / 1000,
        endTime: this.ruleForm.time[1] / 1000
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handlerMakeVote()
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    doCopy() {
      this.$copyText(this.str)
      this.$message.success('复制成功')
    },
    async handlerMakeVote() {
      try {
        this.btnLoading = true
        const result = await makeVote({ ...this.createParams })
        this.btnLoading = false
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
        this.resetForm('ruleForm')
      } catch (e) {
        this.btnLoading = false
        this.$notify({
          title: `Notification`,
          message: `操作失败，请重试!`,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 500px;
}
</style>
