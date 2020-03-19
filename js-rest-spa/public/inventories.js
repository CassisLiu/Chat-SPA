(function iife() {
    const list = document.querySelector('.items');
    const status = document.querySelector('.status');
    const add = document.querySelector('.add');
    const loginPanel = document.querySelector('.login-panel');
    const displayPanel = document.querySelector('.display-panel');
    const username = document.querySelector('.username');
    const logoutPanel = document.querySelector('.logout-panel');
    const itemName = document.querySelector('.add-name');
    const itemAmount = document.querySelector('.add-amount');
    let userName;
    const errMessage = {
        'duplicate': 'That item already exists',
        'network-error': 'There was a problem connecting to the network, try again',
        //'Illegal-name': 'The input user name is not valid'
      };


    fetch(`/item/`, {
        method: 'GET',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError )
        .then( items => {
          renderItems(items);
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errMessage[err.error] || err.error);
        });
    


    list.addEventListener('click', (e) => {
       
        if(e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            fetch(`/item/${id}`, {
                method: 'DELETE',
            })
            .catch( () => Promise.reject( {error: 'network-error'}))
            .then( convertError )
            .then( items => {
                renderItems(items);
                updateStatus('');
            })
            .catch( err => { 
                updateStatus(errMessage[err.error] || err.error);
            })
        } else if (e.target.classList.contains('update')) {
            const updatedAmout = document.querySelector('.amount');
            console.log("ddd");
            const id = e.target.dataset.id;
            fetch(`/item/${id}`, {
                method: 'PUT',
                body: JSON.stringify({"amount": updatedAmout.value}),
                headers: { "Content-Type": "application/json"}
            })
            .catch( err => {
                updateStatus(errMessage[err.error] || err.error);
            })
            .then(items => renderItems(items));
        }  

    });

    add.addEventListener('click', e => {
        const name = itemName.value;
        const amount = itemAmount.value;
        itemName.value = '';
        itemAmount.value = '';
        fetch(`/item/${name}`, {
            method: 'POST',
            body: JSON.stringify({
                "name":name,
                "amount":amount,
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .catch( () => Promise.reject( {error: 'network-error'}) )
        .then( convertError )
        .then( )
        .then( items => {
            renderItems(items);
            updateStatus('');
        })
        .catch( err => {
            updateStatus(errMessage[err.error] || err.error);
        });
    })

    loginPanel.addEventListener('click', (e) => {
        if(e.target.classList.contains('login')) {
            userName = username.value;
            console.log(userName);
            fetch( `/session/`, {
                method: 'POST',
                body: JSON.stringify({
                    "name": userName,
                    "type": "login"
                }),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .catch( () => Promise.reject( {error: 'network-error'}))
            .then( convertError )
            .then(()=> {
                loginPanel.style.visibility = "hidden";
                displayPanel.style.visibility = "visible";
                logoutPanel.style.visibility = "visible";
            })
            .catch( err => { 
                updateStatus(errMessage[err.error] || err.error);
            })
        }
    })

    // logout.addEventListener('click', (e) =>{
    //     fetch('/session', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             "name": userName,
    //             "type": "logout"
    //         }) ,
    //         headers: { "Content-Type":"application/json" }
    //     })
    //     .then( () => {
    //         username.value = '';
    //         userName = '';
    //     })
    // })

    function renderItems(items) {
        console.log(items);
        const html =  items.map( 
            item => 
            `    <li>
                  <span class="name">${item.name}</span>
                  <input type="number" class="amount" value = ${item.amount}>
                  <button class="update" type="button" data-id=${item.id}> Update </button>
                  <button class="delete" type = "button" data-id=${item.id}> X </button>
                </li>
            `
        ).join(''); 
        console.log();
        list.innerHTML = html;
    }

    function convertError(res) {
        if(res.ok) {
            return res.json();
        }
        return res.json()
        .then (err => Promise.reject(err));
    }

    function updateStatus( message ) {
        status.innerText = message;
    } 

})();   
