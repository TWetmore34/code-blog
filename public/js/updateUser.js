const updateEl = document.getElementById('submit');
const emailEl = document.getElementById('email');
const emailParent = document.getElementById('email-parent')

// updates email
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

    updateButton.addEventListener('click', (e) => {
        fetch('/api/users/email', {
            method: 'PUT',
            body: JSON.stringify({ 
                email: emailUpdate.value,
             }),
            headers: { 'content-type': 'application/json' },
        })
    })
});

// add new post
const postButton = document.getElementById('post');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');


postButton.addEventListener('click', async (e) => {

    const newPost = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle.value,
            post_content: postContent.value,
        }),
        headers: { 'content-type': 'application/json' }
    })
    if(newPost.ok) {
        document.location.replace('/dashboard')
    } 
});

// delete post
// dom vars
const deleteEl = document.querySelectorAll('.delete-me');
if(deleteEl) {
    for(i = 0;i < deleteEl.length; i++){
        deleteEl[i].addEventListener('click', async (e) => {
            e.preventDefault()
            const deleted = await fetch(`/api/posts/${e.target.id}`, {
                method: 'DELETE'
            })
            if(deleted.ok){
                document.location.replace('/dashboard')
            }
        })
    }
};

// update post
