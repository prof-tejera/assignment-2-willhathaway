import Countdown from "../components/timers/Countdown";
import Stopwatch from "../components/timers/Stopwatch";
import Tabata from "../components/timers/Tabata";
import XY from "../components/timers/XY";

let timers = [
  {
    name: "Stopwatch",
    component: <Stopwatch />,
    milliseconds: 0,
    status: "not running",
  },
  {
    name: "Countdown",
    component: <Countdown />,
    milliseconds: 0,
    status: "not running",
  },
  {
    name: "Tabata",
    component: <Tabata />,
    milliseconds: 0,
    status: "not running",
  },
  {
    name: "XY",
    component: <XY />,
    milliseconds: 0,
    status: "not running",
  },
];
export default timers;
