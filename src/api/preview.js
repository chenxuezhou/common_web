import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/preview',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/preview/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/preview',
    method: 'put',
    data
  })
}
