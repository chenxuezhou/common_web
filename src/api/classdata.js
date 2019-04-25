import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/classdata',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/classdata/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/classdata',
    method: 'put',
    data
  })
}
