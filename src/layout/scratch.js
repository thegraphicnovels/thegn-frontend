import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { scratchFn } from 'common';

const Scratch = ()=> {
	const scratchWrap = useRef(null);
	
	useEffect(()=> {
		scratchFn(scratchWrap.current, 70);
	});
	
	return(
		<div className="scratchWrap" ref={scratchWrap}>
			<canvas className="canvas" width={150} height={80} />
			<button type="button" className="ScratchCard__Result">Admin Login</button>
		</div>
	);
}

export default Scratch;