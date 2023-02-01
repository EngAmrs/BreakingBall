
const loading = document.getElementById("loading");
loading.style.opacity = 1;
setTimeout(()=>{
   let x = setInterval(() =>{

        loading.style.opacity -= 0.01

        if(loading.style.opacity == 0.02){
        loading.style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = "inherit";
        clearInterval(x);
}
    },10)
}, 1500)
