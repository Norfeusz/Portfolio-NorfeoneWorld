const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')

const showError = (input, msg) =>{
// argument INPUT przechowuje nasze Inputy
//argument MSG przechowuje placeholder

const formBox = input.parentElement;
const errorMsg = formBox.querySelector('.error-text');

formBox.classList.add('error');
errorMsg.textContent = msg
}

const clearError = input =>{
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}

const checkForm = input =>{
   input.forEach(el => {
    if(el.value === ''){
        showError(el, el.placeholder)
        console.log('error')
        
    }else{
        clearError(el)
    }
   })
   
}
//argument INPUT z funkcji "checkForm" przechowuje tablicę z inputami
//argument EL odnosi się do każej zmiennej, którą umieściliśmy w tablicy


const checkLength = (input, min) =>{

    if(input.value.length < min){
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} must be at least ${min} characters long.`)
    }
}

const checkPassword = (pass1, pass2) =>{
    if(pass1.value !== pass2.value){
        showError(pass2, 'The passwords do not match')
    }
}

const checkMail = email =>{

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
    if(re.test(email.value)){
        clearError(email)
    }else{
        showError(email, 'The e-mail is not correct')
    }
}

const checkErrors = () =>{
    const allInputs = document.querySelectorAll('.form-box')
    let errorCount = 0;

    allInputs.forEach(el=>{
        if(el.classList.contains('error')){
            errorCount++
        }
    })
if (errorCount===0){
    popup.classList.add('show-popup')
}

}


sendBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    checkForm([username, pass, pass2, email])
    checkLength(username, 3)
    checkLength(password, 8)
    checkPassword(pass, pass2)
    checkMail(email)
    checkErrors()
})

clearBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    [username, pass, pass2, email].forEach(el=> {
        el.value = ''
        clearError(el)
    })
})