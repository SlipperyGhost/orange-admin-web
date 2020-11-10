import request from '@/utils/request'

export function getProposalList(data) {
  return request({
    url: '/proposal',
    method: 'POST',
    data
  })
}
export function getProposalDetail(id) {
  return request({
    url: `/proposal/detail/${id}`,
    method: 'GET'
  })
}

export function handlerAudit(data) {
  return request({
    url: '/proposal/audit',
    method: 'POST',
    data
  })
}

export function handlerRemark(data) {
  return request({
    url: '/proposal/remark',
    method: 'POST',
    data
  })
}
