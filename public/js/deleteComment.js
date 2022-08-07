const deleteHandler = document.querySelectorAll('.delete')

if(deleteHandler) {
    for(i=0;i<deleteHandler.length;i++){
        deleteHandler[i].addEventListener('click', async (e) => {
            e.preventDefault()
            console.log(e.target.id)
            const response = await fetch(`/api/comments/${e.target.id}`, {
                method: 'DELETE',
            })
        })
    }
}
