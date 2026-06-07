import React from 'react';

const Time = () => {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {time.toLocaleTimeString()}
    </div>
  );
}

export { Time };
