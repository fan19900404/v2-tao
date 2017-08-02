/**
 * url 跳转
 *
 * @export
 * @param {any} url url跳转地址
 * @param {any} $router vue-router的方法
 * @returns
 */
export function go(url, $router) {
  if (/^javas/.test(url) || !url) return;
  const useRouter =
    typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url));
  if (useRouter) {
    if (url === 'BACK') {
      $router.go(-1);
    } else {
      $router.push(url);
    }
  } else {
    window.location.href = url;
  }
}


/**
 * 获取URL
 *
 * @export
 * @param {any} url url地址
 * @param {any} $router vue-router对象
 * @returns
 */
export function getUrl(url, $router) {
  // Make sure the href is right in hash mode
  /* eslint-disable no-underscore-dangle */
  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
    return `#!${url}`;
  }

  if (url && typeof url !== 'object') {
    return url;
  }
  /* eslint-disable no-script-url */
  return 'javascript:void(0);';
}
