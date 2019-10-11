import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Paging = ({nowPageNum, totalPage, setPageNum})=> {
	let pagingPrev;
	let pagingNext;

	const paginFn = (chNum)=> {
		if(chNum < 1 || chNum > totalPage) {
			return;
		}
		setPageNum(chNum);
	}

	// 페이징 이전
	if(nowPageNum === 1) {
		pagingPrev = <button type="button" className="pagingPrev disabled" disabled><em>PREVIOUS</em></button>;
	}else{
		pagingPrev = <button type="button" className="pagingPrev" onClick={()=> {paginFn(nowPageNum - 1)}}><em>PREVIOUS</em></button>;
	}

	// 페이징 다음
	if(nowPageNum === totalPage) {
		pagingNext = <button type="button" className="pagingNext disabled" disabled><em>NEXT</em></button>;
	}else{
		pagingNext = <button type="button" className="pagingNext" onClick={()=> {paginFn(nowPageNum + 1)}}><em>NEXT</em></button>;
	}

	return(
		<div className="paging">
			{pagingPrev}
			<span className="viewPageNum">
				<span className="nowPaging">{nowPageNum}</span> / <span className="totalPaging">{totalPage}</span>
			</span>
			{pagingNext}
		</div>
	);
}

Paging.propTypes = {
	nowPageNum : PropTypes.number.isRequired,
	totalPage : PropTypes.number.isRequired,
	setPageNum : PropTypes.func.isRequired,
}

export default Paging;