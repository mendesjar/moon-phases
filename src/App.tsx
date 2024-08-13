import { ChangeEvent, useRef, useState } from "react";
import LogoMarca from "./assets/logo-marca.svg";
import MoonAnimation from "./assets/moon-phases-animation.svg";
import { motion } from "framer-motion";

interface PositionInterface {
  [key: number]: { y: number; phase: string };
}

function App() {
  const [rangeValue, setRangeValue] = useState<number>(20);
  const moonRef = useRef(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRangeValue(value);
  };

  let positions: PositionInterface = {
    0: { y: 0, phase: "Nova" },
    20: { y: 18, phase: "Minguante" },
    40: { y: 35.8, phase: "Quarto Minguante" },
    60: { y: 53.5, phase: "Gibosa Minguante" },
    80: { y: 71.3, phase: "Cheia" },
    100: { y: 89, phase: "Gibosa Crescente" },
    120: { y: 106.8, phase: "Quarto Crescente" },
    140: { y: 124.7, phase: "Crescente" },
    160: { y: 142.2, phase: "Nova" },
  };

  return (
    <main className="bg-blue-950 h-dvh p-3">
      <div className="bg-gd-white flex justify-center items-center p-1 rounded-3xl md:rounded-[3.25rem] h-full w-full">
        <div className="h-full w-full p-5 bg-main rounded-3xl md:rounded-[3rem] shadow-main ">
          <div className="flex justify-center max-h-8 md:max-h-12 h-1/5">
            <img src={LogoMarca} alt="Logo Marca" />
          </div>
          <div className="h-[17rem] flex flex-col overflow-hidden mt-5">
            <motion.img
              id="teste"
              ref={moonRef}
              className="max-h-[160rem]"
              src={MoonAnimation}
              alt="Moon Animation"
              animate={{
                opacity: 1,
                translateY: -positions[rangeValue].y + "rem",
              }}
              initial={{ opacity: 0, translateY: "-8rem" }}
            />
          </div>
          <div className="flex justify-center mt-5">
            <div className="bg-gd-white flex justify-center items-center p-[0.18rem] rounded-full">
              <input
                type="range"
                name="afas"
                id="aafs"
                onChange={(e) => handleInputChange(e)}
                value={rangeValue}
                defaultValue={0}
                min={0}
                max={160}
                step={20}
              />
            </div>
          </div>
          <motion.p
            className="text-center mt-4 text-white text-2xl uppercase"
            animate={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: "-2rem" }}
          >
            {positions[rangeValue].phase}
          </motion.p>
        </div>
      </div>
    </main>
  );
}

export default App;
