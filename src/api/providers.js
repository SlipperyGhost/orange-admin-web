import request from '@/utils/request'

export function getAllAProviders({
  pageSize,
  pageNumber
}) {
  const skip = (pageNumber - 1) * pageSize
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: { 'operationName': '', 'query': `{ getAllAlgorithmProviders(first: ${pageSize}, skip: ${skip}, where: { name_like: "" }, orderBy: "invokeFrequency", orderDirection: "desc") {total data { introduction did title icon invokeFrequency }} }`, 'variables': {}}
  })
}

export function getAlgorithmProvider(did) {
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: { 'operationName': '', 'query': `{getAlgorithmProvider(did: "${did}") {   introduction   did   title  invokeFrequency    apiState   icon} }`, 'variables': {}}})
}

export const getAllAlgorithmProviderMethod = ({
  pageSize,
  pageNumber,
  did
}) => {
  const skip = (pageNumber - 1) * pageSize
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: { 'query': 'query ($first: Int!, $skip: Int!, $where: AlgorithmProviderMethodWhere!, $orderBy: String!, $orderDirection: String!, $labels: LabelsInfo!) { getAllAlgorithmProviderMethod (first: $first, skip: $skip, where: $where, orderBy: $orderBy, orderDirection: $orderDirection, labels: $labels) { total, data { did, name, method, methodName, methodDescription, used, icon } } }', 'variables': { 'first': pageSize, 'skip': skip, 'where': { 'name_like': '', 'did_like': `${did}` }, 'orderBy': 'invoked', 'orderDirection': 'desc', 'labels': { 'blockChain': [], 'category': [], 'scenario': [] }}}

  })
}

export const getAlgorithmProviderMethod = ({ did, name }) => {
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: { 'query': 'query ($did: String!, $name: String!) { getAlgorithmProviderMethod (did: $did, name: $name) { paramSchema, resultSchema, description, title, labels { blockChain, category, scenario }, totalUsed, hasDataSet, status, createTime, nftType } }', 'variables': { 'did': did, 'name': name }}
  })
}
