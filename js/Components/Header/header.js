import { setHeaderDate } from "./headerDate.js";

export function Header() {
  document.addEventListener("DOMContentLoaded", () => {
    setHeaderDate();
  });

  return `
    <header class="header">
      <h1 class="header__title">
        <a href="/">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="header__title__logo"
          >
            <path
              d="M20 4.25V19C19.9998 19.1249 20.0463 19.2455 20.1305 19.3378C20.2147 19.4301 20.3304 19.4876 20.4548 19.4989C20.5793 19.5102 20.7034 19.4745 20.8028 19.3988C20.9023 19.3231 20.9697 19.2129 20.992 19.09L21 19V5.5H22.25C22.6892 5.50002 23.1123 5.66517 23.4354 5.96268C23.7585 6.26019 23.9579 6.6683 23.994 7.106L24 7.25V19.25C24.0001 20.0801 23.6824 20.8788 23.1123 21.4822C22.5422 22.0856 21.7628 22.448 20.934 22.495L20.75 22.5H3.25C2.41986 22.5001 1.62117 22.1824 1.01777 21.6123C0.414367 21.0422 0.0519987 20.2628 0.00500011 19.434L0 19.25V4.25C1.64046e-05 3.81081 0.165171 3.38768 0.46268 3.06461C0.760189 2.74154 1.1683 2.54214 1.606 2.506L1.75 2.5H18.25C18.6892 2.50002 19.1123 2.66517 19.4354 2.96268C19.7585 3.26019 19.9579 3.6683 19.994 4.106L20 4.25ZM7.747 11.504H5.25C4.81081 11.504 4.38768 11.6692 4.06461 11.9667C3.74154 12.2642 3.54214 12.6723 3.506 13.11L3.5 13.254V15.75C3.50002 16.1892 3.66517 16.6123 3.96268 16.9354C4.26019 17.2585 4.6683 17.4579 5.106 17.494L5.25 17.5H7.747C8.18635 17.5 8.60961 17.3347 8.93271 17.037C9.25581 16.7392 9.4551 16.3309 9.491 15.893L9.496 15.75V13.254C9.49623 12.8146 9.33119 12.3913 9.03366 12.068C8.73613 11.7447 8.32787 11.5452 7.89 11.509L7.747 11.504ZM15.75 16H12.25L12.148 16.007C11.9685 16.0317 11.804 16.1206 11.6849 16.2571C11.5658 16.3937 11.5002 16.5688 11.5002 16.75C11.5002 16.9312 11.5658 17.1063 11.6849 17.2429C11.804 17.3794 11.9685 17.4683 12.148 17.493L12.25 17.5H15.75L15.852 17.493C16.0315 17.4683 16.196 17.3794 16.3151 17.2429C16.4342 17.1063 16.4998 16.9312 16.4998 16.75C16.4998 16.5688 16.4342 16.3937 16.3151 16.2571C16.196 16.1206 16.0315 16.0317 15.852 16.007L15.75 16ZM5.25 13.004H7.747C7.80319 13.004 7.85772 13.023 7.90181 13.0578C7.9459 13.0927 7.97696 13.1413 7.99 13.196L7.997 13.254V15.75C7.99691 15.8063 7.9778 15.861 7.94277 15.9051C7.90774 15.9492 7.85884 15.9802 7.804 15.993L7.747 16H5.25C5.19368 15.9999 5.13904 15.9808 5.09493 15.9458C5.05083 15.9107 5.01984 15.8618 5.007 15.807L5 15.75V13.254C4.99987 13.1975 5.01887 13.1426 5.05392 13.0983C5.08897 13.054 5.13799 13.0229 5.193 13.01L5.25 13.004ZM15.75 11.504H12.25L12.148 11.51C11.9677 11.5339 11.8023 11.6225 11.6824 11.7592C11.5626 11.896 11.4965 12.0717 11.4965 12.2535C11.4965 12.4353 11.5626 12.611 11.6824 12.7478C11.8023 12.8845 11.9677 12.9731 12.148 12.997L12.25 13.004H15.75L15.852 12.997C16.0323 12.9731 16.1977 12.8845 16.3176 12.7478C16.4374 12.611 16.5035 12.4353 16.5035 12.2535C16.5035 12.0717 16.4374 11.896 16.3176 11.7592C16.1977 11.6225 16.0323 11.5339 15.852 11.51L15.75 11.504ZM15.75 6.997H4.25L4.148 7.004C3.96849 7.0287 3.80399 7.11755 3.68491 7.25414C3.56583 7.39072 3.50023 7.5658 3.50023 7.747C3.50023 7.9282 3.56583 8.10328 3.68491 8.23986C3.80399 8.37645 3.96849 8.4653 4.148 8.49L4.25 8.497H15.75L15.852 8.49C16.0315 8.4653 16.196 8.37645 16.3151 8.23986C16.4342 8.10328 16.4998 7.9282 16.4998 7.747C16.4998 7.5658 16.4342 7.39072 16.3151 7.25414C16.196 7.11755 16.0315 7.0287 15.852 7.004L15.75 6.997Z"
              fill="#4362D0"
            />
          </svg>
          뉴스스탠드
        </a>
      </h1>
      <div class="header__date"></div>
    </header>
  `;
}
