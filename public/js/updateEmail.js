const updateEl = document.getElementById('submit');
const emailEl = document.getElementById('email');
const emailParent = document.getElementById('email-parent')

console.log(emailParent.children)

updateEl.addEventListener('click', (e) => {
    e.stopPropagation()
    // grab current email for input value
    const email = emailEl.innerHTML
    // create and replace email element
    const emailUpdate = document.createElement('input');
    emailUpdate.setAttribute('value', email)
    emailParent.children[0].replaceChild(emailUpdate, emailEl)

    // create new button element
    const updateButton = document.createElement('button')
    updateButton.classList.add('btn', 'btn-secondary', 'inline')
    emailParent.replaceChild(updateButton, updateEl)
    updateButton.innerHTML = 'Update'
    console.log(updateButton)

    updateButton.addEventListener('click', () => {
        fetch('/api/users/email', {
            method: 'PUT',
            body: JSON.stringify({ 
                email: emailUpdate.value,
             }),
            headers: { 'content-type': 'application/json' },
        })
    })
});