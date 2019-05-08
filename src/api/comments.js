import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/comments',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/comments/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/comments',
    method: 'put',
    data
  })
}
