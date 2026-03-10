import { LunarPhase, Moon } from "lunarphase-js";
import { HemisphereHelper } from "./helpers";
import { ReactNode, useEffect, useState } from "react";

const LOCALE: string = "pt-BR";

function ItemPhase({
  phase,
  date,
  label,
}: {
  phase: LunarPhase;
  date: Date;
  label: string;
}) {
  const emoji = Moon.emojiForLunarPhase(phase);
  return (
    <div className="inline-block align-top bg-linear-60 from-white to-transparent p-px rounded-xl">
      <div
        className="bg-blue-400 flex flex-col items-center gap-y-3 p-3 min-w-20 rounded-xl"
        title={date.toDateString()}
      >
        <span className="text-sm">{label}</span>
        <div className="relative">
          <p className="text-5xl">{emoji}</p>
          <div className="absolute bottom-0 -right-2">
            <span className="text-xs bg-white/75 text-black rounded-sm py-0.2 px-1.5">
              {new Date(date).toLocaleString(LOCALE, { weekday: "short" })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemDetails({ children }: { children: ReactNode }) {
  return (
    <div className="bg-blue-900 flex px-2.5 font-light py-1 rounded-md text-sm">
      {children}
    </div>
  );
}

function LiveTime() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString(LOCALE, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(LOCALE, {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

function App() {
  const hemisphere = new HemisphereHelper();
  const offsets = [-2, -1, 0, 1, 2];
  const dates = offsets.map((o) => {
    const d = new Date();
    d.setDate(d.getDate() + o);
    return d;
  });

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatLabel = (d: Date) => {
    const today = new Date();
    if (isSameDay(d, today)) return "Today";
    const day = d.getDate();
    const month = d.toLocaleString(LOCALE, { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <div className="p-5 flex flex-col items-center gap-y-6 justify-center min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-center gap-y-8 w-full">
        <div className="relative w-full max-w-full">
          <div className="flex gap-x-3 w-full md:w-max py-2 mask-x-from-50% mask-x-to-96%">
            {dates.map((dt) => {
              const phase = Moon.lunarPhase(dt, {
                hemisphere: hemisphere.get(),
              });
              const label = formatLabel(dt);
              return (
                <ItemPhase
                  key={dt.toISOString()}
                  phase={phase}
                  date={dt}
                  label={label}
                />
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-md font-bold text-center mb-2">
            {Moon.lunarPhase(new Date())}
          </p>
          <div className="flex gap-x-2">
            <ItemDetails>Today</ItemDetails>
            <ItemDetails>
              {String(hemisphere.get()) === "northern"
                ? "Northern"
                : "Southern"}
            </ItemDetails>
            <ItemDetails>
              <LiveTime />
            </ItemDetails>
          </div>
        </div>
        <span className="bg-linear-90 to-transparent via-white from-transparent w-full h-px" />
        <div className="bg-linear-130 from-white to-transparent p-px rounded-xl">
          <div className="bg-blue-900 px-6 py-2 rounded-xl min-w-50">
            <span className="text-xs">Distance:</span>
            <p className="text-md">{Moon.lunarDistance().toFixed(3)} mi</p>
          </div>
        </div>
      </div>
      <p className="fixed right-10 bottom-1/3 -translate-y-1/2 -rotate-90 origin-right font-light">
        MOON PHASES
      </p>
    </div>
  );
}

export default App;
