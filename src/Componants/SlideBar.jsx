import React, { useState } from 'react';

function SlideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlideBar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={toggleSlideBar}>Toggle Slide Bar</button>
      {isOpen && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '250px', background: 'lightgray', padding: '20px' }}>
          {/* Add your slide bar content here */}
        </div>
      )}
    </div>
  );
}

export default SlideBar;