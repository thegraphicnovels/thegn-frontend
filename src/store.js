import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

export const Store = React.createContext(null);

const QUERY = gql`
	{
		logged @client
	}
`;

const checkDeviceFn = () => {
	const pcDevice = "win16|win32|win64|mac|macintel";
	 
	// 접속한 디바이스 환경
	const thisDevice = navigator.platform;
 
	if ( thisDevice ) {
		let device = 'PC';
		if ( pcDevice.indexOf(navigator.platform.toLowerCase()) < 0 ) {
			device = 'MO';
		}
		return device;
	}
}

// 전역으로 사용할 변수 및 function 주입
const StoreProvider = ({ children }) => {
	// login check
	const {
		data: { logged },
	} = useQuery(QUERY);

	// page action
	const [action, setAction] = useState(0);
	// scratch element
	const scratchEl = useRef(null);

	const headerEl = useRef(null);
	const footEl = useRef(null);

	const isDevice = checkDeviceFn();

	useEffect(() => {
		document.cookie = 'SameSite=None; Secure';
	}, []);

	const value = {
		action,
		setAction,
		logged,
		scratchEl,
		headerEl,
		footEl,
		isDevice,
	};

	return <Store.Provider value={value}>{children}</Store.Provider>;
};

StoreProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default StoreProvider;
