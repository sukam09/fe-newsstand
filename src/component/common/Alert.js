import State from "../../store/StateStore.js";
import SubscribeStore from "../../store/SubscribeStore.js";
import renderMain from "../main/renderMain.js";

function makeModal(){   
    const mainCenter = document.querySelector("#main-center");
    const modal = document.createElement("div");
    modal.classList.add("alert-container");
    modal.style.display = "none";
    modal.innerHTML = " ";
    modal.innerHTML = 
    `
        <div class="alert-message">
            <span class="display-bold16"></span>을(를) <br />
            구독해지하시겠습니까?
        </div>
        <div class="alert-button-container">
            <div class="alert-confirm">예, 해지합니다</div>
            <div class="alert-cancel">아니오</div>
        </div>
    `;
    mainCenter.appendChild(modal);
}

function addModalClickEvent(){
    let categoryNum = State.getCategoryNum();
    let categoryMAX = State.getMaxCategoryNum();
    const target_Btn =  document.querySelector(".alert-button-container");
    const pressSpan = document.querySelector(".display-bold16");
    
    target_Btn.addEventListener("click", ({ target, currentTarget }) => {
        if (target.classList.contains("alert-confirm")) {
            SubscribeStore.removeSubscribe(SubscribeStore.getSubscribeByName(pressSpan.innerHTML));
            //리스트에서 마지막 삭제 시 예외처리
            if(categoryNum === categoryMAX){
                State.setCategoryNum(--categoryNum);
            }
            currentTarget.parentNode.style.display = "none";  
            renderMain();
            
        } else if (target.classList.contains("alert-cancel")) {
            currentTarget.parentNode.style.display = "none";
        }
    });
}

export { makeModal, addModalClickEvent };