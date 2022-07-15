import {DatePicker, Form, Input, InputNumber, Modal, Select} from 'antd';
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import moment, {Moment} from "moment";
import {useDispatch, useSelector} from "react-redux";
import {calendarDaysActions} from "../../../store/calendarDays/calendarDays.actions";
import {RootState} from "../../../store/store";
import {DayKind} from "../../../graphQL/enums/DayKind";
import {uppercaseToWords} from "../../../utils/stringUtils";
import {dateRender} from "../../../convertors/dateRender";
import Title from 'antd/lib/typography/Title';

export const CalendarDaysUpdatePage = () => {
    const calendarDays = useSelector((s: RootState) => s.calendarDays.calendarDays);
    const loading = useSelector((s: RootState) => s.calendarDays.loadingUpdate);
    const params = useParams();
    const navigate = useNavigate();
    const [form] = useForm();
    const dispatch = useDispatch();
    const date = params.date
    const dayInUpdate = calendarDays.find(day => day.date === date);

    const onFinish = async () => {
        try {
            await form.validateFields();
            dispatch(calendarDaysActions.updateAsync({
                id: form.getFieldValue('id'),
                date: (form.getFieldValue('date') as Moment).format('YYYY-MM-DD'),
                title: form.getFieldValue('title'),
                kind: form.getFieldValue('kind'),
                percentageWorkHours: form.getFieldValue('percentageWorkHours'),
            }))
        } catch (e) {
            console.log(e);
        }
    }

    if (!dayInUpdate) {
        navigate('/error');
    }

    return (
        <Modal
            title={<Title level={4}>Update calendar day</Title>}
            confirmLoading={loading}
            visible={true}
            onOk={onFinish}
            okText={'Update'}
            onCancel={() => navigate(-1)}
        >
            <Form
                name="CalendarDaysUpdateForm"
                form={form}
                onFinish={onFinish}
                initialValues={{
                    id: dayInUpdate?.id,
                    date: moment(dayInUpdate?.date),
                    kind: dayInUpdate?.kind,
                    percentageWorkHours: dayInUpdate?.percentageWorkHours,
                }}
            >
                <Form.Item name="id" className={'invisible'}>
                    <Input type={'hidden'}/>
                </Form.Item>
                <Form.Item name="date">
                    <DatePicker
                        placeholder={'Date'}
                        className={'w-100'}
                        dateRender={current => dateRender(current, calendarDays)}
                    />
                </Form.Item>
                <Form.Item name="title">
                    <Input placeholder={'Title'}/>
                </Form.Item>
                <Form.Item
                    name="kind"
                    rules={[{required: true, message: 'Kind is required'}]}
                >
                    <Select className={'w-100'} placeholder={'Kind'}>
                        {(Object.values(DayKind) as Array<DayKind>).map((value) => (
                            <Select.Option key={value} value={value}>
                                {uppercaseToWords(value)}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="percentageWorkHours"
                    rules={[{required: true, message: 'Percentage work hours is required'}]}
                >
                    <InputNumber placeholder={'Percentage work hours'} type={'number'} className={'w-100'} min={0}
                                 max={100}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};