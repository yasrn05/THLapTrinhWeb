// import { getData } from '@/services/QuanLyMonHoc';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState([]);

	const getDataQuanLyDeThi = async () => {
		const dataLocal: any = JSON.parse(localStorage.getItem('data_quan_ly_de_thi') as any);
		if (!dataLocal?.length) {
			const res = { data: [] };
			localStorage.setItem('data_quan_ly_de_thi', JSON.stringify(res?.data ?? []));
			setData(res?.data ?? []);
			return;
		}
		setData(dataLocal);
	};

	return {
		data,
		setData,
		getDataQuanLyDeThi,
	};
};
