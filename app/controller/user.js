'use strict';

const Controller = require('egg').Controller;
const clientId = 'ecef8315136a314c686f';
const clientSecret = 'ad386f6fe085c5e5acc28281e39bd605aa11b6d9';
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description 记录用户账户信息
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createUserRequest);
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    ctx.helper.success({ ctx, res });
  }

  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用service进行业务的处理
    await service.user.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  /**
   * @summary 删除所选用户
   * @description 删除用户信息
   * @router delete /api/user/{id}
   * @request path string *id eg: 123123111
   * @response 200 baseResponse 删除成功
   */
  async remove() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const payload = id.split(',') || [];
    await service.user.delete(payload);
    ctx.helper.success({ ctx });
  }

  async mail() {
    const { ctx } = this;
    const email = ctx.query.email;
    const code = Math.random().toString().slice(2, 6);
    console.log(`Email Code: ${code}`);
    const title = 'Ckabr';
    const html = `
      <h1>Vailidate Code</h1>
      <div>
        <h2>${code}</h2>
      </div>
    `;
    const result = await this.service.user.sendMail(email, title, html);
    if (result) {
      ctx.session.emailCode = code;
      ctx.session.maxAge = 61 * 1000;
      ctx.helper.success({ ctx });
    } else {
      ctx.helper.error({ ctx });
    }
  }

  async login() {
    const { ctx } = this;
    ctx.session.emailCode === ctx.query.code ? ctx.helper.success({ ctx }) : ctx.helper.error({ ctx });
  }


  async oAuthLogin() {
    const { ctx } = this;
    const res = await ctx.curl('https://github.com/login/oauth/access_token', {
      method: 'POST',
      contentType: 'json',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code: ctx.query.code,
      },
      dataType: 'json',
    });
    console.log(`Access Token: ${res.data.access_token}`);
    const userInfo = await ctx.curl('https://api.github.com/user', {
      headers: {
        Authorization: `token ${res.data.access_token}`,
      },
    });
    const userInfoJson = JSON.parse(userInfo.data.toString());
    const userName = userInfoJson.login;
    ctx.helper.success({ ctx, res: userName });
  }
}
module.exports = UserController;
