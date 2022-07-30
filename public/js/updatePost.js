const updatePost = document.getElementById('update-post');

updatePost.addEventListener('click', async (e) => {
    e.preventDefault()
    const updated = await fetch(`/api/posts/${e.target.dataset.postid}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: document.getElementById('post-title').value,
            post_content: document.getElementById('post-content').value
        }),
        headers: { "content-type": "application/json" }
    })
    if(updated.ok){
        document.location.replace('/dashboard')
    }
});