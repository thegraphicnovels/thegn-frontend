import React, {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import ScratchCard from 'react-scratchcard';
import { fullUrlFn, scratchFn } from 'common';

const Scratch = ()=> {
	const scratchWrap = useRef(null);
	useEffect(()=> {
		scratchFn(scratchWrap.current, 70);
	});
	// const setting = {
	// 	width: 150,
	// 	height: 100,
	// 	image: fullUrlFn("resources/images/img_scratch.jpg"),
	// 	finishPercent: 70,
	// 	onComplete: () => console.log('The card is now clear!')
	// }
 return(
	// <ScratchCard {...setting}>
	// 	<Link to="/login" className="ScratchCard__Result">Scratch Resualt</Link>
	// </ScratchCard>
	<div className="scratchWrap" ref={scratchWrap}>
		<img src={fullUrlFn('resources/images/temp/scratch_test.png')} alt="" />
		<canvas style={{width:'300px', height:'300px'}} />
		<Link to="/login" className="ScratchCard__Result">Scratch Resualt</Link>
	</div>
 );
}

export default Scratch;
