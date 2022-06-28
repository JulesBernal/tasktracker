// const edit = document.querySelector('#edit');
const deleteButton = document.querySelector('.deleteButton');
const delBut = document.querySelectorAll('.deletebutton');
const editButton = document.querySelector('.editButton');

const editText = document.querySelector('#taskInput');

window.onload = function() {
    const elements = document.getElementsByClassName('deleteButton');
    for (const element of elements) {
        element.addEventListener("click", e => {
            const deleteValue=e.originalTarget.parentNode.firstElementChild.outerText;
            fetch ('/post-lists',{
                method: 'delete',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    taskEntry: deleteValue
                })
            }) 
            .then(res =>{
                if(res.ok)return res.json()
            })
            .then(response =>{
                window.location.reload(true);
            })
            .catch(console.error);
        })
    }
    const editV = document.getElementsByClassName('editButton');
    for (const element of editV) {
        element.addEventListener("click", e => {
            const EditValue=e.originalTarget.parentNode.firstElementChild.outerText;
            fetch ('/post-lists',{
                method: 'put',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    taskEntryOriginal: EditValue,
                    taskEntryEdit:editText.value
                })
            }) 
            .then(res =>{
                if(res.ok)return res.json()
            })
            .then(response =>{
                window.location.reload(true);
            })
            .catch(console.error);
        })
    }
}