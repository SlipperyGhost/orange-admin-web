<template>
  <div class="app-container">
    <el-card class="card-css">
      <div slot="header" class="clearfix">
        <span>当前投票数据</span>
      </div>
      <ul class="vote-amount">
        <li>
          <div>总票数</div><div>{{ totalVotes }}</div>
        </li>
        <li>
          <div>YES</div>
          <p style="margin-bottom:6px"><span>{{ yesData.amount }}</span></p>
          <div>
            <el-progress :percentage="yesData.percent | dataDliter" status="success" :show-text="false" />
          </div>
        </li>
        <li>
          <div>NO </div>
          <p style="margin-bottom:6px"><span>{{ noData.amount }}</span></p>
          <div>
            <el-progress :percentage="noData.percent | dataDliter" status="exception" :show-text="false" />
          </div>
        </li>
      </ul>
      <el-card>
        <ul class="vote-amount">
          <li>
            <div>状态</div>
            <div>
              <el-tag :type="status | statusFilter">{{ stateWord(status) }}</el-tag>
            </div>
          </li>
          <li>
            <div>
              更改状态  <el-button type="info" size="small" @click="dialogVisible = true">状态纪录</el-button>
            </div>
            <div>
              <el-select v-model="changeStatus" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <p>
                <el-button type="primary" @click="handlerChangeStatus()">修改</el-button>
              </p>
            </div>
          </li>
        </ul>
      </el-card>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>当前投票信息</span>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" label-position="top" :rules="rules" class="demo-ruleForm">
        <el-form-item label="主标题" prop="title">
          <el-input v-model="ruleForm.title" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="副标题" prop="wip">
          <el-input v-model="ruleForm.wip" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="Proposal 提供者地址（选填）">
          <el-input v-model="ruleForm.proposalBy" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="discussionLink（选填）">
          <el-input v-model="ruleForm.discussionLink" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-select v-model="ruleForm.level" :disabled="isEdit" placeholder="请设置等级">
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
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="是否立即发布" prop="display">
          <el-select v-model="ruleForm.display" :disabled="isEdit" placeholder="请选择">
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
          <el-input v-model="ruleForm.detail" :disabled="isEdit" resize="none" :rows="10" type="textarea" />
        </el-form-item>
        <el-form-item v-if="isEdit">
          <el-button type="primary" @click="isEdit = false">编辑</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="cancelEdit()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      title="状态纪录"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editVoteDetail, queryVoteDetail, editVoteStatus } from '@/api/vote'
import { getUTCTime } from '@/utils'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = [
        'danger', 'success', 'warning', 'gray'
      ]
      return statusMap[status]
    },
    dataDliter(num) {
      if (!num) {
        return 0
      }
      return num * 100
    }
  },
  data() {
    return {
      options: [{
        value: 0,
        label: '失败'
      }, {
        value: 1,
        label: '通过且执行'
      }, {
        value: 2,
        label: '通过未执行'
      }, {
        value: 3,
        label: '进行中'
      }],
      changeStatus: null,
      status: null,
      isEdit: true,
      optionResult: [],
      totalVotes: 0,
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
      dialogVisible: false,
      rules: {
        display: [
          { required: true, message: '请选择是否立即发布', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入主标题', trigger: 'change' }
        ],
        wip: [
          { required: true, message: '请输入副标题', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请设置等级', trigger: 'change' }
        ],
        time: [
          { type: 'array', required: true, message: '请设置时间', trigger: 'change' }
        ],
        detail: [
          { required: true, message: '请填写详情', trigger: 'change' }
        ]
      },
      voteHistory: []
    }
  },
  computed: {
    activities() {
      const arr = []
      this.voteHistory.map(item => {
        const o = {}
        o.content = this.stateWord2(item.status)
        o.timestamp = getUTCTime(item.createTime * 1000)
        arr.push(o)
      })
      return arr
    },
    createParams() {
      return {
        ...this.ruleForm,
        options: [
          'yes', 'no'
        ],
        startTime: this.ruleForm.time[0] / 1000,
        endTime: this.ruleForm.time[1] / 1000
      }
    },
    yesData() {
      return this.optionResult.filter(item => item.option === 'yes')[0] || {}
    },
    noData() {
      return this.optionResult.filter(item => item.option === 'no')[0] || {}
    }
  },
  created() {
    this.queryVoteDetail()
    console.log()
  },
  methods: {
    stateWord(status) {
      const statusMap = [
        '失败', '通过且执行', '通过未执行', '进行中'
      ]
      return statusMap[status]
    },
    stateWord2(status) {
      const statusMap = [
        '', 'created', 'active', 'Succeeded', 'Queued', 'Executed', 'Failed'
      ]
      return statusMap[status]
    },
    handleClose() {
      this.dialogVisible = false
    },
    cancelEdit() {
      this.isEdit = true
      this.queryVoteDetail()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handlerMakeVote({ id: this.$route.params.voteId, ...this.createParams })
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
    async handlerMakeVote(params) {
      try {
        this.btnLoading = true
        const result = await editVoteDetail({ ...params })
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
        this.isEdit = true
        await this.queryVoteDetail()
      } catch (e) {
        this.btnLoading = false
        this.$notify({
          title: `Notification`,
          message: `操作失败，请重试!`,
          type: 'error'
        })
      }
    },
    async handlerEditStatus(params) {
      try {
        this.btnLoading = true
        const result = await editVoteStatus({ ...params })
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
        await this.queryVoteDetail()
      } catch (e) {
        this.btnLoading = false
        this.$notify({
          title: `Notification`,
          message: `操作失败，请重试!`,
          type: 'error'
        })
      }
    },
    async queryVoteDetail() {
      const result = await queryVoteDetail(this.$route.params.voteId)
      console.log(result)
      const { title, wip, proposalBy, discussions, detail, startTime, display, endTime, level, status, voteHistory, optionResult, totalVotes } = result.result
      this.optionResult = optionResult
      this.totalVotes = totalVotes
      this.status = status
      this.voteHistory = voteHistory
      this.ruleForm = {
        title,
        wip,
        proposalBy,
        discussionLink: discussions,
        detail,
        time: [startTime * 1000, endTime * 1000],
        level,
        display
      }
    },
    handlerChangeStatus() {
      if (this.changeStatus === null) {
        return false
      }
      this.handlerEditStatus({ id: this.$route.params.voteId, status: this.changeStatus })
    }
  }
}
</script>

<style lang="scss" scoped>
.vote-amount {
  li {
    margin-bottom: 14px;
    div:nth-of-type(1) {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
    }
    div:nth-of-type(2),p {
      font-size: 14px;
      line-height: 22px;
    }
  }
}
.card-css {
  margin-bottom: 20px;
}
</style>
