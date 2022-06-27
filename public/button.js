// const edit = document.querySelector('#edit');
const deleteButton = document.querySelector('#deleteButton');
const editButton = document.querySelector('#editButton');
editButton.addEventListener('click', _ =>{
    fetch ('',{
        method: 'put',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
        })
    })
    .then(res =>{
        if(res.ok)return res.json()
    })
    .then(response =>{
        window.location.reload(true);
    })
})
deleteButton.addEventListener('click', _ =>{
    fetch ('',{
        method: 'delete',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            
        })
    })
    .then(res =>{
        if(res.ok)return res.json()
    })
    .then(response =>{
        window.location.reload(true);
    })
})