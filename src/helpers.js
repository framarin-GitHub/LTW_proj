import delete_icon_src from './icons/recycle-bin.png'
import edit_icon_src from './icons/edit.png'
import status_icon_src from './icons/statusicon.svg'



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
        const card_div = factoryHtmlElement('div','central-div-grid',`card-div-${index}`,'card')
        const card_div_body = factoryHtmlElement('div',`card-div-${index}`,`card-div-body-${index}`,'card-body')
        const card_div_title = factoryHtmlElement('h5',`card-div-body-${index}`,`card-div-title-${index}`,'card-title')
        setTextContentById(`card-div-title-${index}`,`${task.title}`)
        const card_p = factoryHtmlElement('p',`card-div-body-${index}`,`card-p-${index}`,'card-text')
        setTextContentById(`card-p-${index}`,`${task.description}`)
        const card_div_date = factoryHtmlElement('p',`card-div-body-${index}`,`card-div-date-${index}`,'card-text')
        setTextContentById(`card-div-date-${index}`,`${task.date}`)
        const card_delete_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-delete-${index}`,'button delete') 
        const delete_icon = new Image();
        delete_icon.src = delete_icon_src
        delete_icon.setAttribute('class','icon')
        card_delete_button.append(delete_icon)
        const card_edit_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-edit-${index}`,'button edit') 
        const edit_icon = new Image()
        edit_icon.src = edit_icon_src
        edit_icon.setAttribute('class','icon')
        card_edit_button.append(edit_icon)
        const card_status_button = factoryHtmlElement('button',`card-div-body-${index}`,`card-status-${index}`,'button status')
        card_status_button.classList.add((task.is_done)?'isDone':'isNotDone')
        const status_icon = new Image()
        status_icon.src = status_icon_src
        status_icon.setAttribute('class','icon')
        card_status_button.append(status_icon)
    }
    const factoryForm = (id_parent, id_form) => {
        deleteAllChildrenById(`${id_parent}`)
        const form = factoryHtmlElement('form', id_parent, `${id_form}`)
        form.setAttribute('id',`${id_form}`)
        
        const title_lbl = factoryHtmlElement('label',`${id_form}`, `${id_form}-title-lbl`, 'label')
        title_lbl.setAttribute('for','title')
        helpers.setTextContentById(`${id_form}-title-lbl`,'title')
        const input_title = factoryHtmlElement('input', `${id_form}`, `${id_form}-title-input`, 'input')
        input_title.setAttribute('type', 'text')
        input_title.setAttribute('name','title')
        
        const description_lbl = factoryHtmlElement('label',`${id_form}`, `${id_form}-description-lbl`, 'label')
        helpers.setTextContentById(`${id_form}-description-lbl`,'description')
        description_lbl.setAttribute('for','description')
        const input_description = factoryHtmlElement('input', `${id_form}`,`${id_form}-description-input`, 'input')
        input_description.setAttribute('type', 'text')
        input_description.setAttribute('name','description')

        const group_lbl = factoryHtmlElement('label',`${id_form}`, `${id_form}-group-lbl`, 'label')
        helpers.setTextContentById(`${id_form}-group-lbl`,'group')
        group_lbl.setAttribute('for','package_name')
        const input_group = factoryHtmlElement('input', `${id_form}`, `${id_form}-group-input`, 'input')
        input_group.setAttribute('type', 'text')
        input_group.setAttribute('name','group')

        const date_lbl = factoryHtmlElement('label',`${id_form}`, `${id_form}-date-lbl`, 'label')
        helpers.setTextContentById(`${id_form}-date-lbl`,'date')
        date_lbl.setAttribute('for','date')
        const input_date = factoryHtmlElement('input', `${id_form}`, `${id_form}-date-input`, 'input')
        input_date.setAttribute('type', 'date')
        input_date.setAttribute('name','date')

        const submit_button = factoryHtmlElement('button', `${id_form}`, `${id_form}-submit-button`, 'submit')
        submit_button.setAttribute('form',`${id_form}`)
        helpers.setTextContentById(`${id_form}-submit-button`,'done')


    }
    const deleteAllChildrenById = (id_container) => {
        const e = document.getElementById(`${id_container}`)
        e.innerHTML = "";
    }
    return {factoryHtmlElement,setTextContentById,createHookContent,factoryTaskCard,factoryForm,deleteAllChildrenById}
})()
export default helpers