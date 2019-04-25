import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/chapterlist',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/chapterlist/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/chapterlist',
    method: 'put',
    data
  })
}
