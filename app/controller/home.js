'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.status = 301;
    ctx.redirect('/swagger-ui.html');
  }
}
module.exports = HomeController;
