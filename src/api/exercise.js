import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/exercise',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/exercise/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/exercise',
    method: 'put',
    data
  })
}
