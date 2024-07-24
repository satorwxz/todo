const form=document.querySelector('#form');
const list=document.querySelector('#list');
const required=document.querySelector('#required');
const textField=document.querySelector('#textField');



let todos=[
    {
        id:"1",
        title:"Buy groceries",
        required:true
    },
    {
        id:"2",
        title:"Read book",
        required:false
    },
    {
        id:"3",
        title:"Write report",
        required:true
    },
]

let todo={}


const handleShow = (arr)=>{
    list.innerHTML=arr.map(todo => {
        return`
        <div class="todo-wrapper" id=${todo.id}>
            <div class="todo-box">
                 <h4>${todo.title}</h4>
                 <div class="btn-wrapper">
                 <h5 style="margin-right:10px ">${todo.required ? 'Required' : ''}</h5>
                 <button class="btn btn-primary edit-btn">Edit</button>
                 <button class="btn btn-danger delete-btn">Delete</button>
                 </div>
             </div>
        </div>
        `
    }).join('')

    let editBtns=document.querySelectorAll('.edit-btn');
    editBtns.forEach((btn)=>{
        btn.addEventListener('click',(event)=>{
            const id=event.target.closest('.todo-wrapper').id;
            let todoCurrent=todos.find(el=>el.id === id);
            textField.value=todoCurrent.title;
            required.checked=todoCurrent.required
            todo=todoCurrent
        })
    })
    let deleteBtns=document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn)=>{
        btn.addEventListener('click',(event)=>{
            const id = event.target.closest('.todo-wrapper').id;
            todos = todos.filter(el => el.id !== id);
            handleShow(todos);
            })

        })

}

handleShow(todos)




form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(!todo.id){

    const todoData={
        id: (Math.round(Math.random() * 100) + textField.value[2]).toString(),
        required:required.checked,
        title: textField.value,
    };
    todos=[todoData,... todos]

}else{
        let editedTodo= {
            ...todo,
            required: required.checked,
            title: textField.value,
        }
    todos=todos.map(el =>  el.id === editedTodo.id ? editedTodo : el)
}
    textField.value=''
    required.checked=false
    handleShow(todos)


})

