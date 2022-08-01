const updateEl = document.getElementById('update');
const commentId  = document.getElementById('comment').dataset.comment
console.log(updateEl)
console.log(`/api/comments/` + commentId)
updateEl.addEventListener('click', async () => {
    console.log(document.getElementById('comment').value)
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
})