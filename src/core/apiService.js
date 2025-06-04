const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "b71db5e8-caa7-425b-948f-03c1ab4b88bc",
    "Content-Type": "application/json",
  },
};

const handleRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleRequest);
}

function getUsers() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleRequest);
}

function updateProfileInfo(profileName, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  }).then(handleRequest);
}

function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(handleRequest);
}

function addNewPost(newCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCard),
  }).then(handleRequest);
}

function deletePost(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRequest);
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleRequest);
}

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRequest);
}

export {
  getCards,
  getUsers,
  updateProfileInfo,
  updateAvatar,
  addNewPost,
  deletePost,
  addLike,
  removeLike,
};
