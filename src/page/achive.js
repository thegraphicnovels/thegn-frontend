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
	let achiveListFn;
	let menuFnc;

	const { data, loading, updateQuery } = useQuery(achiveQuery, {
		variables: { page: nowPageNum, limit: 5 },
	});
	const a = useQuery(achiveQuery, {
		variables: { page: nowPageNum, limit: 5 },
	});

	useEffect(() => {
		console.log('achive useEffect loading01', loading);
		if (action === 1 && !loading) {
			console.log('achive list marsony create - useEffect01');
			menuFnc = tagMenuFn(tagMenu);
			achiveListFn = masonryFn(achiveList);
		}
		
		return()=> {
			console.log('useEffect 01 return');
			if(action === 1 && achiveListFn) {
				console.log('achive list marsony destroy - useEffect01')
				achiveListFn.destroy();
			}
		}
	}, [action, loading]);

	if(!a.loading) {
		console.log(a);
	}

	if (action === 1 && !loading) {
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

Achive.propTypes = {
	action: PropTypes.number.isRequired,
};

export default Achive;
