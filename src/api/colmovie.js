import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/colmovie',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/colmovie/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/colmovie',
    method: 'put',
    data
  })
}
