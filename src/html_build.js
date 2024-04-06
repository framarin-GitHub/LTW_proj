import helpers from './helpers'
import task from './task'
import {format, isToday, parseISO} from "date-fns";

function clickEditButton(index){
    helpers.deleteAllChildrenById(`card-div-${index}`)
    const edit_form = helpers.factoryTaskForm(`card-div-${index}`,`edit-form-${index}`,task.task_array[index])
    const submit_button = document.createElement('button')
    submit_button.setAttribute('id', `edit-button-form-${index}`)
    submit_button.setAttribute('class', `btn btn-primary submit`)    
    submit_button.setAttribute('form',`edit-form-${index}`)
    submit_button.addEventListener('click', clickListenerEditTask)
    edit_form.append(submit_button)
    helpers.setTextContentById(`edit-button-form-${index}`,'done')
}
function clickListenerEditTask(e){
    let index = e.target.id.slice(-1)
    const form = document.getElementById(`edit-form-${index}`)
    const form_data = new FormData(form)

    let title,group,description,date;
    const select = document.getElementById(`edit-form-${index}-select`)
    group = select.value
    for (let x of form_data){
        if (x[0] === "title")
            title = x[1]
        if (x[0] === "group")
            group = x[1]
        if (x[0] === "description")
            description = x[1]
        if (x[0] === "date") {
            let splittedDate = x[1].split('-')
            if(x[1] === '') {
                splittedDate = ['1901','01','01']
            }
            date = format(new Date(splittedDate[0], (splittedDate[1]-1), splittedDate[2]), 'dd/MM/yyyy')
        }
    }
    const to_add_task = new task.Task(title, group, description, date, false)
    task.task_array[index] = to_add_task
    buildGrid(task.task_array)
}
function clickListenerCreateTask(e){
    let index = task.task_array.length
    const form = document.getElementById('create-new-task-form')
    const form_data = new FormData(form)
    let title,group,description,date;
    const select = document.getElementById('create-new-task-form-select')
    group = select.value
    for (let x of form_data){
        if (x[0] === "title")
            title = x[1]
        if (x[0] === "description")
            description = x[1]
        if (x[0] === "group"){
            group = x[1]
        }
        if (x[0] === "date") {
            let splittedDate = x[1].split('-')
            if(x[1] === '') {
                splittedDate = ['1901','01','01']
            }
            date = format(new Date(splittedDate[0], (splittedDate[1]-1), splittedDate[2]), 'dd/MM/yyyy')
        }
    }
    const to_add_task = new task.Task(title, group, description, date, false)
    task.task_array.push(to_add_task)
    buildGrid(task.task_array)
}
function clickListenerCreateGroup(e){
    const form = document.getElementById('create-group-form')
    const form_data = new FormData(form)
    for(let x of form_data){
        if (x[0] === "group" && x[1] != ''){
            task.group_array.unshift(`${x[1]}`)
        }
    }
    helpers.deleteAllChildrenById('header-ul-dropdown')
    buildDropdown()
    buildGrid(task.task_array)
}
function clickDeleteButton(index){
    task.task_array.splice(index , 1)
    buildGrid(task.task_array)
}
function clickStatusButton(index){
    task.task_array[index].toggleDone()
    buildGrid(task.task_array)
}
function gridClickEventDelegation(e){
    if(e.target && e.target.matches(".card .icon")){
        const target_button = e.target.parentNode
        let target_id = target_button.id
        let index = target_id.slice(-1)

        if(target_button.matches(".button.edit")){
            clickEditButton(index)
        }
        if(target_button.matches(".button.delete")){
            clickDeleteButton(index)
        }
        if(target_button.matches(".button.status")){
            clickStatusButton(index)
        }
    }
}
function headerClickEventDelegation(e){
    if(e.target){
        if(e.target.matches("#header-li-1,#header-list-a-1")){
            buildGrid(task.task_array)
        }
        if(e.target.matches("#header-li-2,#header-list-a-2")){
            const create_group_form = helpers.createGroupForm('central-div-grid','create-group-form')
            const submit_button = document.createElement('button')
            submit_button.setAttribute('id', 'create-group-button-form')
            submit_button.setAttribute('class', `btn btn-primary submit`)    
            submit_button.setAttribute('form',`create-group-form`)
            submit_button.addEventListener('click', clickListenerCreateGroup)
            create_group_form.append(submit_button)
            helpers.setTextContentById('create-group-button-form','done')
        }
        if(e.target.matches("#header-li-3,#header-list-a-3")){
            const create_new_task_form = helpers.factoryTaskForm('central-div-grid','create-new-task-form',null)
            const submit_button = document.createElement('button')
            submit_button.setAttribute('id', 'create-new-button-form')
            submit_button.setAttribute('class', `btn btn-primary submit`)    
            submit_button.setAttribute('form',`create-new-task-form`)
            submit_button.addEventListener('click', clickListenerCreateTask)
            create_new_task_form.append(submit_button)
            helpers.setTextContentById('create-new-button-form','done')
        }
        if(e.target.matches("#header-ul-dropdown a")){
            let target_id = e.target.id.slice(-1)
            let selected_group = task.group_array[target_id]
            console.log(task.task_array) 
            let array_filtered = task.task_array.filter((t) => t.group === `${selected_group}`)
            buildGrid(array_filtered)
        }
    }
}
function headerBuilder(){
    const parent = document.getElementById('hook')
    const header_nav = document.createElement('nav')
    header_nav.setAttribute('id', 'header-nav')
    header_nav.setAttribute('class', 'navbar navbar-expand-lg navbar-dark bg-dark')
    header_nav.addEventListener('click', headerClickEventDelegation)
    parent.append(header_nav)
    
    const header_div1 = helpers.factoryHtmlElement('div','header-nav','header-div-1','container-fluid')
    const header_a = helpers.factoryHtmlElement('a','header-div-1','header-a','navbar-brand')
    header_a.setAttribute('href','#')
    helpers.setTextContentById('header-a','PLAN YOUT MEETINGS')
    const header_button = helpers.factoryHtmlElement('button','header-div-1','header-button','navbar-toggler')
    header_button.setAttribute('type','button')
    header_button.setAttribute('data-bs-toggle','collapse')
    header_button.setAttribute('data-bs-target','#navbarNavDropdown')
    header_button.setAttribute('aria-controls','navbarNavDropdown')
    header_button.setAttribute('aria-expanded','false')
    header_button.setAttribute('aria-label','Toggle navigation')
    const header_span = helpers.factoryHtmlElement('span','header-button','header-span','navbar-toggler-icon')
        
    const header_div_navbarNavDropdown = helpers.factoryHtmlElement('div','header-div-1','navbarNavDropdown','collapse navbar-collapse')
    const header_ul = helpers.factoryHtmlElement('ul','navbarNavDropdown','header-ul','navbar-nav')
    const header_li1 = helpers.factoryHtmlElement('li','header-ul','header-li-1','nav-item')
    const header_li2 = helpers.factoryHtmlElement('li','header-ul','header-li-2','nav-item')
    const header_li3 = helpers.factoryHtmlElement('li','header-ul','header-li-3','nav-item')
    const header_li4 = helpers.factoryHtmlElement('li','header-ul','header-li-4','nav-item dropdown')

    const header_list_a1 = helpers.factoryHtmlElement('a','header-li-1','header-list-a-1','nav-link active')
    const header_list_a2 = helpers.factoryHtmlElement('a','header-li-2','header-list-a-2','nav-link active')
    const header_list_a3 = helpers.factoryHtmlElement('a','header-li-3','header-list-a-3','nav-link active')
    header_list_a1.setAttribute('aria-current','page')
    header_list_a1.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-1','Home')
    header_list_a2.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-2','Create group')
    header_list_a3.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-3','Add Event')
    
    const header_list_a4 = helpers.factoryHtmlElement('a','header-li-4','header-list-a-4','nav-link dropdown-toggle')
    header_list_a4.setAttribute('href','#')
    header_list_a4.setAttribute('role','button')
    header_list_a4.setAttribute('data-bs-toggle','dropdown')
    header_list_a4.setAttribute('aria-expanded','false')
    helpers.setTextContentById('header-list-a-4','Groups')
    const header_ul_dropdown = helpers.factoryHtmlElement('ul','header-li-4','header-ul-dropdown','dropdown-menu')

    const header_div2 = helpers.factoryHtmlElement('div','header-nav','header-div-2','container-fluid')
    const header_sign_in = helpers.factoryHtmlElement('button', 'header-div-2', 'header-sign-in', 'btn btn-outline-light')
    helpers.setTextContentById('header-sign-in','sign in')
    const header_sign_up = helpers.factoryHtmlElement('button', 'header-div-2', 'header-sign-up', 'btn btn-dark')
    helpers.setTextContentById('header-sign-up','sign up')

}
function buildGrid(task_array_to_build){
    helpers.deleteAllChildrenById('central-div-grid')
    let c = 0
    //we can sort in various way, maybe from nearest to furthest
    for(let t of task_array_to_build){
        helpers.factoryTaskCard(c++,t)
    }
}
function footerBuilder(){
    const header_nav = helpers.factoryHtmlElement('nav','hook','footer-nav','navbar navbar-expand-lg navbar-dark bg-dark')
    const header_ul = helpers.factoryHtmlElement('ul','footer-nav','footer-ul','navbar-nav')
    const header_li1 = helpers.factoryHtmlElement('li','footer-ul','footer-li-1','nav-item')
    const header_li2 = helpers.factoryHtmlElement('li','footer-ul','footer-li-2','nav-item')
    const header_li3 = helpers.factoryHtmlElement('li','footer-ul','footer-li-3','nav-item')
}
function buildDropdown(){
    let counter = 0
    for(let x of task.group_array){
        const header_li_dropdown = helpers.factoryHtmlElement('li','header-ul-dropdown',`header-li-dropdown-${counter}`)
        const header_a_dropdown = helpers.factoryHtmlElement('a',`header-li-dropdown-${counter}`,`header-a-dropdown-${counter}`,'dropdown-item')
        helpers.setTextContentById(`header-a-dropdown-${counter}`,`${x}`)
        counter++
    }
}

const builder = (()=>{
    const html_build = () => {
        const content_div = helpers.createHookContent();
        headerBuilder();
        //refactor in a function to be more readable
            const central_grid = document.createElement('div')
            central_grid.setAttribute('id', 'central-div-grid')
            central_grid.addEventListener('click',gridClickEventDelegation)
            content_div.append(central_grid)
        //
        let example = new task.Task("title.example","group.example","desc.example desc.example desc.example desc.example","00-00-0000",true)
        task.task_array.unshift(example)
        buildGrid(task.task_array)
        footerBuilder()
    }
    return {html_build}
})();
export default builder