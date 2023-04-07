// для автоматического обновления html и css
// import './index.html';
import './css/main.css';
import './css/reset.css';
// import './css/normalize.css';

console.log('123')

let progressline = document.querySelector('#progress-line');
const slider = document.querySelector('#slider');
let button = document.querySelector('#generate-button');
let buttonText = document.querySelector('#generate-text');
const generatedPassword = document.querySelector('#generated-password');


const lengthNumber = document.querySelector('#length-number');

const checkboxes = document.querySelectorAll('.checkbox_input');
const strengthBars = document.querySelectorAll('.strength-bar');

const passwordStrengthName = document.querySelector('#password-strength-name');

const passStrength = ['NONE','MEDIUM', 'GOOD', 'STRONG', 'VERY STRONG'];

// CSS part......................................

//
// change length of the div before the slider, show password length
//
slider.addEventListener('input', function(){
    let length = ((12 - (20 - this.value))*(460/12));
    progressline.style.width = `${length}px`;
    lengthNumber.innerHTML = this.value;
});

//
// paint the strength bars in according with checked checkboxes and password's length
//

// first painting from html
let counter = 3;
for (let i = 0; i < 3; i++){
    strengthBars[i].classList.add('active');
};

//painting loop cooperated with functions below and counting strength points (COUNTER) from checkboxes
for (let check of checkboxes){
   
    check.addEventListener('click', function(e){

        if (check.checked) {
            counter++;
            calculateStrengthPoints();
            paintStrengthBar();
            disableLastCheckbox();
            generatePool(e);
            
        } 
        
        else {
            counter--;
            calculateStrengthPoints();
            paintStrengthBar();
            disableLastCheckbox();
            generatePool(e);
            
        }
    })
    
}

// disable / enable last checked checkbox TO MANY IFS! how to rewrite the function
function disableLastCheckbox(){
    for (let check of checkboxes){
      if (counter === 1){
          if (check.checked === true){
              check.checked = false;
              check.disabled = true;  
          }
        
      } else if (counter > 1){
          if (check.disabled === true){
              check.checked = true;
              check.disabled = false;  
          }
      }
      
  }  
  }

// count strength POINTS of passwords's length
let points = 1; // value from starting HTML
slider.addEventListener('input', function(){
    passwordLength = +lengthNumber.textContent;
    points = Math.floor((this.value - 8)/3);
    calculateStrengthPoints();
    paintStrengthBar();
})

// count TOTAL strength points (POINTS from slider + COUNTER from checkboxes)  to calculate strength of the password
let strPoints = 3; // value from starting HTML
function calculateStrengthPoints(){
    strPoints = counter + points;
}

// function paintStrengthBars and change password's strength name
let toWhichBarPaint;
function paintStrengthBar(){

    toWhichBarPaint = Math.ceil(strPoints/2);

    for (let i = toWhichBarPaint; i < strengthBars.length; i++){
        strengthBars[i].classList.remove('active');
    }

    for (let i = 0; i < toWhichBarPaint; i++){
        strengthBars[i].classList.add('active');
    }
// change strength name
    passwordStrengthName.textContent = passStrength[toWhichBarPaint]
}

//
// generate password
//

// lengthNumber
let passwordLength = +lengthNumber.textContent;

// function creates an array on NUM elements by dividing LENGTH to NUM random nums that summs into LENGTH
let numArr = [];
function rndQuantityOfCharactersNewArray (){
    numArr = [];
    rndQuantityOfCharacters(passwordLength, counter);
    return numArr}

// change NUM TO QUANTITY OF CHECKED CHECKBOXES and LENGTH TO PASSWORD LENGTH
function rndQuantityOfCharacters (length, num) {

    let newNum, restNum, maxNum, maxIndex;
    
    if (numArr.length == 0){

        maxNum = passwordLength;
        numArr.push(maxNum);

        rndQuantityOfCharacters (length, num);
    } else if (numArr.length < num) {

        maxNum = Math.max(...numArr);
        maxIndex = numArr.indexOf(maxNum);

        // delete max number using it's index maxIndex
        numArr.splice(maxIndex,1); 
        newNum = Math.ceil(Math.random() * (maxNum - 1));
        restNum = maxNum - newNum;

        numArr.unshift(newNum);
        numArr.push(restNum);

        rndQuantityOfCharacters (passwordLength, counter);

    }
}


// generate symbols pool of chosen checkboxes
let pool = ['uppercase', 'lowercase', 'numbers'] // starting pool from HTML
function generatePool(e){
    let currentCheckbox =  e.target.closest('input');
    if (currentCheckbox .checked){
        pool.push(e.target.closest('input').value);
  
    } 
    else {
        let indexOfPool = pool.indexOf(e.target.closest('input').value)
        pool.splice(indexOfPool, 1);
    }
    
}

// button
button.addEventListener('click', function(){
    rndQuantityOfCharactersNewArray ();
    generateObj();
    generateAndShowPassword();
})

// object generation
let obj = {};
function generateObj(){
    obj = {};
    let keys = [];
    for (let i = 0; i<pool.length; i++){
        keys[i] = `pool${i+1}`;
    }

    for (let i = 0; i<keys.length; i++){
        obj[keys[i]] = {name: pool[i], quantity: numArr[i]};
    }

    // console.log(obj)
}

// characters pool
let checkboxesValues = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!()-.?[]_`~;:@#$%^&*+=',

}

function generateAndShowPassword(){
    let compiledPool ='';
    let finalPassword = ''
    let keys = Object.keys(obj);
    for (let key of keys){
        for (let i = 0; i<obj[key].quantity; i++){
            compiledPool += checkboxesValues[obj[key].name].charAt(Math.floor(Math.random() * checkboxesValues[obj[key].name].length));
        }
    }
    finalPassword = compiledPool.split("").sort(function(){return 0.5-Math.random()}).join("");
    generatedPassword.textContent = finalPassword;
    return finalPassword;

}

//
// copy generated password
//
let copyText = document.querySelector('#Layer_1')

copyText.addEventListener('click', ()=>{
    navigator.clipboard.writeText(generatedPassword.textContent)
})