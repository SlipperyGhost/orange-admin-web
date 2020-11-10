import request from '@/utils/request'

export function getProposalList(data) {
  return request({
    url: '/proposal',
    method: 'POST',
    data
  })
}
