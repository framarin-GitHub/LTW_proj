import helpers from './helpers';
import classes from './classes';
import {format, isToday, parseISO} from "date-fns";
import remove_icon_src from './icons/recycle-bin.png';
import $ from 'jquery';


const builder = (()=>{

let members_arr = []
/*
create the form for the new group
*/
const createGroupForm = (id_parent, id_form) => {
    helpers.deleteAllChildrenById(`${id_parent}`)
    const form = document.createElement('form')
    const parent = document.getElementById(`${id_parent}`)
    form.setAttribute('id', `${id_form}`)
    form.addEventListener('submit', (e)=>{e.preventDefault()})
    parent.append(form)
    form.classList.add('form')

    helpers.factoryHtmlElement('div', `${id_form}`, `${id_form}-group-div`, 'form-group')
    const group_title_lbl = helpers.factoryHtmlElement('label', `${id_form}-group-div`, `${id_form}-group-lbl`, 'label')
    group_title_lbl.setAttribute('for','group')
    helpers.setTextContentById(`${id_form}-group-lbl`,'group')
    const input_group_title = helpers.factoryHtmlElement('input', `${id_form}-group-div`, `${id_form}-group-input`, 'input')
    input_group_title.setAttribute('type', 'text')
    input_group_title.setAttribute('name','group')     
    input_group_title.setAttribute('value', 'new group name')


    const add_member_button = document.createElement('button')
    add_member_button.setAttribute('id', `${id_form}-add-button`)
    add_member_button.setAttribute('class', `btn btn-primary add`)    
    add_member_button.addEventListener('click', clickListenerAddMember)
    form.append(add_member_button)
    helpers.setTextContentById(`${id_form}-add-button`,'+ add member')
     
    const submit_button = document.createElement('button')
    submit_button.setAttribute('id', `${id_form}-submit-button`)
    submit_button.setAttribute('class', `btn btn-primary submit`)    
    submit_button.setAttribute('form',`${id_form}`)
    submit_button.addEventListener('click', clickListenerCreateGroup)
    form.append(submit_button)
    helpers.setTextContentById(`${id_form}-submit-button`,'done')

    const card_div = helpers.factoryHtmlElement('div','central-div-grid','group-card-div','card text-center')
    const card_div_title = helpers.factoryHtmlElement('h5','group-card-div','group-card-title','card-title')
    const card_div_body = helpers.factoryHtmlElement('div','group-card-div','group-card-body','card-body')
    helpers.setTextContentById('group-card-title','your members')
    
    return form
}
/*
create the form for the new group
*/
function clickListenerCreateGroup(e){
    const form = document.getElementById('create-group-form')
    const form_data = new FormData(form)
    let group_title;
    for(let x of form_data){
        if (x[0] === "group" && x[1] != ''){
            group_title = `${x[1]}`
        }
    }
    let group = new classes.Group(group_title, members_arr)
    members_arr = []
    classes.group_array.unshift(group)
    helpers.deleteAllChildrenById('header-ul-dropdown')
    buildDropdown()
    buildGrid(classes.task_array)
}    
function clickListenerRemoveMember(e){
    let button = e.target.parentNode
    let div_parent = button.parentNode
    let member_to_rem = div_parent.textContent
    let index = members_arr.indexOf(`${member_to_rem}`)
    let div_container = div_parent.parentNode
    members_arr.splice(index,1)
    div_container.removeChild(div_parent) 
}
/*
add the new member to the list 
*/
function submitListenerAddMember(e){
    e.preventDefault()
    let length = members_arr.length
    let form = e.target
    let form_data = new FormData(form)
    let new_member
    for(let x of form_data){
        if (x[0] === "member" && x[1] != ''){
            new_member = `${x[1]}`
        }
    }
    let index = members_arr.indexOf(new_member)
    if(index < 0){
        members_arr.push(new_member)
        helpers.deleteAllChildrenById(`group-card-member-div-${length}`)
        let p = helpers.factoryHtmlElement('p', `group-card-member-div-${length}`, `group-card-member-p-${length}`)
        helpers.setTextContentById(`group-card-member-p-${length}`,`${members_arr[length]}`)
        let remove_button = helpers.factoryHtmlElement('button', `group-card-member-div-${length}`, `group-card-remove-${length}`, 'btn button')
        document.createElement('button')
        const remove_icon = new Image();
        remove_icon.src = remove_icon_src
        remove_icon.setAttribute('class','icon')
        remove_icon.addEventListener('click',clickListenerRemoveMember)
        remove_button.append(remove_icon)
    }
    else{
        const group_body = document.getElementById(`group-card-member-div-${length}`)
        group_body.removeChild(form)
    }

}  
/*
create the form for the new member
*/   
function clickListenerAddMember(e){
    const member_div = helpers.factoryHtmlElement('div', 'group-card-body',`group-card-member-div-${members_arr.length}`,'card-text member-div')
    const form = document.createElement('form')
    form.setAttribute('id',`group-card-add-form-${members_arr.length}`)
    form.addEventListener('submit', submitListenerAddMember)
    member_div.append(form)
    
    const input_member = helpers.factoryHtmlElement('input', `group-card-add-form-${members_arr.length}`, `group-card-input-${members_arr.length}`)
    input_member.setAttribute('type', 'text')
    input_member.setAttribute('name','member')
}
/*
replace the old task with new info
*/
function clickListenerEditTask(e){
    let index = e.target.id.slice(-1)
    const form = document.getElementById(`edit-form-${index}`)
    const form_data = new FormData(form)

    let title,group_title,description,date;
    const select = document.getElementById(`edit-form-${index}-select`)
    group_title = select.value
    for (let x of form_data){
        if (x[0] === "title")
            title = x[1]
        if (x[0] === "group")
            group_title = x[1]
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
    const to_add_task = new classes.Task(title, group_title, description, date, false)
    classes.task_array[index] = to_add_task
    buildGrid(classes.task_array)
}
/*
create the form for the new task
*/
function clickListenerCreateTask(e){
    let index = classes.task_array.length
    const form = document.getElementById('create-new-task-form')
    const form_data = new FormData(form)
    let title,group_title,description,date;
    const select = document.getElementById('create-new-task-form-select')
    group_title = select.value
    for (let x of form_data){
        if (x[0] === "title")
            title = x[1]
        if (x[0] === "description")
            description = x[1]
        if (x[0] === "group"){
            group_title = x[1]
        }
        if (x[0] === "date") {
            let splittedDate = x[1].split('-')
            if(x[1] === '') {
                splittedDate = ['1901','01','01']
            }
            date = format(new Date(splittedDate[0], (splittedDate[1]-1), splittedDate[2]), 'dd/MM/yyyy')
        }
    }
    const to_add_task = new classes.Task(title, group_title, description, date, false)
    classes.task_array.push(to_add_task)
    buildGrid(classes.task_array)
}
/*
create the form for editing task
*/
function clickEditButton(index){
    helpers.deleteAllChildrenById(`card-div-${index}`)
    const edit_form = helpers.factoryTaskForm(`card-div-${index}`,`edit-form-${index}`,classes.task_array[index])
    const submit_button = document.createElement('button')
    submit_button.setAttribute('id', `edit-button-form-${index}`)
    submit_button.setAttribute('class', `btn btn-primary submit`)    
    submit_button.setAttribute('form',`edit-form-${index}`)
    submit_button.addEventListener('click', clickListenerEditTask)
    edit_form.append(submit_button)
    helpers.setTextContentById(`edit-button-form-${index}`,'done')
}
function clickDeleteButton(index){
    classes.task_array.splice(index , 1)
    buildGrid(classes.task_array)
}
function clickStatusButton(index){
    classes.task_array[index].toggleDone()
    buildGrid(classes.task_array)
}
/*
manage the click events occuring in the cards inside the grid
*/
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
    if(e.target && e.target.matches(".card-body , .card-title, .card-text")){
        let card_id = e.target.id
        let index = card_id.slice(-1)
        $(`#card-div-${index}`).toggleClass('card-animation');
        $('#central-div-grid').toggleClass('central-grid-animation');
    }
    if(e.target && e.target.matches(".mini-title")){
        let target_id = e.target.id
        let card_element = e.target.parentNode
        card_element.classList.remove('card-mini')
        helpers.deleteAllChildrenById(card_element.id)
        let index = target_id.slice(-1)
        card_element.id = `card-div-${index}`
        helpers.factoryTaskCard(index,classes.task_array[index],card_element.id)
    }
}
/*
manage the click events occuring in the header navbar
*/
function headerClickEventDelegation(e){
    if(e.target){
        if(e.target.matches("#header-li-1,#header-list-a-1")){
            buildGrid(classes.task_array)
        }
        if(e.target.matches("#header-li-2,#header-list-a-2")){
            const create_group_form = createGroupForm('central-div-grid','create-group-form')
        }
        if(e.target.matches("#header-li-3,#header-list-a-3")){
            const create_new_task_form = helpers.factoryTaskForm('central-div-grid','create-new-task-form',null)
            const submit_button = document.createElement('button')
            submit_button.setAttribute('id', 'create-new-task-form-submit-button')
            submit_button.setAttribute('class', `btn btn-primary submit`)    
            submit_button.setAttribute('form',`create-new-task-form`)
            submit_button.addEventListener('click', clickListenerCreateTask)
            create_new_task_form.append(submit_button)
            helpers.setTextContentById('create-new-task-form-submit-button','done')
        }
        if(e.target.matches("#header-ul-dropdown a")){
            let target_id = e.target.id.slice(-1)
            let selected_group = classes.group_array[target_id]
            let array_filtered = classes.task_array.filter((t) => t.group_title === `${selected_group.group_title}`)
            buildGrid(array_filtered,true)
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
function footerBuilder(){
    const header_nav = helpers.factoryHtmlElement('nav','hook','footer-nav','navbar navbar-expand-lg navbar-dark bg-dark')
    const header_ul = helpers.factoryHtmlElement('ul','footer-nav','footer-ul','navbar-nav')
    const header_li1 = helpers.factoryHtmlElement('li','footer-ul','footer-li-1','nav-item')
    const header_li2 = helpers.factoryHtmlElement('li','footer-ul','footer-li-2','nav-item')
    const header_li3 = helpers.factoryHtmlElement('li','footer-ul','footer-li-3','nav-item')
    helpers.setTextContentById('footer-li-1','add some text here')
}
/*
display the events card based on the given array
*/
function buildGrid(task_array_to_build,group_page = false){
    helpers.deleteAllChildrenById('central-div-grid')
    let c = 0
    if(group_page){
        buldGroupLatBar(task_array_to_build[0].group_title)
        for(let t of task_array_to_build){
            helpers.factoryMinifiedCard(c++,t)
        }
    }
    else{
        for(let t of task_array_to_build){
            helpers.factoryTaskCard(c++,t)
        }
    }
}
/*
display group titles in the dropdown menu
*/
function buildDropdown(){
    let counter = 0
    for(let x of classes.group_array){
        const header_li_dropdown = helpers.factoryHtmlElement('li','header-ul-dropdown',`header-li-dropdown-${counter}`)
        const header_a_dropdown = helpers.factoryHtmlElement('a',`header-li-dropdown-${counter}`,`header-a-dropdown-${counter}`,'dropdown-item')
        helpers.setTextContentById(`header-a-dropdown-${counter}`,`${x.group_title}`)
        counter++
    }
}
function buildGroupLatBar(group_title){
    //to implement lateral bar with membbers and logic
}

    const html_build = () => {
        const content_div = helpers.createHookContent();
        headerBuilder();
        const central_grid = document.createElement('div')
        central_grid.setAttribute('id', 'central-div-grid')
        central_grid.addEventListener('click',gridClickEventDelegation)
        content_div.append(central_grid)
        let example = new classes.Task("title.example","group.example","desc.example desc.example desc.example desc.example","00-00-0000",true)
        classes.task_array.unshift(example)
        buildGrid(classes.task_array)
        footerBuilder()
    }
return {html_build}
})();
export default builder