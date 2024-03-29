class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me/`, {
            headers: this._headers
        })
        .then(res => this._checkResponse(res))
    }
    getInitialCards = () => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => this._checkResponse(res   ))     
    }
    editAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatarLink}`,
              }) 
        })
        .then(res => this._checkResponse(res))
    }
    editProfileInfo(profileName, profileInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${profileName}`,
                about: `${profileInfo}`
            }) 
        })
        .then(res => this._checkResponse(res))
    }
    
    postCard(CardName, CardLink) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: CardName,
                link: CardLink
              })    
        })
        .then(res => this._checkResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers 
        })
        .then(res => this._checkResponse(res))       
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers 
        })
        .then(res => this._checkResponse(res))
    }
    
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers 
        })
        .then(res => this._checkResponse(res))
    }    
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '93b16716-211e-48f0-82a0-2280c0edfbfa',
    'Content-Type': 'application/json'
  }
}); 