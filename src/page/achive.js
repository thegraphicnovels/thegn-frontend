import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { masonryFn, tagMenuFn } from 'common';
import { achiveQuery } from 'apollo/achiveQuery';
import Paging from 'components/paging';
import PropTypes from 'prop-types';

const Achive = ({ action }) => {
	const achiveList = useRef(null);
	const tagMenu = useRef(null);
	const [nowPageNum, setPageNum] = useState(1);
	const [imgLoadComplate, setLoadComplate] = useState(0);
	let achiveListFn;
	let menuFnc;

	const { data, loading } = useQuery(achiveQuery, {
		variables: { page: nowPageNum, limit: 10 },
	});
	
	useEffect(() => {// action값 변경시 useEffect 실행
		if (action === 1) {
			menuFnc = tagMenuFn(tagMenu);
		}
		
		return()=> {
			if(action === 1) {
				if(achiveListFn) achiveListFn.destroy();
				setPageNum(1);
			}
		}
	}, [action]);

	useEffect(()=> {// 페이징 클릭시 useEffect 실행
		setLoadComplate(0);
	}, [nowPageNum]);

	useEffect(() => {// 이미지 로드 완료시 useEffect 실행
		if (action === 1 && imgLoadComplate === 10) {
			achiveListFn = masonryFn(achiveList);
		}
		
		return()=> {
			console.log('useEffect 02 return');
			if(action === 1 && achiveListFn) {
				achiveListFn.destroy();
			}
		}
	}, [imgLoadComplate]);

	if (action === 1 && !loading) {
		console.log('loading end');
		return (
			<div className="achiveWrap">
				<div className="tagMenu" ref={tagMenu}>
				<button type="button">
					<em className="blind">태그메뉴</em>
				</button>
				<div className="swiperScrollBox">
					<ul>
					<li>
						<Link to="/">PRINTED MATTERS</Link>
					</li>
					<li>
						<Link to="/">POSTER</Link>
					</li>
					<li>
						<Link to="/">LEAFLET</Link>
					</li>
					<li>
						<Link to="/">BOOKLET</Link>
					</li>
					<li>
						<Link to="/">EDITORIAL</Link>
					</li>
					<li>
						<Link to="/">WEB</Link>
					</li>
					<li>
						<Link to="/">IDENTITY</Link>
					</li>
					<li>
						<Link to="/">DRAFT PROPOSAL</Link>
					</li>
					</ul>
				</div>
				</div>

				<div className="achiveListWrap">
					<ul className="grid" ref={achiveList}>
						{data &&
						data.seePortpolios.portpolios.map(portpolioData => (
							<li key={portpolioData._id} className="grid-item">
								<Link to={`/achiveDetail/${portpolioData._id}`}>
									<img src={portpolioData.thumbImg} onLoad={()=> setLoadComplate(imgLoadComplate + 1)} alt={portpolioData.title} />
								</Link>
							</li>
						))}
					</ul>
				</div>

				<Paging nowPageNum={nowPageNum} totalPage={data.seePortpolios.totalPages} setPageNum={setPageNum} />
			</div>
		);
	}
	return '';
};

Achive.propTypes = {
	action: PropTypes.number.isRequired,
};

export default Achive;
