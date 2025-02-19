import type { IColumn } from '@/components/Table/typing';
import { Button, Form, Input, Modal, Table, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
// import { useModel } from 'umi';
import useModel from '@/models/quanlymonhoc';
import moment from 'moment';

const QuanLyMonHoc = () => {
	const { data, getDataMonHoc } = useModel();
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<QuanLyMonHoc.Record>();
	useEffect(() => {
		getDataMonHoc();
	}, []);

	const columns: IColumn<QuanLyMonHoc.Record>[] = [
		{
			title: 'Tên môn',
			dataIndex: 'ten_mon',
			key: 'ten_mon',
			width: 200,
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'ngay_bat_dau',
			key: 'ngay_bat_dau',
			width: 100,
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'ngay_ket_thuc',
			key: 'ngay_ket_thuc',
			width: 100,
		},
		{
			title: 'Thời lượng học',
			dataIndex: 'thoi_luong_hoc',
			key: 'thoi_luong_hoc',
			width: 100,
		},
		{
			title: 'Nội dung đã học',
			dataIndex: 'noi_dung_da_hoc',
			key: 'noi_dung_da_hoc',
			width: 100,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghi_chu',
			key: 'ghi_chu',
			width: 100,
		},
		{
			title: 'Sửa/xóa',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
						>
							Sửa
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const dataLocal: any = JSON.parse(localStorage.getItem('data_mon_hoc') as any);
								const newData = dataLocal.filter((item: any) => item.ten_mon !== record.ten_mon);
								localStorage.setItem('data_mon_hoc', JSON.stringify(newData));
								getDataMonHoc();
							}}
							type='primary'
						>
							Xóa
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
				}}
			>
				Thêm môn học
			</Button>
			<Table dataSource={data} columns={columns} />
			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Sửa môn học' : 'Thêm môn học'}
				visible={visible}
				onOk={() => { }}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<Form
					onFinish={(values) => {
						const index = data.findIndex((item: any) => item.ten_mon === row?.ten_mon);
						const dataTemp: QuanLyMonHoc.Record[] = [...data];
						const newValues = {
							...values,
							ngay_bat_dau: values.ngay_bat_dau ? values.ngay_bat_dau.toDate() : null,
							ngay_ket_thuc: values.ngay_ket_thuc ? values.ngay_ket_thuc.toDate() : null,
						};
						dataTemp.splice(index, 1, newValues);
						const dataLocal = isEdit ? dataTemp : [newValues, ...data];
						localStorage.setItem('data_mon_hoc', JSON.stringify(dataLocal));
						setVisible(false);
						getDataMonHoc();
					}}
				>
					<Form.Item
						initialValue={row?.ten_mon}
						label='Tên môn'
						name='ten_mon'
						rules={[{ required: true, message: 'Please input your ten_mon!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={row?.ngay_bat_dau ? moment(row.ngay_bat_dau) : null}
						label='Ngày bắt đầu'
						name='ngay_bat_dau'
						rules={[{ required: true, message: 'Please input your ngay_bat_dau!' }]}
					>
						<DatePicker />
					</Form.Item>
					<Form.Item
						initialValue={row?.ngay_ket_thuc ? moment(row.ngay_ket_thuc) : null}
						label='Ngày kết thúc'
						name='ngay_ket_thuc'
						rules={[{ required: true, message: 'Please input your ngay_ket_thuc!' }]}
					>
						<DatePicker />
					</Form.Item>
					<Form.Item
						initialValue={row?.thoi_luong_hoc}
						label='Thời lượng học'
						name='thoi_luong_hoc'
						rules={[{ required: true, message: 'Please input your thoi_luong_hoc!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={row?.noi_dung_da_hoc}
						label='Nội dung đã học'
						name='noi_dung_da_hoc'
						rules={[{ required: true, message: 'Please input your noi_dung_da_hoc!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						initialValue={row?.ghi_chu}
						label='Ghi chú'
						name='ghi_chu'
						rules={[{ required: true, message: 'Please input your ghi_chu!' }]}
					>
						<Input />
					</Form.Item>
					<div className='form-footer'>
						<Button htmlType='submit' type='primary'>
							{isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
						</Button>
						<Button onClick={() => setVisible(false)}>Hủy</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default QuanLyMonHoc;