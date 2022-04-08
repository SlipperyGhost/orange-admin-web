
import request from '@/utils/request'

export function queryDPDataSource() {
  return request({
    url: process.env.VUE_APP_ORANGE_BASE_API,
    method: 'POST',
    data: { 'query': 'query  { queryDPDataSource  { dataSource { Name, Icon } } }', 'variables': {}}
  })
}
