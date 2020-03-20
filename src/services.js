/* eslint-disable prefer-promise-reject-errors */
export function fetchLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      'username': username,
      'action': 'login',
    }),
  })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (response) => {
        if (!response.ok) {
          return response.json().then( (result) => Promise.reject(result) );
        }
        return response.json();
      });
};

export function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET',
  })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (response) => {
        if (!response.ok) {
          return Promise.reject({code: 'login-invalid'});
        }
        return response.json();
      });
};


export function fetchLogout() {
  return fetch('/session', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: {
      'username': username,
      'action': 'logout',
    },
  })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (response) => {
        if (!response.ok) {
          return Promise.reject( {code: 'logout-failure'});
        }
        return response.json();
      });
};

export function fetchTodos() {
  return fetch('/message', {
    method: 'GET',
  })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (response) => {
        if (!response.ok) {
          return response.json().then( (result) => Promise.reject(result) );
        }
        return response.json();
      });
};

export function fetchNewMessage(task) {
  return fetch('/message', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: {
      'username': task.username,
      'time': task.time,
      'messageBody': task.body,
    },
  })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then( (result) => Promise.reject(result));
        }

        return response.json();
      });
};

