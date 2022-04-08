import request from '@/utils/request'

export function getAPLabelList() {
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: {
      query: 'query  { queryAPLabels  { blockChain, category, scenario } }',
      variables: {}
    }
  })
}

export function getDPLabelList() {
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: {
      query: 'query  { queryDPLabels  { blockChain, category, scenario } }',
      variables: {}
    }
  })
}
