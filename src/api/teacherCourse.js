import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/teacherCourse',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/teacherCourse/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/teacherCourse',
    method: 'put',
    data
  })
}
