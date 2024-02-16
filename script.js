const bigFun = () => {
    //function to randomly generate a number between 0 to 255
    const randNumGen = () => Math.floor(Math.random() * 256);


    //function to generate a string with random rgb values in it e.g. rgb(148, 171, 172), when called
    const colorGen = (gen) => {
        return 'rgb(' + gen() + ', ' + gen() + ', ' + gen() +')';
    }


    //calling colorGen(high-order) fn with a callback(randNumGen) fn to generate random rgb values
    const clr1 = colorGen(randNumGen);
    const clr2 = colorGen(randNumGen);
    const clr3 = colorGen(randNumGen);
    const clr4 = colorGen(randNumGen);
    const clr5 = colorGen(randNumGen);
    const clr6 = colorGen(randNumGen);

    //combining above 6 random colors to make a color string array
    const c = [clr1, clr2, clr3, clr4, clr5, clr6];
    // console.log(c);

    //code to randomly select one color out of above 6 colors present in above array
    const randIndex = Math.floor(Math.random() * c.length);
    const randColor = c[randIndex];
    randomColor = randColor;

    //creating h1 tag and adding a random rgb value inside it and appending h1 to the div
    const colorText = document.getElementById('main');
    const h1 = document.createElement('h1');
    h1.innerText = randColor;
    colorText.append(h1);


    //function to use a callback fn(which gives ref to an HTML element), and changes its background color using above generated random rgb values, when called
    const blockColor = (clr, cb, id) => {
        const el = cb(id);
        // console.log(ab);
        el.style.backgroundColor = clr;
    }

    //function to get HTML element using id
    const getId = (id) => document.getElementById(id);
    // const x = getId('one');

    //combining above both functions to change background color of each particular block
    blockColor(clr1, getId, 'one');
    blockColor(clr2, getId, 'two');
    blockColor(clr3, getId, 'three');
    blockColor(clr4, getId, 'four');
    blockColor(clr5, getId, 'five');
    blockColor(clr6, getId, 'six');
}

let randomColor;
bigFun();


// console.log(x.style.backgroundColor);

// const abc = document.getElementById("one");
// console.log(abc.style.backgroundColor);
// abc.style.backgroundColor = 'clr2';

let sc = 0, atmpt = 3;

//making div as button
const button = document.getElementsByClassName('block');
console.log(button);

const checkAnswer = (bg) => {
    const e = document.getElementById('ans');
            if(bg === randomColor){
                e.innerText = 'Correct answer';
                e.style.color = 'green';
                sc++;

                //code to increase the score when right option is selected
                const s = document.getElementById('scr');
                s.innerText = 'Score: ' + sc;

                setTimeout(() => {
                    const colorText = document.getElementById('main');
                    colorText.innerHTML = '';
                    e.innerText = '';
                    atmpt = 3;
                    const a = document.getElementById('at');
                    a.innerText = 'Attempts Remaining: ' + atmpt;
                    bigFun();
                }, 1000);
                
            }
            else{
                e.innerText = 'Incorrect answer';
                e.style.color = 'red';
                atmpt--;
                // console.log("Attempts: ", atmpt);

                //code to decrease the attempts remaining when wrong option is selected
                const a = document.getElementById('at');
                a.innerText = 'Attempts Remaining: ' + atmpt;

                setTimeout(() => e.innerText = '', 500);

                if(atmpt === 0){
                    const e = document.getElementById('ans');
                    e.style.display = 'none';
                    const ft = document.getElementById('footer');
                    const x = document.getElementById('btn1');
                    if(!x){
                        const btn = document.createElement('div');
                        btn.setAttribute('class', 'btn1');
                        btn.setAttribute('id', 'try');
                        btn.innerText = 'Try Again';
                        ft.insertBefore(btn, ft.children[1]);
                        const restart = document.getElementById('restart');
                        restart.style.display = 'none';
                        btn.addEventListener('click', () => location.reload());
                    }
                }
            }
}

//Function for, when color blocks clicked using mouse
for(let i=0; i<button.length; i++){
    button[i].addEventListener('click', () => {
        if(atmpt > 0){
            const computedStyle = getComputedStyle(button[i]);  // console.log(computedStyle); //returns all the CSS applied to the object
            const bg = computedStyle.backgroundColor;           // console.log(bg); //returns backgroundColor value only
        
            checkAnswer(bg);
        }
    });
}



//Function for, when color blocks clicked using keys
document.addEventListener('keypress', (event) => {
    // debugger;
    const key = event.key;

    if(key === 'r'){
        // console.log('r pressed');
        document.getElementById('restart').click();
    }

    if(key === 't'){
        // console.log('t pressed');
        const b = document.getElementById('try');
        if(b !== null) b.click();
    }

    const keyAsNum = parseInt(key);
    if(isNaN(keyAsNum)) return;
    if(keyAsNum > 6 || keyAsNum <= 0)   return;

    //key[1-6]
    const el = document.querySelector(`#section2 :nth-child(${keyAsNum})`);
    if(atmpt > 0) {
        if(el) {
            el.click();
        }
    }
})


const restart = document.getElementById('restart');
restart.addEventListener('click', () => location.reload());