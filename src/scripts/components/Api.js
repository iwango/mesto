export default class Api {
  constructor(options) {
    // тело конструктора
    this.apiUrl = options.baseUrl;
    this.token = options.headers.authorization;

  }

  _checkRequest(response) {
    if(response.ok) {
      console.log(response);
      return response.json();
    } else {
      return Promise.reject(`Код ошибки ${response.status} - текст ошибки ${response.statusText}`);
    }
  }

  getUserInfo() {
   return fetch(`${this.apiUrl}/users/me`, {
     headers: {
       authorization: this.token
     }
   })
     .then((response) => this._checkRequest(response))
/*     .then((result) => {
       console.log(result, 22);
       console.log(result.name, result.about);
       return result
     })*/

  }


  getInitialCards() {
    return fetch(`${this.apiUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then((response) => this._checkRequest(response))
/*      .then((result) => {
        console.log(result);
      })*/
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
      .then((response) => this._checkRequest(response));
  }

  // другие методы работы с API
}

