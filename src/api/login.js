import ajax from '../http/http';
import { apiType, apiTypeArr } from '../config/index';

/**
 * 用户登陆
 *
 * @export
 * @param {number} username 用户名
 * @param {number} password 密码
 * @returns
 */
export function login(username, password) {
  return ajax({
    url: apiTypeArr[apiType].doLogin,
    method: 'get',
    params: {
      username,
      password,
    },
  });
}

export function logout() {
  return ajax({
    url: apiTypeArr[apiType].doLogout,
    method: 'post',
  });
}
