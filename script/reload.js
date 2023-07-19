const header = document.querySelector(".header-left");

function handleReload(){
    header.addEventListener("click", () => {
        location.reload();
    })
}

export {handleReload}