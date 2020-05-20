/**
 * 全局定义
 * @param app
 */
// egg的生命周期函数
'use strict';
class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    if (this.app.config.env === 'prod') {
      console.log('产品上线');
    } else {
      console.log('现在正处于开发环境中');
    }

    // console.log('=================Init Data=============='); // 初始化数据
    // const ctx = await this.app.createAnonymousContext();
    // await ctx.model.User.remove(); // mongoDB 自带删除所有数据函数
    // await ctx.service.user.create({
    //   mobile: '13542216411',
    //   password: '13111',
    //   realName: 'Klao',
    // });
  }

  async serverDidReady() {
    // Server is listening.
    console.log('准备就绪！');
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;
