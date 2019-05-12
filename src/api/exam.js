import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/exam',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/exam/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/exam',
    method: 'put',
    data
  })
}
