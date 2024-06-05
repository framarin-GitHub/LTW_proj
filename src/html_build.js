import helpers from './helpers';
import classes from './classes';
import {format, isToday, parseISO} from "date-fns"
import remove_icon_src from './icons/recycle-bin.png'
import $ from 'jquery'
import el from './event_listeners.js'

const builder = (()=>{
const retrieveFromStorage = () => {
    let counter = 0
    while(localStorage.getItem(`task${counter}`)) {
        let task_stored = localStorage.getItem(`task${counter}`)
        if(task_stored){
            let task_split = task_stored.split('%')
            let task = new classes.Task(task_split[0], task_split[1],task_split[2],task_split[3],task_split[4]==='true'?true:false)
            classes.task_array.unshift(task)
        }
        counter++
    }
    counter = 0
    while(localStorage.getItem(`group${counter}`)) {
        let group_stored = localStorage.getItem(`group${counter}`)
        if(group_stored){
            let group_split = group_stored.split('%')
            let group_title = group_split.shift()
            let members_array = group_split[0].split(',')
            let group = new classes.Group(group_title, members_array)
            classes.group_array.unshift(group)
        }
        counter++
    }
}
function headerBuilder(){
    const parent = document.getElementById('hook')
    const header_nav = document.createElement('nav')
    header_nav.setAttribute('id', 'header-nav')
    header_nav.setAttribute('class', 'navbar navbar-expand-lg navbar-dark bg-dark')
    header_nav.addEventListener('click', el.headerClickEventDelegation)
    parent.append(header_nav)
    
    const header_img = helpers.factoryHtmlElement('img','header-nav','header-img','')
    header_img.setAttribute('src', 'https://cdn.pixabay.com/photo/2021/02/02/14/54/icon-5974270_1280.png ')
    const header_div1 = helpers.factoryHtmlElement('div','header-nav','header-div-1','container-fluid bg-dark')
    const header_a = helpers.factoryHtmlElement('a','header-div-1','header-a','navbar-brand')
    header_a.setAttribute('href','index.html')
    helpers.setTextContentById('header-a','PLAN YOUR MEETINGS')
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
    const header_li5 = helpers.factoryHtmlElement('li','header-ul','header-li-5','nav-item')
    const header_li6 = helpers.factoryHtmlElement('li','header-ul','header-li-6','nav-item')
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
    helpers.setTextContentById('header-list-a-3','Add event')
    
    const header_list_a5 = helpers.factoryHtmlElement('a','header-li-5','header-list-a-5','nav-link active')
    helpers.setTextContentById('header-list-a-5','Today')
    header_list_a5.setAttribute('href','#')

    const header_list_a6 = helpers.factoryHtmlElement('a','header-li-6','header-list-a-6','nav-link active')
    helpers.setTextContentById('header-list-a-6','Filter between')
    header_list_a6.setAttribute('href','#')

    const header_list_a4 = helpers.factoryHtmlElement('a','header-li-4','header-list-a-4','nav-link active dropdown-toggle')
    header_list_a4.setAttribute('href','#')
    header_list_a4.setAttribute('role','button')
    header_list_a4.setAttribute('data-bs-toggle','dropdown')
    header_list_a4.setAttribute('aria-expanded','false')
    helpers.setTextContentById('header-list-a-4','Groups')
    const header_ul_dropdown = helpers.factoryHtmlElement('ul','header-li-4','header-ul-dropdown','dropdown-menu')

    let user = sessionStorage.getItem("user")
    const header_div2 = helpers.factoryHtmlElement('div','header-nav','header-div-2','container-fluid bg-dark')
    const header_account_a = helpers.factoryHtmlElement('a', 'header-div-2', 'header-account-a', '')
    if(user){
        helpers.setTextContentById('header-account-a',`${user}`)
    }
    else{
        helpers.setTextContentById('header-account-a','create your account')
    }

}

function footerBuilder(){
    const parent = document.getElementById('hook')
    const footer_nav = document.createElement('nav')
    footer_nav.setAttribute('id', 'footer-nav')
    footer_nav.setAttribute('class', 'navbar navbar-expand-lg navbar-dark bg-dark')
    footer_nav.addEventListener('click', el.footerClickEventDelegation)
    parent.append(footer_nav)
    helpers.factoryHtmlElement('button', 'footer-nav', 'footer-clear', 'btn btn-dark')
    helpers.setTextContentById('footer-clear','clear')
    helpers.factoryHtmlElement('button', 'footer-nav', 'footer-save', 'btn btn-dark')
    helpers.setTextContentById('footer-save','save')
    helpers.factoryHtmlElement('button', 'footer-nav', 'footer-notification', 'btn btn-dark')
    helpers.setTextContentById('footer-notification','download invites')
    helpers.factoryHtmlElement('span', 'footer-notification', 'footer-span', 'badge')

}
/*
display the events card based on the given array
*/
function buildGrid(task_array_to_build,group_page = false){
    helpers.deleteAllChildrenById('central-div-grid')
    let notification = document.getElementById("footer-span")
    if(notification)
        notification.textContent = ""
    let c = 0
    buildDropdown()
    if(group_page){
        if(task_array_to_build.length)
            buildGroupLatBar(task_array_to_build[0].group_title)
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
    helpers.deleteAllChildrenById('header-ul-dropdown')
    let counter = 0
    for(let x of classes.group_array){
        const header_li_dropdown = helpers.factoryHtmlElement('li','header-ul-dropdown',`header-li-dropdown-${counter}`)
        const header_a_dropdown = helpers.factoryHtmlElement('a',`header-li-dropdown-${counter}`,`header-a-dropdown-${counter}`,'dropdown-item')
        helpers.setTextContentById(`header-a-dropdown-${counter}`,`${x.group_title}`)
        counter++
    }
}

function buildGroupLatBar(group_title){
    let group_target = classes.group_array.filter((g) => g.group_title == group_title)
    const parent = document.getElementById('central-div-grid')
    const lat_bar = document.createElement('div')
    lat_bar.setAttribute('id', 'lat-bar-div')
    lat_bar.addEventListener('click', el.latBarClickEventDelegation)
    lat_bar.classList.add('border', 'border-secondary')
    parent.append(lat_bar)
    let counter = 0
    helpers.factoryHtmlElement('h1','lat-bar-div','lat-bar-p-title','card-title border-bottom border-secondary')
    helpers.setTextContentById('lat-bar-p-title', `${group_target[0].group_title}`)
    for(let m of group_target[0].members[0]){
        helpers.factoryHtmlElement('div', 'lat-bar-div',`lat-bar-member-${counter}`)
        helpers.setTextContentById(`lat-bar-member-${counter}`,`${m}`)
        counter++
    }
    helpers.factoryHtmlElement('div','lat-bar-div','lat-bar-button-div',)
    helpers.factoryHtmlElement('button','lat-bar-button-div','lat-bar-push-button','btn btn-secondary')
    helpers.setTextContentById('lat-bar-push-button', 'send invites')
    helpers.factoryHtmlElement('button','lat-bar-button-div','lat-bar-delete-button','btn btn-secondary')
    helpers.setTextContentById('lat-bar-delete-button', 'delete')
    helpers.factoryHtmlElement('button','lat-bar-div','lat-bar-collapse','btn btn-primary')
    helpers.setTextContentById('lat-bar-collapse', 'collapse')

    helpers.factoryHtmlElement('button','central-div-grid','lat-bar-show','btn btn-primary') 
    helpers.setTextContentById('lat-bar-show', 'show >')
    
}

    const html_build = () => {
        retrieveFromStorage()
        const content_div = helpers.createHookContent();
        headerBuilder();
        const central_grid = document.createElement('div')
        central_grid.setAttribute('id', 'central-div-grid')
        central_grid.addEventListener('click',el.gridClickEventDelegation)
        content_div.append(central_grid)
        buildGrid(classes.task_array)
        footerBuilder()
    }
return {html_build,buildGrid}
})();
export default builder