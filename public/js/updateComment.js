const updateEl = document.getElementById('update');
const commentId  = document.getElementById('comment').dataset.comment

// update comment
updateEl.addEventListener('click', async () => {

    const updated = await fetch(`/api/comments/` + commentId, {
        method: 'PUT',
        body: JSON.stringify({
            content: document.getElementById('comment').value,
        }),
        headers: { "content-type": "application/json" }
    });
    if(updated.ok){
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update comment')
    }
});
