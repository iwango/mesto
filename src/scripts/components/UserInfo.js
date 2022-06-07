export default class UserInfo {
  constructor({profileName, profileEmployment, profileAvatar}) {
    this.userName = profileName;
    this.userInfo = profileEmployment;
    this.userAvatar = profileAvatar;
  }

  getUserInfo() {
    this.user ={};
    this.user.name = this.userName.textContent;
    this.user.info = this.userInfo.textContent;
    return this.user;
  }

  setUserInfo(userName, userInfo, userAvatar) {
    this.userName.textContent = userName;
    this.userInfo.textContent = userInfo;
    this.userAvatar.src = userAvatar;
  }
}