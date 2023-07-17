const ALL_PUBLISHER = "전체 언론사";
const SUBSCRIBE_PUBLISHER = "내가 구독한 언론사";

export function navTag() {
  const parent = document.querySelector(".newsstand__media-nav");

  const nav = `
    <div class="newsstand__tab newsstand__tab-left">
        <div class="newsstand—text-clicked">${ALL_PUBLISHER}</div>
        <div class="newsstand—text-unclicked">${SUBSCRIBE_PUBLISHER}</div>
    </div>
    <div class="newsstand__tab">
        <button>
        <img
            class="newsstand—btn-list"
            src="./assets/basicIcon/list-symbol.svg"
            alt=""
        />
        </button>
        <button>
        <img
            class="newsstand-btn-thumb"
            src="./assets//basicIcon/grid-symbol-selected.svg"
            alt=""
        />
        </button>
    </div>
    `;

  parent.innerHTML += nav;
}
