import helpers from './helpers';
import classes from './classes';
import {format, isToday, parseISO} from "date-fns"
import remove_icon_src from './icons/recycle-bin.png'
import $, { ajax } from 'jquery'
import builder from './html_build'
const el = (() => {
    let members_arr = []
    let active_big_card = ''
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

        helpers.factoryHtmlElement('div', `${id_form}`, `${id_form}-group-div`, 'form-floating')
        const input_group_title = helpers.factoryHtmlElement('input', `${id_form}-group-div`, `${id_form}-group-input`, 'input form-control')
        input_group_title.setAttribute('type', 'text')
        input_group_title.setAttribute('name','group')     
        input_group_title.setAttribute('value', 'new group name')
        const group_title_lbl = helpers.factoryHtmlElement('label', `${id_form}-group-div`, `${id_form}-group-lbl`, 'label')
        group_title_lbl.setAttribute('for','group')
        helpers.setTextContentById(`${id_form}-group-lbl`,'group')


        const add_member_button = document.createElement('button')
        add_member_button.setAttribute('id', `${id_form}-add-button`)
        add_member_button.setAttribute('class', `btn btn-secondary add`)    
        add_member_button.addEventListener('click', clickListenerAddMember)
        form.append(add_member_button)
        helpers.setTextContentById(`${id_form}-add-button`,'+ add member')
        
        const submit_button = document.createElement('button')
        submit_button.setAttribute('id', `${id_form}-submit-button`)
        submit_button.setAttribute('class', `btn btn-secondary submit`)    
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
        builder.buildGrid(classes.task_array)
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
    create the form for the new task
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
        active_big_card = ''
        builder.buildGrid(classes.task_array)
    }

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
        builder.buildGrid(classes.task_array)
    }
    function clickEditButton(index){
        helpers.deleteAllChildrenById(`card-div-${index}`)
        const edit_form = helpers.factoryTaskForm(`card-div-${index}`,`edit-form-${index}`,classes.task_array[index])
        const submit_button = document.createElement('button')
        submit_button.setAttribute('id', `edit-button-form-${index}`)
        submit_button.setAttribute('class', `btn btn-secondary submit`)    
        submit_button.setAttribute('form',`edit-form-${index}`)
        submit_button.addEventListener('click', clickListenerEditTask)
        edit_form.append(submit_button)
        helpers.setTextContentById(`edit-button-form-${index}`,'done')
    }
    function clickDeleteButton(index){
        classes.task_array.splice(index , 1)
        active_big_card = ''
        builder.buildGrid(classes.task_array)
    }
    function clickStatusButton(index){
        let task = classes.task_array[index]
        task.toggleDone()
        let status = document.getElementById(`card-status-${index}`)
        status.classList.add((task.is_done)?'isDone':'isNotDone')
        status.classList.remove(!(task.is_done)?'isDone':'isNotDone')
    }
    /*
    manage the click events occuring in the cards inside the grid
    */
    const gridClickEventDelegation = (e) => {
        if(e.target){
            if(e.target.matches(".card .icon")){
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
                return
            }
            if(e.target.matches(".card-body , .card-title, .card-text") && !e.target.matches(".card-mini , .mini-title")){
                let card_id = e.target.id
                let index = card_id.slice(-1)
                console.log(active_big_card)
                if(active_big_card == '' || active_big_card == index){
                    if(active_big_card == index)
                        active_big_card = ''
                    else
                        active_big_card = index
                    $(`#card-div-${index}`).toggleClass('card-animation');
                    $('#central-div-grid').toggleClass('central-grid-animation');
                } 
                return       
            }
            if(e.target.matches(".mini-title")){
                let target_id = e.target.id
                let title = e.target.textContent
                let task = classes.task_array.filter((t) => t.title == title)
                task = task[0]
                let card_element = e.target.parentNode
                card_element.classList.remove('card-mini')
                helpers.deleteAllChildrenById(card_element.id)
                let index = target_id.slice(-1)
                card_element.id = `card-div-${index}`
                helpers.factoryTaskCard(index,task,card_element.id)
                return
            }
        }
    }    
    /*
    manage the click events occuring in the header navbar
    */
    function clickListenerBetweenDate(e){
        e.preventDefault()
        let form = document.getElementById('between-date-form')
        let form_data = new FormData(form)
        let date_start
        let date_end
        for(let x of form_data){
            if (x[0] === "start") {
                let splittedDate = x[1].split('-')
                if(x[1] === '') {
                    splittedDate = ['1901','01','01']
                }
                date_start = format(new Date(splittedDate[0], (splittedDate[1]-1), splittedDate[2]), 'dd/MM/yyyy')
            }
            if (x[0] === "end") {
                let splittedDate = x[1].split('-')
                if(x[1] === '') {
                    splittedDate = ['1901','01','01']
                }
                date_end = format(new Date(splittedDate[0], (splittedDate[1]-1), splittedDate[2]), 'dd/MM/yyyy')
            }
        }
        let between_array = classes.task_array.filter((t) => { 
            if(helpers.checkDateIsBetween(date_start,date_end,t))
            return t})
        builder.buildGrid(between_array)     
    }
    const headerClickEventDelegation = (e) => {
        if(e.target){
            if(e.target.matches("#header-li-1,#header-list-a-1")){
                builder.buildGrid(classes.task_array)
                return
            }
            if(e.target.matches("#header-li-2,#header-list-a-2")){
                const create_group_form = createGroupForm('central-div-grid','create-group-form')
                return
            }
            if(e.target.matches("#header-li-3,#header-list-a-3")){
                const create_new_task_form = helpers.factoryTaskForm('central-div-grid','create-new-task-form',null)
                const submit_button = document.createElement('button')
                submit_button.setAttribute('id', 'create-new-task-form-submit-button')
                submit_button.setAttribute('class', `btn btn-secondary submit`)    
                submit_button.setAttribute('form',`create-new-task-form`)
                submit_button.addEventListener('click', clickListenerCreateTask)
                create_new_task_form.append(submit_button)
                helpers.setTextContentById('create-new-task-form-submit-button','done')
                return
            }
            if(e.target.matches("#header-ul-dropdown a")){
                let target_id = e.target.id.slice(-1)
                let selected_group = classes.group_array[target_id]
                let array_filtered = classes.task_array.filter((t) => t.group_title === `${selected_group.group_title}`)
                builder.buildGrid(array_filtered,true)
                return
            }
            if(e.target.matches("#header-li-5,#header-list-a-5")){
                let today_array = classes.task_array.filter((t) => { 
                    if(helpers.checkDateIsToday(t))
                    return t})
                builder.buildGrid(today_array)        
                return
            }
            if(e.target.matches("#header-li-6,#header-list-a-6")){
                helpers.deleteAllChildrenById('central-div-grid')
                let between_date_form = helpers.factoryHtmlElement('form', 'central-div-grid','between-date-form', 'form')
                let label_start = helpers.factoryHtmlElement('label','between-date-form','between-date-label-start')
                label_start.setAttribute('for','start')
                helpers.setTextContentById('between-date-label-start','start from')
                let input_start = helpers.factoryHtmlElement('input','between-date-form','between-date-input-start')
                input_start.setAttribute('type','date')
                input_start.setAttribute('name','start')
                let label_end = helpers.factoryHtmlElement('label','between-date-form','between-date-label-end')
                label_end.setAttribute('for','end')
                helpers.setTextContentById('between-date-label-end','until')
                let input_end = helpers.factoryHtmlElement('input','between-date-form','between-date-input-end')
                input_end.setAttribute('type','date')
                input_end.setAttribute('name','end')
                const submit_button = document.createElement('button')
                submit_button.setAttribute('id', 'between-date-form-submit-button')
                submit_button.setAttribute('class', `btn btn-secondary submit`)    
                submit_button.setAttribute('form',`between-date-form`)
                submit_button.addEventListener('click', clickListenerBetweenDate)
                between_date_form.append(submit_button)
                helpers.setTextContentById('between-date-form-submit-button','done') 
                return  
            }
        }
    }
    /*
    manage the click events occuring in the footer navbar
    */
    const footerClickEventDelegation = (e) => {
        if(e.target){
            if(e.target.matches("#footer-notification")){
                clickNotification()
                return
            }
            if(e.target.matches("#footer-save")){
                clickSave()
                return
            }
            if(e.target.matches("#footer-clear")){
                clickClear()
                return
            }
        }
    }
    async function  clickNotification(){
        const user = sessionStorage.getItem("user")
        if(!user)
            return
        const url = new URL(`http://localhost:8080/${user}`)
        fetch(url, {
            mode:'cors',
            method: 'GET',
        })
        .then((res)=>{
            return res.text()
        })
        .then((string) => {
            if(!string)
                return
            let invite = JSON.parse(string)
            let events_invite_arr = invite.events
            let number_not = events_invite_arr.length
            let footer_span = document.getElementById("footer-span")
            footer_span.textContent = number_not
            events_invite_arr.forEach((i)=>{
                classes.task_array.push(i)
                let new_group = new classes.Group(i.group_title,i.members)
                if(classes.group_array.indexOf(new_group) < 0)
                    classes.group_array.push(new_group)
            })
        })
    }
    function clickSave (){
        let counter = 0
        for (let t of classes.task_array) {
            localStorage.setItem(`task${counter}`, `${t.title}%${t.group_title}%${t.description}%${t.date}%${t.is_done}%`)
            counter++
        }
        counter = 0 
        for (let g of classes.group_array) {
            let data = g.group_title
            for(let m of g.members)
                data = data + `%${m}`
            localStorage.setItem(`group${counter}`, `${data}`)
            counter++
        }
    }
    function clickClear(){
        localStorage.clear()
    }
    /*
    manage the click events occuring in the single group section
    */
    async function  ServerDeleteGroup(group_to_del){
        console.log("deleting...")
        const url = new URL("http://localhost:8080")
        fetch(url, {
            mode:'cors',
            method: 'DELETE',
            body : JSON.stringify({
                group_name: group_to_del.group_name,
            })
        })
        .then((res)=>{
            return res.text()
        })
        .then((value) => {
            console.log(value)
        })
    }
    async function  ServerPushGroup(group_to_push){
        console.log("push...")
        const url = new URL("http://localhost:8080")
        let events_arr = classes.task_array.filter((task) => group_to_push.group_title == task.group_title)
        fetch(url, {
            mode:'cors',
            method: 'POST',
            body : JSON.stringify({
                group_name: group_to_push.group_title,
                members: group_to_push.members,
                events: events_arr,
            })
        })
        .then((response)=>{
            return response.text()
        })
        .then((value) => {
            console.log(value)
        })
    }
    const latBarClickEventDelegation = (e) => {
        if(e.target){
            if(e.target.matches("#lat-bar-push-button")){
                let title_p = document.getElementById('lat-bar-p-title')
                let group_title = title_p.textContent
                let group_to_push = classes.group_array.filter((group) => group_title == group.group_title)
                group_to_push = group_to_push[0]
                ServerPushGroup(group_to_push)
            }
            if(e.target.matches("#lat-bar-delete-button")){
                let title_p = document.getElementById('lat-bar-p-title')
                let group_title = title_p.textContent
                let group_to_del = classes.group_array.filter((group) => group_title == group.group_title)
                group_to_del = group_to_del[0]
                ServerDeleteGroup(group_to_del)
                group_to_del.deleteGroup()
                builder.buildGrid(classes.task_array)
                return
            }
        }
    }
    return {gridClickEventDelegation,latBarClickEventDelegation,footerClickEventDelegation,headerClickEventDelegation}
})()

export default el