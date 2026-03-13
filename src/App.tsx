import { LunarPhase, Moon } from "lunarphase-js";
import { HemisphereHelper } from "./helpers";
import { ReactNode, useEffect, useRef, useState } from "react";

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
    <div className="inline-block align-top border-gradient p-px rounded-xl">
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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const dates = Array.from(
    { length: lastDay },
    (_, i) => new Date(year, month, i + 1),
  );

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatLabel = (d: Date) => {
    const today = new Date();
    if (isSameDay(d, today)) return "Today";
    const day = d.getDate();
    const monthLabel = d.toLocaleString(LOCALE, { month: "short" });
    return `${day} ${monthLabel}`;
  };

  useEffect(() => {
    const todayIndex = dates.findIndex((d) => isSameDay(d, new Date()));
    const container = scrollRef.current;
    const el = itemRefs.current[todayIndex];
    if (container && el && todayIndex >= 0) {
      requestAnimationFrame(() => {
        const left =
          el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
        container.scrollTo({ left, behavior: "smooth" });
      });
    }
  }, [dates]);

  return (
    <div className="p-5 flex flex-col items-center gap-y-6 justify-center min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-center gap-y-8 w-full">
        <div className="relative w-full max-w-full">
          <div
            ref={scrollRef}
            className="flex gap-x-3 py-2 w-full overflow-x-auto px-4 hide-scrollbar mask-x-from-50% mask-x-to-99%"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {dates.map((dt, idx) => {
              const phase = Moon.lunarPhase(dt, {
                hemisphere: hemisphere.get(),
              });
              const label = formatLabel(dt);
              return (
                <div
                  key={dt.toISOString()}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className="shrink-0"
                >
                  <ItemPhase phase={phase} date={dt} label={label} />
                </div>
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
        <div className="border-gradient p-px rounded-xl">
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
