import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/teaResource',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/teaResource/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/teaResource',
    method: 'put',
    data
  })
}
