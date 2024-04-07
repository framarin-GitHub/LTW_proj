import delete_icon_src from './icons/recycle-bin.png'
import edit_icon_src from './icons/edit.png'
import status_icon_src from './icons/statusicon.svg'
import task_import from './task'



const helpers = (() => {
    const factoryHtmlElement = (type, id_parent, id_self, class_bs="") => {
        const parent = document.getElementById(`${id_parent}`)
        const ele = document.createElement(`${type}`)
        ele.setAttribute('id', `${id_self}`)
        ele.setAttribute('class', `${class_bs}`)
        parent.append(ele)
        return ele;
    }
    const setTextContentById = (id , text) => {
        const ele = document.getElementById(`${id}`)
        ele.textContent = text
    }
    const createHookContent = () => {
        const body = document.querySelector('body')
        const content_div = document.createElement('div')
        content_div.setAttribute('id', 'hook')
        body.append(content_div)
        return content_div
    }
    const factoryTaskCard = (index,task) => {
        const card_div = factoryHtmlElement('div','central-div-grid',`card-div-${index}`,'card text-center')
        const card_div_body = factoryHtmlElement('div',`card-div-${index}`,`card-div-body-${index}`,'card-body')
        const card_div_title = factoryHtmlElement('h5',`card-div-body-${index}`,`card-div-title-${index}`,'card-title')
        setTextContentById(`card-div-title-${index}`,`${task.title}`)
        const card_p = factoryHtmlElement('p',`card-div-body-${index}`,`card-p-${index}`,'card-text')
        setTextContentById(`card-p-${index}`,`${task.description}`)
        const card_div_date = factoryHtmlElement('p',`card-div-body-${index}`,`card-div-date-${index}`,'card-text')
        setTextContentById(`card-div-date-${index}`,`${task.date}`)
        const card_delete_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-delete-${index}`,'btn button delete') 
        const delete_icon = new Image();
        delete_icon.src = delete_icon_src
        delete_icon.setAttribute('class','icon')
        card_delete_button.append(delete_icon)
        const card_edit_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-edit-${index}`,'btn button edit') 
        const edit_icon = new Image()
        edit_icon.src = edit_icon_src
        edit_icon.setAttribute('class','icon')
        card_edit_button.append(edit_icon)
        const card_status_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-status-${index}`,'btn button status')
        card_status_button.classList.add((task.is_done)?'isDone':'isNotDone')
        const status_icon = new Image()
        status_icon.src = status_icon_src
        status_icon.setAttribute('class','icon')
        card_status_button.append(status_icon)
    }
    const factoryTaskForm = (id_parent, id_form, task) => {
        deleteAllChildrenById(`${id_parent}`)
        const form = document.createElement('form')
        const parent = document.getElementById(`${id_parent}`)
        form.setAttribute('id', `${id_form}`)
        form.addEventListener('submit', (e)=>{e.preventDefault()})
        parent.append(form)
        form.classList.add('form')


        factoryHtmlElement('div', `${id_form}`, `${id_form}-title-div`, 'form-group')
        const title_lbl = factoryHtmlElement('label', `${id_form}-title-div`, `${id_form}-title-lbl`, 'label')
        title_lbl.setAttribute('for','title')
        helpers.setTextContentById(`${id_form}-title-lbl`,'title')
        const input_title = factoryHtmlElement('input', `${id_form}-title-div`, `${id_form}-title-input`, 'input')
        input_title.setAttribute('type', 'text')
        input_title.setAttribute('name','title')
        
        factoryHtmlElement('div', `${id_form}`, `${id_form}-desc-div`, 'form-group')
        const description_lbl = factoryHtmlElement('label', `${id_form}-desc-div`, `${id_form}-description-lbl`, 'label')
        helpers.setTextContentById(`${id_form}-description-lbl`,'description')
        description_lbl.setAttribute('for','description')
        const input_description = factoryHtmlElement('input', `${id_form}-desc-div`,`${id_form}-description-input`, 'input')
        input_description.setAttribute('type', 'text')
        input_description.setAttribute('name','description')

        factoryHtmlElement('div', `${id_form}`, `${id_form}-date-div`, 'form-group')
        const date_lbl = factoryHtmlElement('label', `${id_form}-date-div`, `${id_form}-date-lbl`, 'label')
        helpers.setTextContentById(`${id_form}-date-lbl`,'date')
        date_lbl.setAttribute('for','date')
        const input_date = factoryHtmlElement('input', `${id_form}-date-div`, `${id_form}-date-input`, 'input')
        input_date.setAttribute('type', 'date')
        input_date.setAttribute('name','date')

        const group_select = factoryHtmlElement('select',`${id_form}`, `${id_form}-select`)
        const default_option = factoryHtmlElement('option', `${id_form}-select`, `${id_form}-option-default`)
        default_option.setAttribute('selected',true)
        default_option.setAttribute('value','')
        setTextContentById(`${id_form}-option-default`, 'select a group')
        
        let counter = 0
        for(let x of task_import.group_array){
            const option = factoryHtmlElement('option', `${id_form}-select`, `${id_form}-option-${counter}`)
            option.setAttribute('value',`${x}`)
            setTextContentById(`${id_form}-option-${counter}`, `${x}`)
            counter++
        }

        if(task != null) {  
            if(task.date != null ) {
                let date_split = task.date.split('/')
                let date_input = `${date_split[2]}-${date_split[1]}-${date_split[0]}`
                input_date.setAttribute('value', `${date_input}`)
            }
            input_description.setAttribute('value', `${task.description}`)
            input_title.setAttribute('value', `${task.title}`)
        }
        return form
    }
    const createGroupForm = (id_parent, id_form) => {
        deleteAllChildrenById(`${id_parent}`)
        const form = document.createElement('form')
        const parent = document.getElementById(`${id_parent}`)
        form.setAttribute('id', `${id_form}`)
        form.addEventListener('submit', (e)=>{e.preventDefault()})
        parent.append(form)
        form.classList.add('form')

        factoryHtmlElement('div', `${id_form}`, `${id_form}-group-div`, 'form-group')
        const title_lbl = factoryHtmlElement('label', `${id_form}-group-div`, `${id_form}-group-lbl`, 'label')
        title_lbl.setAttribute('for','group')
        helpers.setTextContentById(`${id_form}-group-lbl`,'group')
        const input_title = factoryHtmlElement('input', `${id_form}-group-div`, `${id_form}-group-input`, 'input')
        input_title.setAttribute('type', 'text')
        input_title.setAttribute('name','group')
        
        return form
    }
    const deleteAllChildrenById = (id_container) => {
        const e = document.getElementById(`${id_container}`)
        e.innerHTML = "";
    }
    return {factoryHtmlElement,setTextContentById,createHookContent,factoryTaskCard,factoryTaskForm,createGroupForm,deleteAllChildrenById}
})()
export default helpers