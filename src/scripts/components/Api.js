export default class Api {
  constructor(options) {
    this.apiUrl = options.baseUrl;
    this.token = options.headers.authorization;

  }

  _checkRequest(response) {
    if(response.ok) {
      // console.log(response, 'проверка'); // log block delete this ~~~~~~ iwang
      return response.json();
    } else {
      return reject(`Код ошибки ${response.status} - текст ошибки ${response.statusText}`);
    }
  }

  getUserInfo() {
   return fetch(`${this.apiUrl}/users/me`, {
     headers: {
       authorization: this.token
     }
   })
     .then((response) => this._checkRequest(response))
     .catch((error) =>{
       console.log(error);
     })
  }

  getInitialCards() {
    return fetch(`${this.apiUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }

  setUserInfo(name, about) {
    return fetch(`${this.apiUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }

  addNewCard(name, link) {
    return fetch(`${this.apiUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }

  deleteCard(idCard) {
    return fetch(`${this.apiUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }

  addLikeCard(idCard) {
    return fetch(`${this.apiUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token
      }
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }

  deleteLikeCard(idCard) {
    return fetch(`${this.apiUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }

  setAvatarInfo(avatar) {
    return fetch(`${this.apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((response) => this._checkRequest(response))
      .catch((error) =>{
        console.log(error);
      })
  }
}

