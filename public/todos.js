const {
    fetchLogIn,
    fetchLoginStatus,
    fetchTodos,
    fetchNewMessage,
} = require('./services');

const app = {
    pollID: null,
    isLoggedIn: false,
    message: [],
    error: '',
}

function renderLogin( show ) {
    const login = document.querySelector('.login');
    if(show) {
        login.innerHTML =   `
         <label>Username: <input/></label>
         <button class="to-login" type="button">Login</button>
        `;
    } else {
        login.innerHTML = ``;
    }
}

function renderError(error) {
    document.querySelector('.status').innerHTML = text;
}

function poll( shouldPoll ) {
    if( shouldPoll && !app.pollId ) {
        app.pollId = setInterval( () => {
            fetchTodos()
            .catch( () => {
             app.error = 'this should be a real error message';
             renderPage();
            })
            .then( list => {
             app.error = '';
             app.todos = list;
             renderPage();
            });
        }, 3000);
    } // For when a user logs out:


    if (!shouldPoll && app.pollId) {
      clearTimeout(app.pollId);
      app.pollId = null;
    }
}


function renderMessage( message ) {
    const messages = document.querySelector('.todos');
    messages.innerHTML = message.map( (item) => `<li>${item}</li>` ).join('');
}


function renderPage() {
    if(!app.isLoggedIn) {
        renderLogin( true );
        renderMessage( [] );
    } else {
        renderLogin( false );
        renderMessage( app.message );
    }
    renderError( app.error );
}

const login = document.querySelector('login');
login.addEventListener('click', (e) => {
    if(!e.target.classList.contains('to-login')) {
        return ;
    }
    

    const username = login.querySelector('input').value;
    fetchLogIn(username) 
    .then( (messageList) => {
        app.isLoggedIn = true;
        app.message = messageList;
        app.error = '';
        poll(true);
        renderPage();
    })
    .catch( () => {
        app.error = 'Login failed';
        renderPage();
    });
});


// Initial loading
fetchLoginStatus()
.then( () => {
    app.isLoggedIn = true;
    poll(true);
    renderPage();
})
.catch( () => {
    app.isLoggedIn = false;
    renderPage();
});


const task = document.querySelector('.add-message');
task.addEventListener('click', (e) => {
    if(e.target.classList.contains('send')) {
        const username = username;
    }
})





