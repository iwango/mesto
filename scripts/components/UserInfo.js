export default class UserInfo {
  constructor({profileName, profileEmployment}) {
    console.log("userinfo class");
    this.userName = profileName;
    this.userInfo = profileEmployment;
    console.log(this.userInfo);
    console.log(this.userName);
  }

  getUserInfo() {
    console.log('getInfo');
    this.user ={};
    this.user.name = this.userName.textContent;
    this.user.info = this.userInfo.textContent;
    return this.user;
  }

  setUserInfo(userName, userInfo) {
    console.log('setInfo');
    console.log(userName, userInfo);
    this.userName.textContent = userName;
    this.userInfo.textContent = userInfo;
  }
}