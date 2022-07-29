const logoutEl = document.getElementById('logout');

logoutEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const logout = await fetch('/api/users/logout', {
        method: 'POST'
    })
    if(logout.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to log out')
    }
});