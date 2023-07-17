import { useEffect, useMemo, useState } from "./core/index.js";

export function ExampleComponent() {
  const [work, setWork] = useState(1);
  const [time, setTime] = useState(1);
  const [sadness, setSadness] = useState(1);

  const totalTimes = useMemo(() => work * time, [work, time]);

  useEffect(() => {
    console.log("work has been changed into", work);
  }, [work]);

  window.moreWork = () => setWork(work + 1);
  window.lessWork = () => setWork(work - 1);
  window.moreTime = () => setTime(time + 1);
  window.lessTime = () => setTime(time - 1);
  window.moreSadness = () => setSadness(sadness + 1);
  window.lessSadness = () => setSadness(sadness - 1);

  return `
    <div>
      <p>남은 일 개수: ${work}</p>
      <button onclick="moreWork()">증가</button>
      <button onclick="lessWork()">감소</button>

      <p>소요 시간: ${time}</p>
      <button onclick="moreTime()">증가</button>
      <button onclick="lessTime()">감소</button>

      <p>총 걸리는 시간은 ${work} * ${time} = ${totalTimes}이다.</p>

      <p>슬픔 정도: ${sadness}</p>
      <button onclick="moreSadness()">증가</button>
      <button onclick="lessSadness()">감소</button>
    </div>
  `;
}
