// import { getData } from '@/services/QuanLyMonHoc';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState([]);

	const getDataStaffManagement = async () => {
		const dataLocal: any = JSON.parse(localStorage.getItem('data_staffs') as any);
		if (!dataLocal?.length) {
			const res = { data: [] };
			localStorage.setItem('data_staffs', JSON.stringify(res?.data ?? []));
			setData(res?.data ?? []);
			return;
		}
		setData(dataLocal);
	};

	return {
		data,
		setData,
		getDataStaffManagement,
	};
};
