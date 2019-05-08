import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/userlog',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/userlog/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/userlog',
    method: 'put',
    data
  })
}
