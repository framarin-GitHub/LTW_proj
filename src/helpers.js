import delete_icon_src from './icons/recycle-bin.png'
import edit_icon_src from './icons/edit.png'
import status_icon_src from './icons/statusicon.svg'
function deleteAllChildrenById(id_container) {
    const e = document.getElementById(`${id_container}`)
    e.innerHTML = "";
}

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
    const factoryTaskCard = (index,id_parent,info) => {
        const card_div = factoryHtmlElement('div',`${id_parent}`,`card-div-${index}`,'card')
        const card_div_body = factoryHtmlElement('div',`card-div-${index}`,`card-div-body-${index}`,'card-body')
        const card_div_title = factoryHtmlElement('h5',`card-div-body-${index}`,`card-div-title-${index}`,'card-title')
        setTextContentById(`card-div-title-${index}`,'info.title')
        const card_p = factoryHtmlElement('p',`card-div-body-${index}`,`card-p-${index}`,'card-text')
        setTextContentById(`card-p-${index}`,'info.description')
        const card_div_date = factoryHtmlElement('p',`card-div-body-${index}`,`card-div-date-${index}`,'card-text')
        setTextContentById(`card-div-date-${index}`,'info.date')
        const card_delete_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-delete-${index}`,'button') 
        const delete_icon = new Image();
        delete_icon.src = delete_icon_src
        delete_icon.setAttribute('class','icon')
        card_delete_button.append(delete_icon)
        const card_edit_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-edit-${index}`,'button') 
        const edit_icon = new Image()
        edit_icon.src = edit_icon_src
        edit_icon.setAttribute('class','icon')
        card_edit_button.append(edit_icon)
        const card_status_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-status-${index}`,'button isNotDone') 
        const status_icon = new Image()
        status_icon.src = status_icon_src
        status_icon.setAttribute('class','icon')
        card_status_button.append(status_icon)
    }
    const factoryForm = (id_parent, id_form) => {
        deleteAllChildrenById(`${id_parent}`)
        const form = factoryHtmlElement('form', id_parent, `${id_form}`)
        form.setAttribute('id',`${id_form}`)
        const name_lbl = factoryHtmlElement('label',`${id_form}`, 'label', 'INFO1')
        name_lbl.setAttribute('for','INFO1')
        const input_name = factoryHtmlElement('input', `${id_form}`, 'INFO1')
        input_name.setAttribute('type', 'text')
        input_name.setAttribute('name','INFO1')
        const description_lbl = factoryHtmlElement('label',`${id_form}`, 'label', 'description')



        description_lbl.setAttribute('for','description')
        const input_description = factoryHtmlElement('input', `${id_form}`, 'input')
        input_description.setAttribute('type', 'text')
        input_description.setAttribute('name','description')
        const package_name_lbl = factoryHtmlElement('label',`${id_form}`, 'label', 'package')
        package_name_lbl.setAttribute('for','package_name')
        const input_package_name = factoryHtmlElement('input', `${id_form}`, 'input')
        input_package_name.setAttribute('type', 'text')
        input_package_name.setAttribute('name','package_name')
        const due_date_lbl = factoryHtmlElement('label',`${id_form}`, 'label','date')
        due_date_lbl.setAttribute('for','due_date')
        const input_due_date = factoryHtmlElement('input', `${id_form}`, 'input')
        input_due_date.setAttribute('type', 'date')
        input_due_date.setAttribute('name','due_date')
        const submit_button = factoryHtmlElement('button', `${id_form}`, 'submit_button', 'submit')
        submit_button.setAttribute('form',`${id_form}`)


    }
    return {factoryHtmlElement,setTextContentById,createHookContent,factoryTaskCard,factoryForm}
})()
export default helpers