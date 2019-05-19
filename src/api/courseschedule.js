import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/courseschedule',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/courseschedule/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/courseschedule',
    method: 'put',
    data
  })
}
