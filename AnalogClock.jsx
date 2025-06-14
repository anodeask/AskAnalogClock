import { useEffect, useState } from 'react';


function AnalogClock({onClick})  {
	const now = new Date();
		
	const seconds = now.getSeconds();
	const minutes = now.getMinutes();
	const hours = now.getHours();
	
	const secondsDegrees = (((seconds / 60) * 360) + 90) + (minutes*360);
	const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
	const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

	const time = {hour:hours,minute:minutes,second:seconds};
	const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);
	return isFocused?(
		<>
		
		<div id="clock" className="clock" onClick={()=>{onClick(time)}}>
			<div className="hand hour" id="hour-hand" style={{ transform: `rotate(${hoursDegrees}deg)`}}></div>
			<div className="hand minute" id="minute-hand" style={{ transform: `rotate(${minutesDegrees}deg)`}}></div>
			<div className="hand second" id="second-hand" style={{ transform: `rotate(${secondsDegrees}deg)`}}></div>
			<div className="center"></div>
		</div>
		</>
	):<>inactive</>;
	
}

export default AnalogClock