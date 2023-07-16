export function navTag() {
  const parent = document.querySelector(".newsstand__media-nav");

  const nav = `
    <div class="newsstand__tab newsstand__tab-left">
        <div class="newsstand—text-clicked">전체 언론사</div>
        <div class="newsstand—text-unclicked">내가 구독한 언론사</div>
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
