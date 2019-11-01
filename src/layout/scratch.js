import React, { useRef, useEffect, useState, useContext } from 'react';
import Login from 'page/login';
import { scratchFn } from 'common';
import { Store } from 'store';

const Scratch = () => {
	//   const scratchWrap = useRef(null);
	const { scratchEl } = useContext(Store); // Context Api Store 에 주입된 value 사용
	const [isScratchEnd, setScratchEnd] = useState(false);
	const [isPopOpen, setPopOpen] = useState('none');

	useEffect(() => {
		if (!isScratchEnd) {
		scratchFn(scratchEl.current, 60, () => {
			// scratch end function
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
		<div className="scratchWrap" ref={scratchEl}>
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
