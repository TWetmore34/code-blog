const addComment = document.getElementById('comment');
const commentContent = document.getElementById('comment-content')

// post request adds new comment
addComment.addEventListener('click', async () => {
    const newComment = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            content: commentContent.value,
            post_id: commentContent.dataset.postid
        }),
        headers: { 'content-type': 'application/json' }
    });
    if(newComment.ok){
        document.location.reload()
    } else {
        console.log('didnt work')
    }
})