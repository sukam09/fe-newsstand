const header = document.querySelector(".header-left");

function listenReload(){
    header.addEventListener("click", () => {
        location.reload();
    })
}

export {listenReload}