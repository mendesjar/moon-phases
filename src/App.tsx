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
    0: { y: 0, phase: "Minguante" },
    20: { y: 17.5, phase: "Quarto Minguante" },
    40: { y: 35, phase: "Gibosa Minguante" },
    60: { y: 52.5, phase: "Cheia" },
    80: { y: 70, phase: "Gibosa Crescente" },
    100: { y: 87.5, phase: "Quarto Crescente" },
    120: { y: 105, phase: "Crescente" },
    140: { y: 122.5, phase: "Nova" },
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
              className="max-h-[140rem]"
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
                max={140}
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
