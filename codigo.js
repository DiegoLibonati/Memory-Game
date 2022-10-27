class imagenes{
    constructor(id, imagen){
        this.id = id;
        this.imagen = imagen;
    }

    textInner(){
        return `<button class="buttons ${this.id}" data-id="${this.id}"><img src="${this.imagen}" class="imagen ${this.id}"></button>`
    }
}

const imgsGame = [imagen1 = new imagenes("imgPizza", "https://saboryestilo.com.mx/wp-content/uploads/elementor/thumbs/masa-para-pizza-3-1-os3aa3ck56334eoe88d8hkem59xt1jziomikxlzx34.jpg"),
    imagen2 = new imagenes("imgPaella", "https://www.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-m.jpg"),
    imagen3 = new imagenes("imgBife", "https://cdn2.cocinadelirante.com/sites/default/files/images/2019/04/como-sauvizar-carnes.jpg"),
    imagen4 = new imagenes("imgManzana","https://www.cuerpomente.com/medio/2020/11/10/manzana_a1c5bdb0_1200x1200.jpg"),
    imagen5 = new imagenes("imgPera","https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg"),
    imagen6 = new imagenes("imgCoco","https://i.blogs.es/f63b6d/coco/450_1000.jpg")]

function orderImg(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let imgGame = [];
let imgGameClone = [];

for (i in imgsGame){
    imgGame.push(imgsGame[i]);
    imgGameClone.push(imgsGame[i]);
}

const sfarray = orderImg(imgGame);
const sfarray2 = orderImg(imgGameClone);


for (i=0; i < imgGame.length; i++){
    document.querySelector(".imagenes").innerHTML += sfarray[i].textInner()
    document.querySelector(".imagenes").innerHTML += sfarray2[i].textInner()
}

const btns = document.querySelectorAll(".buttons");
const bgImg = document.querySelectorAll(".imagen");

let isTrue = [];
let value;
let readyGo = startCount();

document.querySelector(".imagenes").addEventListener("click", startCount, true);
document.querySelector(".imagenes").removeEventListener("click", startCount, true);



btns.forEach(function(btn){
    btn.addEventListener("click", (e)=>{
        e.preventDefault();

        value = e.currentTarget.dataset.id;
        bg = e.currentTarget.children[0];

        rImg(bg,1);

        gameFunction(e);

        console.log(isTrue)

    });
});

let endGame = [];

function gameFunction(e){

    if (isTrue.includes(value)){
        console.log("Esta")
        
        isTrue.push(value);
            document.querySelectorAll(`.${value}`).forEach(function(img){
                 img.disabled = true;
                 img.classList.remove("imagen");
                 img.classList.remove(`${value}`);
            })

        let contador = "+";

        endGame.push(contador);

        if (endGame.length == imgGame.length){
            console.log("Terminaste")
            const end = new Date()
            finalTime = end.getTime() - readyGo.getTime();
            inSec = Math.floor(finalTime / 1000);
            document.querySelector(".tiempo h2").innerHTML = `Finish the game in ${inSec} seconds. Congrats`;
        }

        isTrue = [];

    } else{
        console.log("No esta")

        isTrue.push(value);

        if (isTrue.length > 1){

            for (i of isTrue){

                document.querySelectorAll(".imagen", `.${i}`).forEach(function(img){
                        setTimeout(function() {rImg(img, 0);}, 250);
                })
            }
            isTrue=[];
        }
    }
}

function rImg(img,v){
    img.style.opacity = `${v}`;
}

function startCount(){
 const start = new Date();
 return start
}

