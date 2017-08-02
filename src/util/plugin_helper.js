/**
 * 合并vue对象参数
 *
 * @param {object} $vm vue对象
 * @param {object} options 参数
 */
const mergeOptions = ($vm, options) => {
  const defaults = {};

  Object.keys($vm.$options.props).forEach((i) => {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default;
    }
  });
  const selfOptions = { ...defaults, ...options };
  /* eslint-disable no-param-reassign */
  Object.keys(selfOptions).forEach(i => ($vm[i] = selfOptions[i]));
};

export default mergeOptions;
