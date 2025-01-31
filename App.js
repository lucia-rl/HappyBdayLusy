import React, { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";

// Configuración de la persona
const CONFIG = {
  name: "Lusyfel",
  birthDate: "2006-01-15", // Formato YYYY-MM-DD
};

const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    daysUntilBirthday: 0,
  });

  const calculateTime = () => {
    const birth = new Date(CONFIG.birthDate);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    let hours = now.getHours() - birth.getHours();
    let minutes = now.getMinutes() - birth.getMinutes();
    let seconds = now.getSeconds() - birth.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    const nextBirthday = new Date(
      now.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    if (nextBirthday < now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday - now) / (1000 * 60 * 60 * 24)
    );

    setTimeLeft({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      daysUntilBirthday,
    });
  };

  useEffect(() => {
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black p-8 relative overflow-hidden">
      <div className="max-w-md mx-auto bg-black/50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-purple-500/30 relative z-10">
        <div className="w-32 h-32 mx-auto rounded overflow-hidden border-4 border-purple-500 mb-4">
          <img
            src="/lusy.jpeg"
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          {CONFIG.name}
        </h2>
        <p className="text-purple-300 text-center">
          El {new Date(CONFIG.birthDate).toLocaleDateString()} nace la niña más
          loca y a la que más quiero para que muchos años después nos
          encontremos en el insti y gracias a la que pude pasar los mejores dos
          últimos años de la ESO, saltándonos clases y haciendo tonterías. Feliz
          cumpleaños Lucy ❤️
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <CounterBox label="Años" value={timeLeft.years} />
          <CounterBox label="Meses" value={timeLeft.months} />
          <CounterBox label="Días" value={timeLeft.days} />
          <CounterBox label="Horas" value={timeLeft.hours} />
          <CounterBox label="Minutos" value={timeLeft.minutes} />
          <CounterBox label="Segundos" value={timeLeft.seconds} />
        </div>
        <div className="bg-purple-600/30 p-4 rounded-lg text-center mt-4 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <Clock className="text-purple-300" />
            <p className="text-white">
              Faltan{" "}
              <span className="font-bold">{timeLeft.daysUntilBirthday}</span>{" "}
              días para el próximo cumpleaños
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterBox = ({ label, value }) => (
  <div className="bg-purple-900/30 p-4 rounded-lg text-center backdrop-blur-sm">
    <p className="text-purple-300 text-sm">{label}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default App;
