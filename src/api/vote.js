import request from '@/utils/request'

export function queryVoteList(data) {
  return request({
    url: '/vote',
    method: 'POST',
    data
  })
}

export function makeVote(data) {
  return request({
    url: '/vote/create',
    method: 'POST',
    data
  })
}

export function queryVoteDetail(id) {
  return request({
    url: `/vote/detail/${id}`,
    method: 'POST'
  })
}

export function editVoteDetail(data) {
  return request({
    url: `/vote/edit`,
    method: 'POST',
    data
  })
}
