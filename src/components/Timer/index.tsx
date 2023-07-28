import React, { useEffect, useState } from "react";
import { TimerContainer } from "./styles";

interface PropTypes {
  targetDate: string;
}

const Timer: React.FC<PropTypes> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <TimerContainer>
      {timeLeft.days ? timeLeft.days.toString().padStart(2, "0") : "00"}:
      {timeLeft.hours ? timeLeft.hours.toString().padStart(2, "0") : "00"}:
      {timeLeft.minutes ? timeLeft.minutes.toString().padStart(2, "0") : "00"}:
      {timeLeft.seconds ? timeLeft.seconds.toString().padStart(2, "0") : "00"}
    </TimerContainer>
  );
};

export default Timer;
