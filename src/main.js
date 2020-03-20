// Import Method -- Seperation of Concerns
import {
  fetchLogIn,
  fetchLoginStatus,
  fetchTodos,
  fetchLogout,

} from './services';

const app = {
  'pollId': null,
  'isLoggedIn': false,
  'message': [],
  'error': '',
};

// ------------------------------------------------ //

//                Initial Loading                   //

fetchLoginStatus()
    .then(() => {
      app.isLoggedIn = true;
      startPoll();
      renderPage();
    })
    .catch(() => {
      app.isLoggedIn = false;
      renderPage();
    });

/**
 * @param {boolean} show abc
 */
function renderLogin(show) {
  const login = document.querySelector('.login');
  if (show) {
    login.innerHTML = `
         <label>Username: <input/></label>
         <button class="to-login" type="button">Login</button>
        `;
  } else {
    login.innerHTML = ``;
  }
}


function renderError(error) {
  document.querySelector('.status').innerHTML = error;
}


function startPoll() {
  if (app.pollId) {
    return;
  }
  app.pollId = setInterval(() => {
    fetchTodos()
        .catch(() => {
          app.error = 'this should be a real error message';
          renderPage();
        })
        .then((list) => {
          app.error = '';
          app.message = list;
          renderPage();
        });
  }, 3000);
}

function stopPoll() {
  clearTimeout(pollId);
  app.pollId = null;
}


function renderMessage(message) {
  const messages = document.querySelector('.message');
  messages.innerHTML = message.map((item) => `<li>${item}</li>`).join('');
}

function dispalyPage( display ) {
  const displayPanel = document.querySelector('.display-panel');
  displayPanel.style.visibility = display;
}

function renderPage() {
  if (!app.isLoggedIn) {
    renderLogin(true);
    renderMessage([]);
    dispalyPage( 'hidden' );
  } else {
    renderLogin(false);
    renderMessage(app.message);
    dispalyPage( 'visible' );
  }
  renderError(app.error);
}

// ---------------------------------------------------- //

//               ADD EVENT LISTERNER                    //

const login = document.querySelector('.login');
login.addEventListener('click', (e) => {
  if (!e.target.classList.contains('to-login')) {
    return;
  }


  const username = login.querySelector('input').value;
  fetchLogIn(username)
      .then((messageList) => {
        app.isLoggedIn = true;
        app.message = messageList;
        app.error = '';
        startPoll();
        renderPage();
      })
      .catch(() => {
        app.error = 'Login failed';
        renderPage();
      });
});

const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
  fetchLogout()
      .then(() => {
        app.isLoggedIn = false;
        app.message = [];
        app.error = '';
        stopPoll();
      })
      .catch(() => {
        app.error = 'Logout failed';
        renderPage();
      });
});


const task = document.querySelector('.add-message');
task.addEventListener('click', (e) => {
  if (e.target.classList.contains('send')) {
    const username = username;
  }
});


