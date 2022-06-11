export default class Api {
  constructor(options) {
    this.apiUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkRequest(response) {
    if(response.ok) {
      return response.json();
    } else {
      return reject(`Код ошибки ${response.status} - текст ошибки ${response.statusText}`);
    }
  }

  getUserInfo() {
   return fetch(`${this.apiUrl}/users/me`, {
     headers: this.headers
   })
     .then((response) => this._checkRequest(response))
  }

  getInitialCards() {
    return fetch(`${this.apiUrl}/cards`, {
      headers: this.headers
    })
      .then((response) => this._checkRequest(response))
  }

  setUserInfo(name, about) {
    return fetch(`${this.apiUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((response) => this._checkRequest(response))
  }

  addNewCard(name, link) {
    return fetch(`${this.apiUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((response) => this._checkRequest(response))
  }

  deleteCard(idCard) {
    return fetch(`${this.apiUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((response) => this._checkRequest(response))
  }

  addLikeCard(idCard) {
    return fetch(`${this.apiUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then((response) => this._checkRequest(response))
  }

  deleteLikeCard(idCard) {
    return fetch(`${this.apiUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((response) => this._checkRequest(response))
  }

  setAvatarInfo(avatar) {
    return fetch(`${this.apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((response) => this._checkRequest(response))
  }
}

