import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import ScratchCard from 'react-scratchcard';
import { fullUrlFn, scratchFn } from 'common';

const Scratch = ()=> {
	const scratchWrap = useRef(null);
	useEffect(()=> {
		scratchFn(scratchWrap.current, 70);
	});
	
	return(
		<div className="scratchWrap" ref={scratchWrap}>
			<canvas className="canvas">scratch</canvas>
			<Link to="/login" className="ScratchCard__Result">Scratch Resualt</Link>
		</div>
	);
}

export default Scratch;
