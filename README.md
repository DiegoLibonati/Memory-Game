# Memory-Game-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

I made a web page that allows you to play the memory game. You have to find the even cards, to know which ones are even you have to search among the different foods, if you find two apples you add points and you add a pair. Once you finish playing and you have found all your pairs it will calculate the time it took you to finish.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/53`](https://www.diegolibonati.com.ar/#/project/53)

## Video

https://user-images.githubusercontent.com/99032604/199362752-8b5ac366-0a04-47f6-8f8c-0e49d06621bc.mp4

## Documentation

The `images` class will be used to create a new card. It will be passed a constructor that will have as attributes the `id` and the `image` and also a method called `textInner()` that will serve as a clickable button element:

```
class imagenes{
    constructor(id, imagen){
        this.id = id;
        this.imagen = imagen;
    }

    textInner(){
        return `<button class="buttons ${this.id}" data-id="${this.id}"><img src="${this.imagen}" class="imagen ${this.id}"></button>`
    }
}
```

In this array called `imgsGame` we are going to store all the objects that we instantiate from the `image` class:

```
const imgsGame = [imagen1 = new imagenes("imgPizza", "https://saboryestilo.com.mx/wp-content/uploads/elementor/thumbs/masa-para-pizza-3-1-os3aa3ck56334eoe88d8hkem59xt1jziomikxlzx34.jpg"),
    imagen2 = new imagenes("imgPaella", "https://www.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-m.jpg"),
    imagen3 = new imagenes("imgBife", "https://cdn2.cocinadelirante.com/sites/default/files/images/2019/04/como-sauvizar-carnes.jpg"),
    imagen4 = new imagenes("imgManzana","https://www.cuerpomente.com/medio/2020/11/10/manzana_a1c5bdb0_1200x1200.jpg"),
    imagen5 = new imagenes("imgPera","https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg"),
    imagen6 = new imagenes("imgCoco","https://i.blogs.es/f63b6d/coco/450_1000.jpg")]
```

This function will allow us to sort the array we pass to it randomly:

```
function orderImg(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
```

We will create two arrays because we want to generate two pairs, then we will push equal parts of the cards to each array from the `imgsGame` array and finally we will randomly order both arrays with `orderImg()`:

```
let imgGame = [];
let imgGameClone = [];

for (i in imgsGame){
    imgGame.push(imgsGame[i]);
    imgGameClone.push(imgsGame[i]);
}

const sfarray = orderImg(imgGame);
const sfarray2 = orderImg(imgGameClone);
```

A button is added to each image:

```
for (i=0; i < imgGame.length; i++){
    document.querySelector(".imagenes").innerHTML += sfarray[i].textInner()
    document.querySelector(".imagenes").innerHTML += sfarray2[i].textInner()
}
```
