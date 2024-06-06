import { id } from 'date-fns/locale';
import './style_homepage.scss'
import $, { ajax } from 'jquery'

let forms = document.querySelectorAll('form')
forms.forEach((form)=>{
    form.addEventListener('submit', (e)=>{e.preventDefault()})
})


const wrapper = document.querySelector('.wrapper');
const login_link = document.querySelector('.login-link');
const register_link = document.querySelector('.register-link');
const btnPopup = document.querySelector('.accesso');
const iconClose=document.querySelector('.icon-close');
const btn_reg=document.querySelector('.registro');
const btn_login=document.querySelector('.btn');
const btn_register=document.getElementById('btn');
const messaggioR=document.querySelectorAll('.messaggio')
const messaggioL=document.querySelectorAll('.messaggio0')
const touch_pasw=document.getElementById('pw')
const touch_email=document.getElementById('ma')
const touch_use=document.getElementById('us')
const touch_mall=document.getElementById('mail')

touch_mall.addEventListener("click",()=>{
    for(var i=0 ; i<messaggioR.length ; i++){
        messaggioR[i].classList.remove("active");
    }
})

touch_pasw.addEventListener("click",()=>{
    for(var i=0;i<messaggioL.length;i++){
        messaggioL[i].classList.remove("active")
    }
})

touch_email.addEventListener("click", ()=>{
    for(var i=0;i<messaggioL.length;i++){
        messaggioL[i].classList.remove("active")
    }
})

touch_use.addEventListener("click",()=>{
    for(var i=0 ; i<messaggioR.length ; i++){
        messaggioR[i].classList.remove("active");
    }
})

register_link.addEventListener("click",()=> {
    wrapper.classList.add("active");
});
login_link.addEventListener("click", ()=> {
    wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", ()=> {
    wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", ()=> {
    wrapper.classList.remove("active-popup");
    wrapper.classList.remove("active");
    for(var i=0 ; i<messaggioR.length ; i++){
        messaggioR[i].classList.remove("active")
    }
    for(var i=0;i<messaggioL.length;i++){
        messaggioL[i].classList.remove("active")
    }
    document.getElementById('us').value="";
     document.getElementById('mail').value="";
    document.getElementById('pass').value="";
    document.getElementById('ma').value="";
        document.getElementById('pw').value="";
}); 

btn_reg.addEventListener("click", ()=> {
    wrapper.classList.add("active-popup");
    wrapper.classList.add("active")
});

btn_login.addEventListener("click", (loggo))
btn_register.addEventListener("click", (registrazione))

function vai_alla_app(){
    window.open("app.html"," _self"); 
}

async function loggo(){
    console.log("sto loggando.....");
    const url=new URL("http://localhost:8080");
    let password=document.querySelector('.pass').value;
    let email=document.querySelector('.mail').value;
    let id =0;
    console.log(password)
    console.log(email)
    fetch(url,{
        mode:'cors',
        method: 'PUT',
        body: JSON.stringify({
            enrollement: id,
            email:email,
            password:password
        })
    })
    .then((response) =>{
        return response.text()
    }) 
    .then((account_validation) => {
        console.log(account_validation)
        if(account_validation != "login error"){
        wrapper.classList.remove("active-popup");
        wrapper.classList.remove("active");
        document.getElementById('ma').account_validation="";
        document.getElementById('pw').account_validation="";
        let account = JSON.parse(account_validation) 
        console.log(account.username)
        sessionStorage.setItem("user",`${account.username}`)
        vai_alla_app()
        }else if(account_validation=="4"){
            console.log("password errata");
            for(var i=0 ; i<messaggioL.length ; i++){
                if(i==1){
                messaggioL[i].classList.add("active")
                }
            }
        }else{
            console.log("errore nel login")
            for(var i=0 ; i<messaggioL.length ; i++){
            messaggioL[i].classList.add("active")
        }

        }
    })
    .catch(e => console.log(e))
}

async function registrazione(){
    console.log("Registrazione account .....");
    const url=new URL("http://localhost:8080");
    let username=document.querySelector('.username').value;
    let password=document.getElementById('pass').value;
    let email=document.getElementById('mail').value;
    let id =1;
    fetch(url, {
        mode:'cors',
        method:'PUT',
        body: JSON.stringify({
            enrollement:id,
            username:username,
            email:email,
            password :password
        })
    })
    .then((response)=>{
        return response.text() 
    })
    .then((value) => {
        console.log(value)
        if(value=="2"){
            for(var i=0 ; i<messaggioR.length ; i++){
                if(i==0){
                messaggioR[i].classList.add("active");
            }
        }
        }else if(value=="3"){
            for(var i=0 ; i<messaggioR.length ; i++){
                if(i==1){
                    messaggioR[i].classList.add("active");
                }
            }
        }else if(value=="23" || value=="32"){
            for(var i=0 ; i<messaggioR.length ; i++){
                messaggioR[i].classList.add("active");
            }
        }else{
            document.getElementById('us').value="";
            document.getElementById('mail').value="";
            document.getElementById('pass').value="";
            wrapper.classList.remove("active-popup");
            wrapper.classList.remove("active");
        }
    })
    .catch(e => console.log(e))
}
