import React from 'react';
import PropTypes from 'prop-types';

const Paging = ({nowPageNum, totalPage, setPageNum})=> {
	let pagingPrev;
	let pagingNext;

	const paginFn = (chNum)=> {
		console.log('paginFn Start')
		if(chNum < 1 || chNum > totalPage) {
			console.log('block click')
			return;
		}
		setPageNum(chNum);
	}

	// 페이징 이전
	if(nowPageNum === 1) {
		pagingPrev = (<span className="pagingPrev disabled" disabled><em>PREVIOUS</em></span>);
	}else{
		pagingPrev = (<button type="button" className="pagingPrev" onClick={()=> {paginFn(nowPageNum - 1)}}><em>PREVIOUS</em></button>);
	}

	// 페이징 다음
	if(nowPageNum === totalPage) {
		pagingNext = (<span className="pagingNext disabled" disabled><em>NEXT</em></span>);
	}else{
		pagingNext = (<button type="button" className="pagingNext" onClick={()=> {paginFn(nowPageNum + 1)}}><em>NEXT</em></button>);
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