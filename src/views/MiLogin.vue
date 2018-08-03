<template>
  <div class="wrap">
    <div class="layout">
      <!-- 登陆头 -->
      <header>
          <em class="milogo"></em>
          <h4 class="header_tit_txt">小米账号登录</h4>
      </header>
      <!-- 登陆区域 -->
      <div class="login_area">
        <!-- 账号/手机号 -->
        <label class="login_user">
          <div v-show="isSmsLogin" class="country_list">
            <div class="countrycode_selector">
              <span class="country_code">
                <tt class="countrycode-value">+86</tt>
                <i class="icon_arrow_down"></i>
              </span>
            </div>
          </div>
          <input class="item_account" autocomplete="off" type="text" v-model.trim="username" :placeholder="placeholderTxt" @input="clearErr">
        </label>
        <!-- 密码面板 -->
        <label class="pwd_panel" v-show="!isSmsLogin">
          <input class="item_account" :type="isOpen?'password':'text'" placeholder="密码" v-model="password" autocomplete="off" @input="clearErr">
          <i class="iconfont" :class="{'icon-yanjing-bi':isOpen,'icon-yanjing-zheng':!isOpen}" @click="isOpen = !isOpen"></i>
        </label>
        <!-- 短信面板（切换显示） -->
        <label class="pwd_panel" v-show="isSmsLogin">
          <input class="item_account" type="number" placeholder="短信验证码" v-model.trim="smsCode" autocomplete="off" @input="clearErr">
          <a href="javascript:;" class="sms_code" @click="getcode">{{codeMsg}}</a>
        </label>
        <!-- 验证提示 -->
        <div class="err_tip" v-show="errMsg">
          <i class="iconfont icon-info-circle"></i>
          <span class="error-con">{{errMsg}}</span>
        </div>
        <!-- 登陆按钮 -->
        <div class="btns_bg">
          <button class="btnadpt" @click="login">
            <template v-if="isLoading">
              <i class="iconfont icon-loading"></i>
              登录中
            </template>
            <template v-else>
              {{loginBtn}}
            </template>
          </button>
        </div>
        <!-- 切换登陆及其他按钮 -->
        <div class="other_panel">
          <a href="javascript:;" class="btnadpt btn_gray" @click="isSmsLogin=!isSmsLogin">{{switchBtn}}</a>
          <div class="reverse" v-show="!isSmsLogin">
            <div class="n_links_area">
              <a class="outer-link">立即注册</a>
              <span>|</span>
              <a class="outer-link">忘记密码？</a>
            </div>
          </div>
          <div class="other_login_type">
            <fieldset class="oth_type_tit">
              <legend align="center" class="oth_type_txt">其他方式登录</legend>
            </fieldset>
            <div class="oth_type_links">
              <a class="icon_type btn_qq sns-login-link" data-type="qq" title="QQ登录" target="_blank">
                <i class="btn_sns_icontype icon_default_qq"></i>
              </a>
              <a class="icon_type btn_weibo sns-login-link" data-type="weibo" title="微博登录" target="_blank">
                <i class="btn_sns_icontype icon_default_weibo"></i>
              </a>
              <a class="icon_type btn_alipay sns-login-link" data-type="alipay" title="支付宝登录" target="_blank">
                <i class="btn_sns_icontype icon_default_alipay"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
    </div>
    <div class="n-footer">
      <div class="clearfix">
        <ul class="lang-select-list">
          <li><a class="lang-select-li current">简体</a>|</li>
          <li><a class="lang-select-li">繁体</a>|</li>
          <li><a class="lang-select-li">English</a>|</li>
          <li><a class="lang-select-li">常见问题</a>|</li>
          <li><a class="lang-select-li">隐私政策</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'blueimp-md5'

export default {
  data () {
    return {
      isSmsLogin: true,
      isOpen: false,
      errMsg: '',
      username: '',
      password: '',
      smsCode: '',
      codeMsg: '获取验证码',
      timer: null,
      timedown: 60,
      isLoading: false
    }
  },
  computed: {
    placeholderTxt () {
      return this.isSmsLogin ? '手机号码' : '邮箱/手机号码/小米ID'
    },
    loginBtn () {
      return this.isSmsLogin ? '立即登录/注册' : '登录'
    },
    switchBtn () {
      return this.isSmsLogin ? '用户名密码登录' : '手机短信登录/注册'
    }
  },
  methods: {
    checkMobile () {
      const reg = /^0?(13|14|15|17|18|19)[0-9]{9}$/
      return reg.test(this.username)
    },
    getcode () {
      if (!this.username) {
        this.errMsg = '请输入手机号'
        return
      }
      if (!this.checkMobile()) {
        this.errMsg = '手机号格式不正确'
        return
      }
      let url = 'http://rap2api.taobao.org/app/mock/13801/user/getCode'
      axios.post(url, {username: this.username}).then(res => {
        this.timer = setInterval(() => {
          this.codeMsg = `重新发送${this.timedown}`
          this.timedown--
          if (this.timedown === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.timedown = 60
            this.codeMsg = '获取验证码'
          }
        }, 1000)
      })
    },
    clearErr () {
      this.errMsg = ''
    },
    login () {
      if (this.isSmsLogin) {
        if (!this.username) {
          this.errMsg = '请输入手机号'
          return
        }
        if (!this.checkMobile()) {
          this.errMsg = '手机号格式不正确'
          return
        }
        if (!this.smsCode) {
          this.errMsg = '请输入验证码'
          return
        }
      } else {
        if (!this.username) {
          this.errMsg = '请输入账号'
          return
        }
        if (!this.password) {
          this.errMsg = '请输入密码'
          return
        }
      }

      // 如果isLoading=true，说明还在加载
      if (this.isLoading) return
      this.isLoading = true
      let url = 'http://rap2api.taobao.org/app/mock/25079/user/login'
      let data = {
        username: this.username
      }
      if (this.isSmsLogin) {
        data.code = this.smsCode
      } else {
        data.pwd = md5(this.password)
      }

      axios.post(url, data).then(res => {
        let status = res.data.status
        if (status === 200) {
          alert('登录成功，要跳转')
        } else {
          this.errMsg = res.data.message
        }
        this.isLoading = false
      }).catch(err => {
        console.err(err)
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
@import url("../assets/fonts/iconfont.css");

.wrap {
  height: auto;
  min-height: 100%;
}
.layout {
  padding: 0 28px;
  position: relative;
  box-sizing: border-box;
}

header {
  padding: 30px 0 10px;
  text-align: center;
}
.milogo {
  width: 48px;
  height: 48px;
  margin: 0 auto 15px;
  display: block;
  background-image: url(../assets/images/milogo.png);
  background-repeat: no-repeat;
}

.header_tit_txt {
  font-size: 18px;
  font-weight: normal;
}

.login_area input{
  font-size:18px;
}

.login_user,
.pwd_panel {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
}

.pwd_panel {
  justify-content: space-between;
}

.country_list {
  padding: 1px 10px 1px 0;
  margin-right: 8px;
  color: #4a4a4a;
  display: block;
  overflow: hidden;
}

.countrycode_selector {
  position: relative;
  animation: fade-in ease-in-out 0.5s;
}

@keyframes fade-in {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}

.country_code {
  display: flex;
  align-items: center;
}

.countrycode-value {
  margin-right: 2px;
  color: #9b9b9b;
  font-size: 16px;
}

.icon_arrow_down {
  display: block;
  width: 6px;
  height: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: #9b9b9b #9b9b9b transparent transparent;
  transform: rotate(45deg);
}

.item_account {
  padding: 16px 0;
}

.sms_code {
  color: #2ea5e5;
  font-size: 14px;
  padding-right:20px;
}

.err_tip {
  margin-bottom: 5px;
  padding-top: 14px;
  color: #f66;
  text-align: left;
  font-size: 14px;
}

.icon-info-circle {
  font-size: 16px;
  margin-right: 5px;
  color: #ff6700;
}

.btns_bg {
  padding-top: 24px;
}

.btnadpt {
  width: 100%;
  padding: 12px 0;
  margin-bottom: 14px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  background-color: #ff6700;
  display: block;
  border-style: none;
}

.btn_gray {
  background: #fff;
  margin-top: 10px;
  border: 1px solid #d3d3d3;
  color: #000;
}

.n_links_area {
  color: #646464;
  text-align: center;
}

.outer-link {
  padding: 0 9px;
  color: #646464;
}

.other_login_type {
  padding-top: 40px;
}

.oth_type_tit {
  border-top: 1px solid #f2f2f2;
  padding-top: 10px;
}

.oth_type_txt {
  font-size: 12px;
  color: #b0b0b0;
  width: 80px;
}

.icon_type {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  display: inline-block;
  border-radius: 50%;
}

.oth_type_links {
  text-align: center;
}
.btn_qq {
  background-color: #72c7db;
}
.btn_weibo {
  background-color: #ed9090;
}
.btn_alipay {
  background-color: #6bb6ea;
}

.btn_sns_icontype {
  background: url(../assets/images/icons_type.png) no-repeat;
  display: block;
  width: 18px;
  height: 18px;
  margin: 5px auto 0;
}

.icon_default_qq {
  background-position: -19px 0;
}

.icon_default_weibo {
  background-position: -38px 0;
}

.icon_default_alipay {
  background-position: -57px 0;
  width: 23px;
}

.n-footer {
  text-align: center;
  font-size: 14px;
  margin-top: 90px;
  height: 90px;
  line-height: 21px;
  color: #9b9b9b;
  width: 100%;
}

.lang-select-list li {
  display: inline-block;
}

.lang-select-li {
  padding: 0 10px;
}

.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
  overflow: hidden;
}

.icon-loading {
  /* font图标是inline不支持rotate，要变成inline-block */
  display: inline-block;
  animation: 2s loading linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(50deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
