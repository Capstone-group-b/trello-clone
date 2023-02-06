import React, { useState, useEffect } from 'react';

const EditableTaskCard = ({childRef, handleTaskCardUpdate, text, type, children, ...props}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (evt, type) => {
    const { key } = evt;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];

    if (
      (type === 'textarea' && keys.indexOf(key) > -1 && text.length) || 
      (type !== 'textarea' && allKeys.indexOf(key) > -1 && text.length)
    ) {
      setEditing(false);
      handleTaskCardUpdate();
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => text.length ? setEditing(false) : null}
          onKeyDown={evt => handleKeyDown(evt, type)}
        >
          {children}
        </div>
      ) : (
        <div 
          className='taskCard-modal-title'
          onClick={() => setEditing(true)}
        >
          {text}
        </div>
      )}
    </section>
  );
};

export default EditableTaskCard;