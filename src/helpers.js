import delete_icon_src from './icons/recycle-bin.png'
import edit_icon_src from './icons/edit.png'

const helpers = (() => {
    //must add classes for bootstrap or pain in the ass
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
        //TO ADD ICONS TO DELETE,MODIFY,STATUS, use class card-link?
    }
    return {factoryHtmlElement,setTextContentById,createHookContent,factoryTaskCard}
})()
export default helpers