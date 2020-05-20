'use strict';
const Controller = require('egg').Controller;
/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {
//   constructor(ctx) {
//     super(ctx);
//   }
  /**
 * @summary 用户登入
 * @description 用户登录系统
 * @router post /auth/jwt/login
 * @request body loginRequest *body
 * @response 200 baseResponse 登录成功
 */
  async login() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.loginRequest);
    const payload = ctx.request.body || {};
    const res = await service.userAccess.login(payload);
    ctx.helper.success({ ctx, res });
  }
  /**
 * @summary 用户登出
 * @description 用户退出系统
 * @router post /auth/jwt/loginOut
 * @request body loginRequest *body
 * @response 200 baseResponse 退出成功
 */
  async loginOut() {
    const { ctx, service } = this;
    await service.userAccess.loginOut();
    ctx.helper.success({ ctx });
  }
}
module.exports = UserAccessController;

