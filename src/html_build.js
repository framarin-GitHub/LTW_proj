import helpers from './helpers'

const builder = (()=>{
    const html_build = () => {
        //creating the hook for content
        const body = document.querySelector('body')
        const content_div = document.createElement('div')
        content_div.setAttribute('id', 'content')
        body.append(content_div)

        //playground for bootstrap
        const nav_bar = helpers.factoryHtmlElement('nav','content','nav_bar')
        nav_bar.setAttribute('class','navbar navbar-expand-lg bg-light')
        const div_cont = helpers.factoryHtmlElement('div','nav_bar','div_cont')
        div_cont.setAttribute('class','container-fluid')
        const a_ref = helpers.factoryHtmlElement('a','div_cont','a_ref','navbar')
        a_ref.setAttribute('href','#')
        a_ref.setAttribute('class','navbar-brand')
        //
    }
    return {html_build}
})();
export default builder