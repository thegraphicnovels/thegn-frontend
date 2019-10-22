import React, { useRef, useEffect, useState } from 'react';
import Login from 'page/login';
import { scratchFn } from 'common';

const Scratch = () => {
  const scratchWrap = useRef(null);
  const [isScratchEnd, setScratchEnd] = useState(false);
  const [isPopOpen, setPopOpen] = useState('none');

  useEffect(() => {
    if (!isScratchEnd) {
      scratchFn(scratchWrap.current, 60, () => {
        // scratch end function
        console.log('scratch end');
        setScratchEnd(true);
      });
    }
  }, [isScratchEnd]);

  useEffect(() => {
    if (isPopOpen === 'none') {
      setScratchEnd(false);
    }
  }, [isPopOpen]);

  return (
    <div className="scratchWrap" ref={scratchWrap}>
      {!isScratchEnd && <canvas className="canvas" width={150} height={80} />}
      <button
        type="button"
        onClick={() => setPopOpen('block')}
        className="ScratchCard__Result"
      >
        Admin Login
      </button>
      {isScratchEnd && <Login isPopOpen={isPopOpen} setPopOpen={setPopOpen} />}
    </div>
  );
};

export default Scratch;
