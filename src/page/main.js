import React , {useState, useRef, useEffect}from 'react';
import {Link} from "react-router-dom";
import {menuClick} from 'common';
import Mainswiper from 'page/main_slide';
import Achive from 'page/achive';
import About from 'page/about';
import Contact from 'page/contact';

const Main = function() {
	const conts = useRef(null);
	const [action, setAction] = useState(0);

	return (
		<div className="contents" ref={conts}>
			<div className="pageWrap" style={{display:"block", width:"100%", height:"auto"}}>
				<h2 className="blind">Home</h2>
				<Mainswiper action={action} />
			</div>
			<button type="button" className="subMenu01" onClick={()=> {menuClick(conts, setAction, 1)}}><em>&lt;Archive&gt;</em></button>
			<div className="pageWrap">
				<h2 className="blind">Archive</h2>
				<Achive action={action} />
			</div>
			<button type="button" className="subMenu02" onClick={()=> {menuClick(conts, setAction, 2)}}><em>&lt;About&gt;</em></button>
			<div className="pageWrap">
				<h2 className="blind">About</h2>
				<About action={action} />
			</div>
			<button type="button" className="subMenu03" onClick={()=> {menuClick(conts, setAction, 3)}}><em>&lt;Contact&gt;</em></button>
			<div className="pageWrap">
				<h2 className="blind">Contact</h2>
				<Contact action={action} />
			</div>
		</div>
	);
}

export default Main;