let currentScreen = 0;

const screens =
document.querySelectorAll(".screen");

const progressBar =
document.getElementById(
    "progressBar"
);

/* ==========================
   PROGRESO
========================== */

function updateProgress(){

    const progress =
    ((currentScreen + 1) /
    screens.length) * 100;

    progressBar.style.width =
    progress + "%";

}

function nextScreen(){

    screens[currentScreen]
    .classList.remove("active");

    currentScreen++;

    if(
        currentScreen >=
        screens.length
    ){

        currentScreen =
        screens.length - 1;

    }

    screens[currentScreen]
    .classList.add("active");

    updateProgress();

    if(currentScreen === 4){

        mostrarTimeline();

    }

    if(
        currentScreen ===
        screens.length - 1
    ){

        lanzarConfeti();

    }

}

function prevScreen(){

    if(currentScreen > 0){

        screens[currentScreen]
        .classList.remove("active");

        currentScreen--;

        screens[currentScreen]
        .classList.add("active");

        updateProgress();

    }

}

function goHome(){

    screens[currentScreen]
    .classList.remove("active");

    currentScreen = 0;

    screens[currentScreen]
    .classList.add("active");

    updateProgress();

}

/* ==========================
   MUSICA
========================== */

function playSong(
    song,
    element
){

    const music =
    document.getElementById(
        "musica"
    );

    music.src = song;

    music.play();

    document
    .querySelectorAll(".song")
    .forEach(item => {

        item.classList.remove(
            "active-song"
        );

    });

    if(element){

        element.classList.add(
            "active-song"
        );

    }

}

function toggleMusic(){

    const music =
    document.getElementById(
        "musica"
    );

    const button =
    document.querySelector(
        ".music-controls button"
    );

    if(music.paused){

        music.play();

        button.innerHTML =
        "⏸️ Pausar Música";

    }else{

        music.pause();

        button.innerHTML =
        "▶️ Reanudar Música";

    }

}

/* ==========================
   MENSAJE FINAL
========================== */

function showFuture(){

    const future =
    document.getElementById(
        "futureMessage"
    );

    future.style.display =
    "block";

    future.scrollIntoView({

        behavior:"smooth"

    });

}

function finishSurprise(){

    const end =
    document.getElementById(
        "endMessage"
    );

    end.style.display =
    "block";

    end.scrollIntoView({

        behavior:"smooth"

    });

}

/* ==========================
   LINEA DEL TIEMPO
========================== */

function mostrarTimeline(){

    const items =
    document.querySelectorAll(
        ".timeline-item"
    );

    items.forEach(
        (item,index)=>{

            setTimeout(()=>{

                item.classList.add(
                    "timeline-show"
                );

            }, index * 500);

        }
    );

}

/* ==========================
   CONFETI
========================== */

const canvas =
document.getElementById(
    "confetti"
);

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const confetti = [];

function crearConfeti(){

    for(
        let i = 0;
        i < 200;
        i++
    ){

        confetti.push({

            x:
            Math.random() *
            canvas.width,

            y:
            Math.random() *
            canvas.height -
            canvas.height,

            size:
            Math.random() * 8 + 4,

            speed:
            Math.random() * 3 + 2,

            color:[
                "#ffffff",
                "#ffd166",
                "#72f1b8",
                "#d8c4ff",
                "#9d7dff"
            ][
                Math.floor(
                    Math.random()*5
                )
            ]

        });

    }

}

function dibujarConfeti(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    confetti.forEach(c=>{

        ctx.fillStyle =
        c.color;

        ctx.fillRect(
            c.x,
            c.y,
            c.size,
            c.size
        );

        c.y += c.speed;

        if(
            c.y >
            canvas.height
        ){

            c.y = -10;

        }

    });

    requestAnimationFrame(
        dibujarConfeti
    );

}

function lanzarConfeti(){

    if(
        confetti.length === 0
    ){

        crearConfeti();

        dibujarConfeti();

    }

}

/* ==========================
   ESTRELLAS FUGACES
========================== */

setInterval(()=>{

    const estrella =
    document.createElement(
        "div"
    );

    estrella.style.position =
    "fixed";

    estrella.style.width =
    "3px";

    estrella.style.height =
    "3px";

    estrella.style.background =
    "white";

    estrella.style.boxShadow =
    "0 0 15px white";

    estrella.style.left =
    Math.random() *
    window.innerWidth +
    "px";

    estrella.style.top =
    "-10px";

    estrella.style.zIndex =
    "999";

    estrella.style.pointerEvents =
    "none";

    document.body.appendChild(
        estrella
    );

    let y = -10;

    const animar =
    setInterval(()=>{

        y += 8;

        estrella.style.top =
        y + "px";

        estrella.style.left =
        parseFloat(
            estrella.style.left
        ) + 2 + "px";

        if(
            y >
            window.innerHeight
        ){

            clearInterval(
                animar
            );

            estrella.remove();

        }

    },16);

},3000);

/* ==========================
   RESPONSIVE
========================== */

window.addEventListener(
    "resize",
    ()=>{

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

    }
);

updateProgress();