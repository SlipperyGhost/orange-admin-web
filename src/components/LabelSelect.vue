<template>
  <div class="label-select">
    <div v-if="typeName" class="label-select__name">
      {{ typeName }}
      <span v-if="showCount">({{ modelValue.length }}/{{ limit }})</span>
    </div>
    <div
      v-for="item in activeList"
      :key="item.value"
      class="label-select__item"
      :class="{ limit: isReachLimit, active: item.active, readonly, disabled }"
      @click="clickHandler(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    limit: {
      type: Number,
      require: false
    },
    readonly: {
      type: Boolean,
      require: false
    },
    disabled: {
      type: Boolean,
      require: false
    },
    // eslint-disable-next-line vue/require-default-prop
    typeName: {
      type: String,
      require: false
    },
    showCount: {
      type: Boolean,
      require: false
    }
  },
  computed: {
    activeList() {
      return this.options.map((item) => ({
        ...item,
        active: this.modelValue.includes(item.value)
      }))
    },
    isReachLimit() {
      return this.limit && this.modelValue.length > this.limit - 1
    }
  },
  methods: {
    clickHandler(target) {
      if (this.readonly || this.disabled) {
        return
      }
      let newSelected = []
      if (target.active) {
        newSelected = this.activeList.filter((item) => {
          return item.value !== target.value && item.active
        })
      } else {
        if (this.isReachLimit) {
          return
        }
        newSelected = this.activeList.filter((item) => {
          return item.active || item.value === target.value
        })
      }
      this.$emit(
        'update:modelValue',
        newSelected.map((item) => item.value)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.label-select {
  font-size: 20px;
  margin-bottom: -24px;
}

.label-select__name {
  font-size: 14px;
  margin-bottom: 20px;
}

.label-select__item {
  margin-right: 24px;
  margin-bottom: 16px;
  display: inline-block;
  padding: 3px 24px;
  background: #eeeeee;
  border: 1px solid #bfc5d2;
  box-sizing: border-box;
  border-radius: 60px;
  font-weight: bold;
  font-size: 14px;
  line-height: 160%;
  color: #6a6a92;
  cursor: pointer;
  user-select: none;

  &.limit {
    cursor: not-allowed;
  }

  &.active,
  &.readonly {
    background: rgba(237, 103, 57, 0.1);
    border: 1px solid #ed6739;
    border-radius: 60px;
    color: #ed6739;
    cursor: pointer;
  }

  &.readonly {
    cursor: default;
  }

  &.disabled {
    cursor: not-allowed;
  }
}
</style>
