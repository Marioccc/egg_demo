'use strict';
const Service = require('egg').Service;
const nodemailer = require('nodemailer');
// securet key: tbqqowtuuxhubcfb
const clientId = 'ecef8315136a314c686f';
const clientSecret = 'ad386f6fe085c5e5acc28281e39bd605aa11b6d9';
const userEmail = 'ckabr@qq.com';
const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  auth: {
    user: userEmail,
    pass: 'tbqqowtuuxhubcfb',
  },
});
class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    const { ctx } = this;
    payload.password = await this.ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }
  /**
   * 删除用户
   * @param {*} _id
   */
  async delete(_id) {
    const { ctx } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found !');
    }
    return ctx.model.User.findByIdAndRemove(_id);
  }
  /**
   * 修改用户
   * @param {*} _id
   * @param {*} payload
   */
  async update(_id, payload) {
    const { ctx } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found !');
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload);
  }
  /**
   * 查找单个用户
   * @param {*} _id
   */
  async show(_id) {
    const { ctx } = this;
    const user = ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found !');
    }
    return ctx.model.User.findById(_id).populate('role');
  }
  /**
   * 根据手机号查找
   * @param {*} mobile
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile });
  }

  async sendMail(email, title, html) {
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: title,
      text: '',
      html,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
  // async index(payload) {
  //   const { currentPage, pageSize, isPaging, search } =
  //   let res = [];
  //   let count = 0;
  //   let skip = ((Number(currentPage)) - 1) *
  // }

  async oAuthHandler(code) {
    const { ctx } = this;

    const res = await ctx.curl('https://github.com/login/oauth/access_token', {
      method: 'POST',
      contentType: 'json',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      dataType: 'json',
    });
    console.log('口令:', res.data.access_token);
    const userInfo = await ctx.curl('https://api.github.com/user', {
      headers: {
        Authorization: `token ${res.data.access_token}`,
      },
    });
    const userInfoJson = JSON.parse(userInfo.data.toString());
    return userInfoJson;
  }
}
module.exports = UserService;
