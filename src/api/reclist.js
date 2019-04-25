import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/reclist',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/reclist/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/reclist',
    method: 'put',
    data
  })
}
