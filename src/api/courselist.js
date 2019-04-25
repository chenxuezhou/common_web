import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/courselist',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/courselist/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/courselist',
    method: 'put',
    data
  })
}
