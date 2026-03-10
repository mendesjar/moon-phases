import { LunarPhase, Moon } from "lunarphase-js";
import { HemisphereHelper } from "./helpers";

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
    <div className="bg-linear-60 from-white to-transparent p-px rounded-xl">
      <div
        className="bg-blue-400 flex flex-col items-center gap-y-3 p-3 min-w-20 rounded-xl"
        title={date.toDateString()}
      >
        <span className="text-sm">{label}</span>
        <div className="relative">
          <p className="text-5xl">{emoji}</p>
          <div className="absolute bottom-0 -right-2">
            <span className="text-xs bg-white/75 text-black rounded-sm py-0.2 px-1.5">
              {new Date(date).toLocaleString("en-US", { weekday: "short" })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
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
    const month = d.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <div className="p-5 flex flex-col items-center gap-y-6">
      <div className="flex flex-col items-center gap-y-3">
        <div className="flex gap-x-3 w-max mask-x-from-50% mask-x-to-96%">
          {dates.map((dt) => {
            const phase = Moon.lunarPhase(dt, { hemisphere: hemisphere.get() });
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
        <p className="text-md font-bold">{Moon.lunarPhase(new Date())}</p>
      </div>
      <p className="fixed right-10 bottom-1/3 -translate-y-1/2 -rotate-90 origin-right font-extrabold">
        MOON PHASES
      </p>
    </div>
  );
}

export default App;
