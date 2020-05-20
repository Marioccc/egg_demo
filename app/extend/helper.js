// 接口回复内容的统一处理
'use strict';
const moment = require('moment');

exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};

exports.error = ({ ctx, res = null, msg = '请求失败' }) => {
  ctx.body = {
    code: -1,
    data: res,
    msg,
  };
  ctx.status = 200;
};
