import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { masonryFn, tagMenuFn } from 'common';
import { achiveQuery } from 'apollo/achiveQuery';
import Paging from 'components/paging';

const Achive = ({ action }) => {
	const achiveList = useRef(null);
	const tagMenu = useRef(null);
	const [nowPageNum, setPageNum] = useState(1);
	let achiveListFn;
	let menuFnc;

	const { data, loading } = useQuery(achiveQuery, {
		variables: { page: nowPageNum, limit: 5 },
	});

	useEffect(() => {
		if (action === 1) {
			if(!loading) {
				console.log('achive list marsony create');
				menuFnc = tagMenuFn(tagMenu);
				achiveListFn = masonryFn(achiveList);
			}
		}

		return()=> {
			if(action === 1) {
				console.log('achive list marsony destroy')
				achiveListFn.destroy();
			}
		}
	}, [action, nowPageNum]);

	if (action === 1 && !loading) {
		console.log(data);
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
						<img src={portpolioData.thumbImg} alt={portpolioData.title} />
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

export default Achive;
