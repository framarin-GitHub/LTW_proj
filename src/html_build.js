import helpers from './helpers'

//DROPDOWN NOT DROPPING DOWN
function headerBuilder(){
    const header_nav = helpers.factoryHtmlElement('nav','hook','header-nav','navbar navbar-expand-lg bg-body-tertiary')
    const header_div1 = helpers.factoryHtmlElement('div','header-nav','header-div-one','container-fluid')
    const header_a = helpers.factoryHtmlElement('a','header-nav','header-a','navbar-brand')
    header_a.setAttribute('href','#')
    helpers.setTextContentById('header-a','TITLEGOESHERE')
    
    const header_button = helpers.factoryHtmlElement('button','header-nav','header-button','navbar-toggler')
    header_button.setAttribute('type','button')
    header_button.setAttribute('data-bs-toggle','collapse')
    header_button.setAttribute('data-bs-targeet','#navbarNavDropdown')
    header_button.setAttribute('aria-controls','navbarNavDropdown')
    header_button.setAttribute('aria-expanded','false')
    header_button.setAttribute('aria-label','Toggle navigation')
    const header_span = helpers.factoryHtmlElement('span','header-button','header-span','navbar-toggler-icon')
    const header_div_navbarNavDropdown = helpers.factoryHtmlElement('div','header-div-one','navbarNavDropdown','collapse navbar-collapse')

    const header_ul = helpers.factoryHtmlElement('ul','navbarNavDropdown','header-ul','navbar-nav')
    const header_li1 = helpers.factoryHtmlElement('li','header-ul','header-li-one','nav-item')
    const header_li2 = helpers.factoryHtmlElement('li','header-ul','header-li-two','nav-item')
    const header_li3 = helpers.factoryHtmlElement('li','header-ul','header-li-three','nav-item')
    const header_li4 = helpers.factoryHtmlElement('li','header-ul','header-li-four','nav-item dropdown')

    const header_list_a1 = helpers.factoryHtmlElement('a','header-li-one','header-list-a-one','nav-link active')
    const header_list_a2 = helpers.factoryHtmlElement('a','header-li-two','header-list-a-two','nav-link active')
    const header_list_a3 = helpers.factoryHtmlElement('a','header-li-three','header-list-a-three','nav-link active')
    header_list_a1.setAttribute('aria-current','page')
    header_list_a1.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-one','Home')
    header_list_a2.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-two','Features')
    header_list_a3.setAttribute('href','#')
    helpers.setTextContentById('header-list-a-three','bhooo')
    
    const header_list_a4 = helpers.factoryHtmlElement('a','header-li-four','header-list-a-four','nav-link dropdown-toggle')
    header_list_a4.setAttribute('href','#')
    header_list_a4.setAttribute('role','button')
    header_list_a4.setAttribute('data-bs-toggle','dropdown')
    header_list_a4.setAttribute('aria-expanded','false')
    helpers.setTextContentById('header-list-a-four','dropdown link')
    const header_ul_dropdown = helpers.factoryHtmlElement('ul','header-li-four','header-ul-dropdown','dropdown-menu')
    const header_li_dropdown1 = helpers.factoryHtmlElement('li','header-ul-dropdown','header-li-dropdown-one','dropdown-item')
    const header_li_dropdown2 = helpers.factoryHtmlElement('li','header-ul-dropdown','header-li-dropdown-two','dropdown-item')
    const header_li_dropdown3 = helpers.factoryHtmlElement('li','header-ul-dropdown','header-li-dropdown-three','dropdown-item')
    header_li_dropdown1.setAttribute('href','#')
    header_li_dropdown2.setAttribute('href','#')
    header_li_dropdown3.setAttribute('href','#')

}

const builder = (()=>{
    const html_build = () => {
        const content_div = helpers.createHookContent();
        headerBuilder();
    }
    return {html_build}
})();
export default builder