import { ChangeEvent, useState } from "react";
import LogoMarca from "./assets/logo-marca.svg";
import MoonAnimation from "./assets/moon-phases-animation.svg";

function App() {
  const [rangeValue, setRangeValue] = useState<number>(0);
  let idx: any = {
    0: 0,
    20: 17,
    40: 34,
    60: 51,
    80: 68,
    100: 85,
    120: 102,
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setRangeValue(value);

    const moon = document.getElementById("teste");
    if (moon) {
      const pos = idx[value];
      moon.style.transform = `translateY(-${pos}rem)`;
    }
  }

  return (
    <main className="bg-blue-100 h-[100dvh] p-3">
      <div className="h-full w-full p-5 bg-main rounded-3xl md:rounded-[3rem] shadow-main border-2 border-opacity-65 border-white">
        <div className="flex justify-center max-h-8 md:max-h-10">
          <img src={LogoMarca} alt="Logo Marca" />
        </div>
        <div className="h-[17rem] flex flex-col overflow-hidden mt-5">
          <img
            id="teste"
            className="max-h-[120rem] transition ease-in-out duration-500"
            src={MoonAnimation}
            alt="Moon Animation"
          />
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="range"
            name="afas"
            id="aafs"
            onChange={(e) => handleInputChange(e)}
            value={rangeValue}
            defaultValue={0}
            min={0}
            max={120}
            step={20}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
