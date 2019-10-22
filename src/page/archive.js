import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { masonryFn, tagMenuFn } from 'common';
import { archiveQuery } from 'apollo/archiveQuery';
import Paging from 'components/paging';
import PropTypes from 'prop-types';

const Archive = ({ action }) => {
	const limit = 10;
	const archiveList = useRef(null);
	const tagMenu = useRef(null);
	const [nowPageNum, setPageNum] = useState(1);
	const [imgLoadComplate, setLoadComplate] = useState(0);
	let archiveListFn;
	let menuFnc;

	const { data, loading } = useQuery(archiveQuery, {
		variables: { page: nowPageNum, limit },
		fetchPolicy : "network-only",
	});
	
	useEffect(() => {// action값 변경시 useEffect 실행
		if (action === 1) {
			console.log('setPageNum');
			menuFnc = tagMenuFn(tagMenu);
		}
		
		return()=> {
			if(action === 1) {
				console.log('archiveListFn destroy');
				if(archiveListFn) archiveListFn.destroy();
				setPageNum(1);
				setLoadComplate(0);
			}
		}
	}, [action]);

	useEffect(()=> {// 페이징 클릭시 useEffect 실행
		setLoadComplate(0);
	}, [nowPageNum]);

	useEffect(() => {// 이미지 로드 완료시 useEffect 실행
		console.log('imgLoadComplate', imgLoadComplate);
		console.log('limit', limit);
		console.log('action', action);
		if (action === 1 && imgLoadComplate === limit) {
			console.log('masonryFn');
			archiveListFn = masonryFn(archiveList);
		}
		
		return()=> {
			console.log('useEffect 02 return');
			if(action === 1 && archiveListFn) {
				archiveListFn.destroy();
			}
		}
	}, [imgLoadComplate]);

	if (action === 1 && !loading) {
		console.log('loading end');
		return (
			<div className="archiveWrap">
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

				<div className="archiveListWrap">
					<ul className="grid" ref={archiveList}>
						{data &&
						data.seePortpolios.portpolios.map(portpolioData => (
							<li key={portpolioData._id} className="grid-item">
								<Link to={`/archiveDetail/${portpolioData._id}`}>
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

Archive.propTypes = {
	action: PropTypes.number.isRequired,
};

export default Archive;
