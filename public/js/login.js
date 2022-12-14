const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');
const loginEl = document.getElementById('login-submit');

// post request for login attempt
async function loginHandler (e) {
    e.preventDefault()
    const loggedin = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: emailLogin.value,
            password: passwordLogin.value
        }),
        headers: { 'content-type': 'application/json' }
    })
    if(loggedin.ok){
        document.location.replace('/')
    } else {
        alert('Failed to log in')
    }
};

loginEl.addEventListener('click', loginHandler)