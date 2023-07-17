import { useEffect, useState } from "../../core/index.js";
import { HeadlineContent } from "./headlineContent.js";
import { setRolling } from "./Function/rolling.js";
import { getRollingData } from "./Function/getRollingData.js";

export function Headline() {
  const [rollingData, setRollingData] = useState([]);

  useEffect(async () => {
    const getData = await getRollingData();
    setRollingData(getData);
  }, []);

  document.addEventListener("DOMContentLoaded", () => {
    const timer = setInterval(() => {
      const $ul = document.querySelector(".headline__content_rolling > ul");
      if ($ul) {
        setRolling();
        clearInterval(timer);
      }
    }, 100);
  });

  return `
    <section class="headline">
      ${HeadlineContent({ rollingData: rollingData.slice(0, 5) })}
      ${HeadlineContent({ rollingData: rollingData.slice(5) })}
    </section>
  `;
}
