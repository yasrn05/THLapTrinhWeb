import { Card } from 'antd';
import './components/style.less';
import { unitName } from '@/services/base/constant';
import { useModel } from 'umi';

const TrangChu = () => {
	const { data } = useModel('randomuser');

	return (
		<Card bodyStyle={{ height: '100%' }}>
			<div className='home-welcome'>
				<div>
					<b>{data.length} users</b>
				</div>
				<h1 className='title'>THỰC HÀNH LẬP TRÌNH WEB</h1>
				<h2 className='sub-title'>{unitName.toUpperCase()}</h2>
			</div>
		</Card>
	);
};

export default TrangChu;
