/**
 * Created by dreamapple on 16/9/27.
 */
const router = [
  {
    // demo页面
    path: '/tao-you/demo',
    name: 'Demo',
    component(resolve) {
      require(['../../pages/_demo/demo.page'], resolve);
    },
  },
  {
    path: '/tao-you/test',
    name: 'Test',
    component(resolve) {
      require(['../../pages/_demo/test-ant-ui.page'], resolve);
    },
  },
];

export default router;
