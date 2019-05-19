import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/mark',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/mark/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/mark',
    method: 'put',
    data
  })
}
