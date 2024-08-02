import LogoMarca from "./assets/logo-marca.svg";
import MoonAnimation from "./assets/moon-phases-animation.svg";

function App() {
  return (
    <main className="bg-blue-100 h-[100dvh] p-3">
      <div className="h-full w-full p-5 bg-main rounded-3xl md:rounded-[3rem] shadow-main border-2 border-opacity-65 border-white">
        <div className="flex justify-center max-h-8 md:max-h-10">
          <img src={LogoMarca} alt="Logo Marca" />
        </div>
        <div className="h-[17rem] flex flex-col overflow-hidden mt-5">
          <img
            className="moon max-h-[120rem] transition-all"
            src={MoonAnimation}
            alt="Moon Animation"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
