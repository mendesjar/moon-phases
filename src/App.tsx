import { ChangeEvent, useRef, useState } from "react";
import LogoMarca from "./assets/logo-marca.svg";
import MoonAnimation from "./assets/moon-phases-animation.svg";
import { motion } from "framer-motion";

function App() {
  const [rangeValue, setRangeValue] = useState<number>(0);
  const moonRef = useRef(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRangeValue(value);
  };
  let positions: any = {
    0: 0,
    20: 17,
    40: 34,
    60: 51,
    80: 68,
    100: 85,
    120: 102,
  };

  return (
    <main className="bg-blue-950 h-dvh p-3">
      <div className="h-full w-full p-5 bg-main rounded-3xl md:rounded-[3rem] shadow-main border-2 border-opacity-65 border-white">
        <div className="flex justify-center max-h-8 md:max-h-12 h-1/5">
          <img src={LogoMarca} alt="Logo Marca" />
        </div>
        <div className="h-[17rem] flex flex-col overflow-hidden mt-5">
          <motion.img
            id="teste"
            ref={moonRef}
            className="max-h-[120rem]"
            src={MoonAnimation}
            alt="Moon Animation"
            animate={{
              opacity: 1,
              translateY: -positions[rangeValue] + "rem",
            }}
            initial={{ opacity: 0, translateY: "-8rem" }}
          />
        </div>
        <div className="flex justify-center mt-5 h-1/5">
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
