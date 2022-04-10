<template>
  <div class="app-container">
    <el-card>
      <el-form label-position="top">
        <el-form-item label="Model Name" :label-width="formLabelWidth">
          <el-input v-model="info.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Model Description" :label-width="formLabelWidth">
          <el-input v-model="info.description" :rows="10" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Blockchain" :label-width="formLabelWidth">
          <div class="flex-label">
            <div>
              <LabelSelect :model-value="blockChainValue" :options="blockChainOptions" disabled :limit="3" :show-count="true" />
            </div>
            <el-button type="primary" @click="handlerOpenDialog('Blockchain')">更新</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Category" :label-width="formLabelWidth">
          <div class="flex-label">
            <div>
              <LabelSelect :model-value="categoryValue" :options="categoryOptions" disabled :limit="3" :show-count="true" />
            </div>
            <el-button type="primary" @click="handlerOpenDialog('Category')">更新</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Scenario" :label-width="formLabelWidth">
          <div class="flex-label">
            <div>
              <LabelSelect :model-value="scenarioValue" :options="scenarioValueOptions" disabled :limit="3" :show-count="true" />
            </div>
            <el-button type="primary" @click="handlerOpenDialog('Scenario')">更新</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Data Source" :label-width="formLabelWidth">
          <div class="flex-label">
            <div class="img-box">
              <img v-for="(item, idx) in dataSourceImg" :key="idx" :src="item.icon" alt="">
            </div>
            <el-button type="primary" @click="handlerOpenDialog('DataSource')">更新</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerEditOption">确 定</el-button>
      </div>
    </el-card>

    <el-dialog title="Edit" :visible.sync="dialogFormVisible">
      <LabelSelect :model-value="selectOption" :options="allOptions" :type-name="typeName" :show-count="false" @update:modelValue="handlerUpdate" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerEditOption">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LabelSelect from '@/components/LabelSelect'
import { getDataProviderMethod } from '@/api/providers'
import { getDPLabelList } from '@/api/label'
import { queryDPDataSource } from '@/api/dataSource'

export default {
  name: 'APModelDetailIndex',
  components: { LabelSelect },
  data() {
    return {
      did: '',
      info: {},
      methodName: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      blockChainValue: [],
      categoryValue: [],
      scenarioValue: [],
      dataSourceValue: [],
      selectOption: [],
      typeName: '',
      labels: {
        blockChain: [],
        category: [],
        scenario: []
      },
      dataSource: []
    }
  },
  computed: {
    allOptionsValue() {
      if (this.typeName === 'Blockchain') {
        return this.labels.blockChain
      }
      if (this.typeName === 'Category') {
        return this.labels.category
      }
      if (this.typeName === 'Scenario') {
        return this.labels.scenario
      }
      return []
    },
    allOptions() {
      if (this.typeName === 'DataSource') {
        return this.dataSource
      }
      return this.allOptionsValue.map(item => {
        return {
          value: item,
          label: item
        }
      })
    },
    dataSourceOptions() {
      return this.dataSourceValue.map(item => {
        return {
          value: item,
          label: item
        }
      })
    },
    blockChainOptions() {
      return this.blockChainValue.map(item => {
        return {
          value: item,
          label: item
        }
      })
    },
    categoryOptions() {
      return this.categoryValue.map(item => {
        return {
          value: item,
          label: item
        }
      })
    },
    scenarioValueOptions() {
      return this.scenarioValue.map(item => {
        return {
          value: item,
          label: item
        }
      })
    },
    dataSourceImg() {
      const resultValue = []
      this.dataSourceValue.map((item) => {
        this.dataSource.map((ele) => {
          if (ele.value === item) {
            resultValue.push(ele)
          }
        })
      })
      return resultValue
    }
  },
  mounted() {
    this.did = this.$route.params.did
    this.methodName = this.$route.params.method
    this.handlerGetDetail()
    this.getLabel()
    this.queryDPDataSource()
  },
  methods: {
    async handlerGetDetail() {
      const result = await getDataProviderMethod({
        did: this.did,
        name: this.methodName
      })
      console.log('detail', result)
      this.info = result.data.getDataProviderMethod
      this.blockChainValue = this.info.labels.blockChain
      this.categoryValue = this.info.labels.category
      this.scenarioValue = this.info.labels.scenario
      this.dataSourceValue = this.info.DataSource
    },
    handleClick() {},
    handlerUpdate(val) {
      this.selectOption = val
    },
    handlerOpenDialog(type) {
      if (type === 'Blockchain') {
        this.selectOption = this.blockChainValue
      } else if (type === 'Category') {
        this.selectOption = this.categoryValue
      } else if (type === 'Scenario') {
        this.selectOption = this.scenarioValue
      } else if (type === 'DataSource') {
        this.selectOption = this.dataSourceValue
      }
      this.typeName = type
      this.dialogFormVisible = true
    },
    handlerEditOption() {
      if (this.typeName === 'Blockchain') {
        this.blockChainValue = this.selectOption
      } else if (this.typeName === 'Category') {
        this.categoryValue = this.selectOption
      } else if (this.typeName === 'Scenario') {
        this.scenarioValue = this.selectOption
      } else if (this.typeName === 'DataSource') {
        this.dataSourceValue = this.selectOption
      }
      this.dialogFormVisible = false
    },
    async getLabel() {
      const result = await getDPLabelList()
      console.log('label result', result)
      this.labels = result.data.queryDPLabels
    },
    async queryDPDataSource() {
      const { data } = await queryDPDataSource()
      const list = data.queryDPDataSource.dataSource
      this.dataSource = list.map((item) => ({
        icon: item.Icon,
        label: item.Name,
        value: item.Name
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  h3 {
    margin-bottom: 10px;
  }
}
.model {
  .card-list {
    margin-top: 40px;
  }
}
.pagination-lay {
  text-align: right;
  margin-top: 20px;
}
.dialog-footer {
  text-align: center;
}
.flex-label {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.img-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
