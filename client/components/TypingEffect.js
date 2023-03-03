import React, { useState, useEffect } from 'react';

function TypingEffect() {
  const [text, setText] = useState('');
  const words = [
    'Plan a party!',
    'Plan a party!',
    'Plan a project!',
    'Plan a project!',
    'Have a plan — with Trell-O!!',
    'Have a plan — with Trell-O!!',
  ];

  useEffect(() => {
    let isMounted = true;
    let count = 0;
    let index = 0;
    let direction = 1;

    const interval = setInterval(() => {
      if (isMounted) {
        setText(words[index].substring(0, count));

        count += direction;

        if (count < 0 || count > words[index].length) {
          direction *= -1;
          index = (index + 1) % words.length;
          count += direction;
        }
      }
    }, 75);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='typography'>
      <h1 className='typography'>&nbsp;{text}</h1>
    </div>
  );
}

export default TypingEffect;
