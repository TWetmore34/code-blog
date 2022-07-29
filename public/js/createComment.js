const addComment = document.getElementById('comment');
const commentContent = document.getElementById('comment-content')

addComment.addEventListener('click', async () => {
    console.log(commentContent.value)
    const newComment = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            content: commentContent.value,
            post_id: commentContent.dataset.postid
        }),
        headers: { 'content-type': 'application/json' }
    });
    if(newComment){
        document.location.reload()
    } else {
        console.log('didnt work')
    }
})