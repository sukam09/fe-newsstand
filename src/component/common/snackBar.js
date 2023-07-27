
function makeSnackBar(){   
    const mainCenter = document.querySelector("#main-center");
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.style.display = "none";
    snackbar.innerHTML = "내가 구독한 언론사에 추가되었습니다.";
    mainCenter.appendChild(snackbar);
}

export { makeSnackBar };