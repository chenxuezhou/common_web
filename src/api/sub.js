import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/sub',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/sub/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/sub',
    method: 'put',
    data
  })
}
