'use strict';
module.exports = {
  schedule: {
    interval: '2s', // 1 分钟间隔 1m
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // console.log('请求', ctx.query);
  },
};
