import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/collect',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/collect/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/collect',
    method: 'put',
    data
  })
}
