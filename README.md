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

## Feel free to edit my code

Image class

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

To create a new par in the array

```
const imgsGame = [imagen1 = new imagenes("imgPizza", "https://saboryestilo.com.mx/wp-content/uploads/elementor/thumbs/masa-para-pizza-3-1-os3aa3ck56334eoe88d8hkem59xt1jziomikxlzx34.jpg"),
    imagen2 = new imagenes("imgPaella", "https://www.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-m.jpg"),
    imagen3 = new imagenes("imgBife", "https://cdn2.cocinadelirante.com/sites/default/files/images/2019/04/como-sauvizar-carnes.jpg"),
    imagen4 = new imagenes("imgManzana","https://www.cuerpomente.com/medio/2020/11/10/manzana_a1c5bdb0_1200x1200.jpg"),
    imagen5 = new imagenes("imgPera","https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg"),
    imagen6 = new imagenes("imgCoco","https://i.blogs.es/f63b6d/coco/450_1000.jpg")]
```

Sort array

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

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![MemoryGame-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/memorygame-0.jpg)

![MemoryGame-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/memorygame-1.jpg)

![MemoryGame-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/memorygame-2.jpg)

![MemoryGame-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/memorygame-3.jpg)

![MemoryGame-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/memorygame-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Memory%20game%20page`

## Video
