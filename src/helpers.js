const helpers = (() => {
    //must add classes for bootstrap or pain in the ass
    const factoryHtmlElement = (type, id_parent, id_self, text = "") => {
        const parent = document.getElementById(`${id_parent}`)
        const ele = document.createElement(`${type}`)
        ele.setAttribute('id', `${id_self}`)
        parent.append(ele)
        setTextContentById(`${id_self}`, `${text}`)
        return ele;
    }
    const setTextContentById = (id , text) => {
        const ele = document.getElementById(`${id}`)
        ele.textContent = text
    }
    return {factoryHtmlElement,setTextContentById}
})()
export default helpers