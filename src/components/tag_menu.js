import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { tagQuery } from 'apollo/tagQuery';
import { tagMenuFn, scrollFn } from 'common';

const TagMenu = ({refetch})=> {
	let menuFn;
	let tagScrollFn;
	const tagMenuEl = useRef(null);
	const { data: tagData, loading: tagLoading } = useQuery(tagQuery, {
		fetchPolicy: 'network-only',
	});
	const chTagListFn = (tag)=> {
		refetch({ tags: [tag._id], page: 1 });
	}

	useEffect(()=> {
		if(!tagLoading) {
			menuFn = tagMenuFn(tagMenuEl);
		}

		return ()=> {
			if(menuFn) {
				menuFn.destroy();
			}
		}
	});

	if(!tagLoading && tagData) {
		return (
			<div className="tagMenu" ref={tagMenuEl}>
				<button type="button">
				<em className="blind">태그메뉴</em>
				</button>
				<div className="swiperScrollBox">
					<div className="swiper-wrapper">
						<ul className="swiper-slide">
							{tagData.seeTags.map(tag => (
								<li key={tag._id}>
									<button type="button" onClick={() => chTagListFn(tag)}>
										{tag.value}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className="swiper-scrollbar" />
				</div>
			</div>
		);
	}

	return '';
}

TagMenu.propTypes = {
	refetch : PropTypes.func.isRequired,
}

export default TagMenu;