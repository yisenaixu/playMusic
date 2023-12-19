<template>
  <div class="login">
    <div class="login-container">
      <svg-icon symbolId="icon-heart" className="svg-icon"></svg-icon>
      <div class="title">登录网易云账号</div>
      <div v-show="mode === 'qrCode'" class="input-box qr-code">
        <div v-show="qrcodeSvg" class="qr-code-container">
          <img :src="qrcodeSvg" alt="" />
        </div>
        <div class="qr-code-info">{{ qrcodeInformation }}</div>
      </div>

      <div v-show="mode === 'email'" class="input-box">
        <div :class="{ container: true, active: inputFocus === 1 }">
          <svg-icon symbolId="icon-mail " className="svg-icon"></svg-icon>
          <div class="login-input">
            <input
              type="email"
              @focus="inputFocus = 1"
              @blur="inputFocus = 0"
              :placeholder="inputFocus === 1 ? '' : '邮箱'"
            />
          </div>
        </div>
        <div :class="{ container: true, active: inputFocus === 2 }">
          <svg-icon symbolId="icon-lock" className="svg-icon"></svg-icon>
          <div class="login-input">
            <input
              type="password"
              @focus="inputFocus = 2"
              @blur="inputFocus = 0"
              :placeholder="inputFocus === 2 ? '' : '密码'"
            />
          </div>
        </div>
      </div>

      <div v-show="mode === 'phone'" class="input-box">
        <div :class="{ container: true, active: inputFocus === 1 }">
          <svg-icon symbolId="icon-mobile " className="svg-icon"></svg-icon>
          <div class="login-input">
            <input
              id="countryCode"
              type="text"
              placeholder="+86"
              @focus="inputFocus = 1"
              @blur="inputFocus = 0"
            />
            <input
              id="phoneNumber"
              type="text"
              v-model="phone"
              @focus="inputFocus = 1"
              @blur="inputFocus = 0"
              :placeholder="inputFocus === 1 ? '' : '手机号'"
            />
          </div>
        </div>
        <div :class="{ container: true, active: inputFocus === 2 }">
          <svg-icon symbolId="icon-lock" className="svg-icon"></svg-icon>
          <div class="login-input">
            <input
              type="password"
              @focus="inputFocus = 2"
              @blur="inputFocus = 0"
              v-model="password"
              :placeholder="inputFocus === 2 ? '' : '密码'"
            />
          </div>
        </div>
      </div>

      <button
        v-show="mode !== 'qrCode'"
        class="container button"
        @click="login"
      >
        登录
      </button>
      <div class="change-login">
        <span @click="mode = 'email'" v-show="mode !== 'email'">邮箱登录</span>
        <span v-show="mode !== 'email'">|</span>
        <span @click="mode = 'phone'" v-show="mode !== 'phone'"
          >手机号登录</span
        >
        <span v-show="mode === 'email'">|</span>
        <span @click="mode = 'qrCode'" v-show="mode !== 'qrCode'"
          >二维码登录</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import QRcode from "qrcode";
import SvgIcon from "../components/SvgIcon.vue";
import { mapActions } from "vuex";
import {
  checkQrcode,
  generateQrcode,
  generateQrcodeKey,
  loginByEmail,
  loginByPhone,
} from "../api/auth";
import { setCookies } from "../utils/auth";
import md5 from "js-md5";
export default {
  components: { SvgIcon },
  name: "loginAccount",
  data() {
    return {
      mode: "qrCode",
      inputFocus: 0,
      email: "",
      countryCode: "",
      phone: "",
      password: "",
      qrcodeKey: "",
      qrcodeSvg: "",
      qrcodeCheckInterval: null,
      qrcodeInformation: "打开网易云app扫码登录",
    };
  },
  created() {
    this.getQrcode();
  },
  unmounted() {
    clearInterval(this.qrcodeCheckInterval);
  },
  methods: {
    //邮箱或手机号登录
    login() {
      if (this.mode === "phone") {
        console.log(this.phone, this.password);
        loginByPhone({
          phone: this.phone.replace(/\s/g, ""),
          password: "fakePassword",
          md5_password: md5(this.password),
        }).then(
          (res) => {
            console.log(res);
            this.handleLoginResponse(res);
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        console.log(this.email, this.password);
        loginByEmail({
          email: this.email.replace(/\s/g, ""),
          password: this.password,
        }).then(
          (res) => {
            console.log(res)
            this.handleLoginResponse(res);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    //处理成功登录后响应
    handleLoginResponse(res) {
      if(!res) {
        return ;
      }
      if(res.code === 200) {
        console.debug(res)
        setCookies(res.cookie);
        this.$store.dispatch("fetchUserProfile")
          .then(() => {
            this.$store.dispatch('fetchLikedPlaylist')
              .then(() => {
                this.$router.push({path: '/library'}); 
              })
          });
        console.log(this.$store.state.userData, "userData");
      }
    },
    //生成二维码
    getQrcode() {
      generateQrcodeKey().then((res) => {
        console.log(res);
        this.qrcodeKey = res.data.unikey;
        generateQrcode({ key: this.qrcodeKey }).then((res) => {
          console.log(res.data.qrurl);
          QRcode
            .toString(res.data.qrurl, {
              width: 192,
              margin: 0,
              color: {
                dark: "#335eea",
                light: "#00000000",
              },
              type: "svg",
            })
            .then((svg) => {
              // dataURI data:<mediaType>;编码,data
              this.qrcodeSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
                svg
              )}`;
            })
            .catch((err) => {
              console.error(err);
            });
        });
      });
      this.checkQrCodeLogin();
    },
    //轮询确认二维码是否被扫描
    checkQrCodeLogin() {
      clearInterval(this.qrcodeCheckInterval);
      this.qrcodeCheckInterval = setInterval(() => {
        if (this.qrcodeKey === "") return;
        checkQrcode(this.qrcodeKey)
          .then((res) => {
            if (res.code === 800) {
              this.getQrcode();
              this.qrcodeInformation = "二维码已失效,请重新扫码";
            } else if (res.code === 802) {
              this.qrcodeInformation = "扫描成功,请在手机上确认登陆";
            } else if (res.code === 801) {
              this.qrcodeInformation = "打开网易云app扫码登陆";
            } else if (res.code === 803) {
              clearInterval(this.qrcodeCheckInterval);
              this.qrcodeInformation = "登录成功,请稍等...";
              console.log(res);
              //修改res内容
              res.code = 200;
              res.cookie = res.cookie.replaceAll(' HTTPOnly','');
              console.log(res.cookie);
              this.handleLoginResponse(res);
            }
        });
      }, 1000);
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 128px;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.login-container .svg-icon {
  width: 100px;
  height: 100px;
}
.title {
  font-size: 24px;
  font-weight: 900;
  margin: 48px 0;
}
.change-login {
  margin-top: 24px;
  font-size: 14px;
  font-weight: 200;
}
.container {
  display: flex;
  align-items: center;
  background: var(--color-secondary-bg);
  border-radius: 8px;
  height: 40px;
  width: 300px;
  padding: 8px;
  margin-top: 16px;

  font-size: 20px;
  font-weight: 600;
  justify-content: center;
}
.button {
  margin-top: 32px;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: content-box;
  color: var(--color-primary);
  border: none;
  background: var(--color-primary-bg-for-transparent);
}

.button:hover {
  transform: scale(1.04);
}
.input-box .container .login-input {
  width: 85%;
  display: flex;
}
#countryCode {
  flex: 3;
}
#phoneNumber {
  flex: 12;
}
.input-box .container input {
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--color-text);
}
.input-box .container input:focus-visible {
  outline: none;
}
.input-box .container .svg-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  opacity: 0.34;
}
.input-box .active {
  background: var(--color-primary-bg-for-transparent);
}
.input-box .active input,
.input-box .active .svg-icon {
  opacity: 1;
  color: var(--color-primary);
}
span {
  cursor: pointer;
  padding: 0 4px;
}
</style>