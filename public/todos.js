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
        login
    }
}

function renderError(error) {

}

function poll( shouldPoll ) {

}


function renderMessage( message ) {

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
})
