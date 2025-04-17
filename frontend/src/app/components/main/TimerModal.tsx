import { createPortal } from "react-dom";
import { Dispatch, SetStateAction } from "react";

type TimerModalProps = {
  minutes: number,
  setMinutes: Dispatch<SetStateAction<number>>,
  secondsElapsed: number,
  secondsLeft: number,
  isRunning: boolean,
  start: () => void,
  pause: () => void,
  reset: () => void, 
  progress: number,
  onClose: () => void
}

export function TimerModal({
    minutes,
    setMinutes,
    secondsElapsed,
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
    progress,
    onClose,
}: TimerModalProps) {
  
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return createPortal(
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-2xl shadow-xl w-96 text-center relative">
        <button
          className="absolute top-2 right-3 text-gray-300 text-xl hover:text-white transition"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">⏱ Timer</h2>

        <svg height={radius * 2} width={radius * 2} className="mx-auto mb-4">
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#3b82f6"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xl fill-gray-800 font-semibold"
          >
            {Math.floor(secondsLeft / 60)
              .toString()
              .padStart(2, "0")}
            :
            {(secondsLeft % 60).toString().padStart(2, "0")}
          </text>
        </svg>

        <div className="mb-4">
          <label className="block text-white mb-1">Set timer:</label>
          <input
            type="number"
            min={1}
            max={60}
            className="border rounded px-3 py-1 w-24 text-center"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 1)}
            disabled={isRunning}
          />
        </div>

        <div className="space-x-2">
          {!isRunning ? (
            <button onClick={start} className="bg-blue-500 text-white px-4 py-2 rounded">
              Start
            </button>
          ) : (
            <button onClick={pause} className="bg-blue-500 text-white px-4 py-2 rounded">
              Pause
            </button>
          )}
          <button onClick={reset} className="bg-gray-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>, document.body
  );
}
