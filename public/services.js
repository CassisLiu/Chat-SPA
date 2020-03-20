module.exports = {  
  fetchLogIn: (username) => {
    return fetch('/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return response.json().then( result => Promise.reject(result) );
      }
      return response.json();
    });
  },

  fetchLoginStatus: () => {
    return fetch('/session', {
      method: 'GET',
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return Promise.reject({ code: 'login-invalid' });
      }
      return;
    });
  },

  fetchTodos: () => {
    return fetch('/todos', {
      method: 'GET',
    })
    .catch( () => {
      return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
      if(!response.ok) {
        return response.json().then( result => Promise.reject(result) );
      }
      return response.json();
    });
  },

 fetchNewMessage: (task) => {
  return fetch('/message', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: {
      "username": task.username,
      "time": task.time,
      "messageBody": task.body,
    }
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then(response => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result));
    }

    return response.json();
  })
}
}
