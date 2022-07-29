const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');
const loginEl = document.getElementById('login-submit');

async function loginHandler () {
    console.log(emailLogin.value)
    console.log(passwordLogin.value)
    const loggedin = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: emailLogin.value,
            password: passwordLogin.value
        }),
        headers: { 'content-type': 'application/json' }
    })
    if(loggedin.ok){
        console.log('logged in!')
    }
};

loginEl.addEventListener('click', loginHandler)