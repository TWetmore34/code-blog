const email = document.getElementById('email');
const userName = document.getElementById('username');
const password = document.getElementById('password');
const submitEl = document.getElementById('create-user');

// add new user
async function createUser () {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            name: userName.value,
            password: password.value
        }),
        headers: { 'content-type': 'application/json' }
    })
    if(response.ok) {
        document.location.replace('/dashboard')
    }
}

submitEl.addEventListener('click', createUser)