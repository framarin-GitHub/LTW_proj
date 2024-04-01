import helpers from './helpers'
import task from './task'

function clickEditButton(index){
    //getElebyid target
    //killall by id
    //createForm
    //retrieve data
    //add event listener to form
    //get data
    //refresh page
}
function clickDeleteButton(index){
    //to save example
    if (index != 0)
        task.task_array.splice(index , 1)
    buildGrid()
}
function clickStatusButton(index){
    task.task_array[index].toggleDone()
    buildGrid()
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
function headerBuilder(){
    const header_nav = helpers.factoryHtmlElement('nav','hook','header-nav','navbar navbar-expand-lg bg-body-tertiary')
    const header_div1 = helpers.factoryHtmlElement('div','header-nav','header-div-1','container-fluid')
    const header_a = helpers.factoryHtmlElement('a','header-div-1','header-a','navbar-brand')
    header_a.setAttribute('href','#')
    helpers.setTextContentById('header-a','TITLEGOESHERE')
    
    const header_button = helpers.factoryHtmlElement('button','header-div-1','header-button','navbar-toggler')
    header_button.setAttribute('type','button')
    header_button.setAttribute('data-bs-toggle','collapse')
    header_button.setAttribute('data-bs-targeet','#navbarNavDropdown')
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
    helpers.setTextContentById('header-list-a-2','Features')
    header_list_a3.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-3','bhooo')
    
    const header_list_a4 = helpers.factoryHtmlElement('a','header-li-4','header-list-a-4','nav-link dropdown-toggle')
    header_list_a4.setAttribute('href','#')
    header_list_a4.setAttribute('role','button')
    header_list_a4.setAttribute('data-bs-toggle','dropdown')
    header_list_a4.setAttribute('aria-expanded','false')
    helpers.setTextContentById('header-list-a-4','dropdown link')
    const header_ul_dropdown = helpers.factoryHtmlElement('ul','header-li-4','header-ul-dropdown','dropdown-menu')
    const header_li_dropdown1 = helpers.factoryHtmlElement('li','header-ul-dropdown','header-li-dropdown-1')
    const header_li_dropdown2 = helpers.factoryHtmlElement('li','header-ul-dropdown','header-li-dropdown-2')
    const header_li_dropdown3 = helpers.factoryHtmlElement('li','header-ul-dropdown','header-li-dropdown-3')
    const header_a_dropdown1 = helpers.factoryHtmlElement('a','header-li-dropdown-1','header-a-dropdown-1','dropdown-item')
    const header_a_dropdown2 = helpers.factoryHtmlElement('a','header-li-dropdown-2','header-a-dropdown-2','dropdown-item')
    const header_a_dropdown3 = helpers.factoryHtmlElement('a','header-li-dropdown-3','header-a-dropdown-3','dropdown-item')
    header_a_dropdown1.setAttribute('href','#')
    header_a_dropdown2.setAttribute('href','#')
    header_a_dropdown3.setAttribute('href','#')
    helpers.setTextContentById('header-a-dropdown-1','some text')
    helpers.setTextContentById('header-a-dropdown-2','some other text')
    helpers.setTextContentById('header-a-dropdown-3','something else')

}
function buildGrid(){
    helpers.deleteAllChildrenById('central-div-grid')
    let c = 0
    for(let t of task.task_array){
        helpers.factoryTaskCard(c++,t)
    }
}
function footerBuilder(){
    const header_nav = helpers.factoryHtmlElement('nav','hook','footer-nav','navbar navbar-expand-lg bg-body-tertiary')
    const header_ul = helpers.factoryHtmlElement('ul','footer-nav','footer-ul','navbar-nav')
    const header_li1 = helpers.factoryHtmlElement('li','footer-ul','footer-li-1','nav-item')
    const header_li2 = helpers.factoryHtmlElement('li','footer-ul','footer-li-2','nav-item')
    const header_li3 = helpers.factoryHtmlElement('li','footer-ul','footer-li-3','nav-item')
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
        buildGrid()
        footerBuilder()
    }
    return {html_build}
})();
export default builder