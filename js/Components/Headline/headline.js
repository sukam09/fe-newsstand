import { useEffect, useState } from "../../core/index.js";
import { HeadlineContent } from "./headlineContent.js";
import { getRollingData } from "./Function/getRollingData.js";
import { setRolling } from "./Function/rolling.js";

export function Headline() {
  const [rollingData, setRollingData] = useState([]);

  useEffect(async () => {
    const getData = await getRollingData();
    setRollingData(getData);
    setRolling();
  }, []);

  return `
    <section class="headline">
      ${HeadlineContent({ rollingData: rollingData.slice(0, 5) })}
      ${HeadlineContent({ rollingData: rollingData.slice(5) })}
    </section>
  `;
}
