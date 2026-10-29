
"use client";

import React, { useEffect, useState } from "react";

const getTimeLeft = (targetDate) => {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (!Number.isFinite(difference) || difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const FlashSaleTimer = ({ targetDate, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    targetDate ? getTimeLeft(targetDate) : null
  );

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    let expired = false;

    const calculateTime = () => {
      const remaining = getTimeLeft(targetDate);

      if (!remaining) {
        setTimeLeft(null);

        if (!expired) {
          expired = true;
          onExpire?.();
        }

        return;
      }

      setTimeLeft(remaining);
    };

    calculateTime();

    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (!timeLeft) return null;

  const formatNumber = (number) =>
    String(number).padStart(2, "0");

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 text-gray-950 sm:gap-3">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <span
              className={`flex h-10 w-10 items-center justify-center border text-xs font-bold sm:h-12 sm:w-12 sm:text-sm ${
                index === 3
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-950"
              }`}
            >
              {formatNumber(unit.value)}
            </span>

            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              {unit.label}
            </span>
          </div>

          {index !== units.length - 1 && (
            <span className="mb-4 text-sm font-bold text-gray-400">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlashSaleTimer;
