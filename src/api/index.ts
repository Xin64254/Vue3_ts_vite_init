import request from 'utils/service'

export function testApi() {
  return request({
    url: '/test',
    method: 'get'
    //  responseType: 'blob'
  })
}
