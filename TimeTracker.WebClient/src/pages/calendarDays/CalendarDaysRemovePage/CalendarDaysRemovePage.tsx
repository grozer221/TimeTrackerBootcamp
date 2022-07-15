import {DatePicker, Form, Modal, Select, Tabs} from 'antd';
import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import moment, {Moment} from "moment";
import {LineOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {calendarDaysActions} from "../../../store/calendarDays/calendarDays.actions";
import {RootState} from "../../../store/store";
import {DayOfWeek} from "../../../graphQL/enums/DayOfWeek";
import {uppercaseToWords} from "../../../utils/stringUtils";
import {dateRender} from "../../../convertors/dateRender";
import Title from "antd/lib/typography/Title";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

type Tab = 'One' | 'Range';

export const CalendarDaysRemovePage = () => {
    const [tab, setTab] = useState<Tab>('One')
    const calendarDays = useSelector((s: RootState) => s.calendarDays.calendarDays);
    const loading = useSelector((s: RootState) => s.calendarDays.loadingRemove);
    const navigate = useNavigate();
    const [form] = useForm();
    const dispatch = useDispatch();
    const params = useParams();
    const date = params.date && moment(params.date);

    const onFinish = async () => {
        try {
            await form.validateFields();
            switch (tab) {
                case 'One':
                    if (!form.getFieldValue('date')) {
                        form.setFields([{name: 'date', errors: ['Date is required']}])
                        break
                    }
                    dispatch(calendarDaysActions.removeAsync((form.getFieldValue('date') as Moment).format('YYYY-MM-DD')));
                    break;
                case 'Range':
                    if (!form.getFieldValue('fromAndTo')) {
                        form.setFields([{name: 'fromAndTo', errors: ['From and to is required']}])
                        break
                    }
                    if (!form.getFieldValue('daysOfWeek')) {
                        form.setFields([{name: 'daysOfWeek', errors: ['Day of weeks is required']}])
                        break
                    }
                    const fromAndTo = form.getFieldValue('fromAndTo') as Moment[];
                    const daysOfWeek = form.getFieldValue('daysOfWeek') as DayOfWeek[];
                    dispatch(calendarDaysActions.removeRangeAsync(fromAndTo[0].format('YYYY-MM-DD'), fromAndTo[1].format('YYYY-MM-DD'), daysOfWeek));
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            title={<Title level={4}>Remove calendar day</Title>}
            confirmLoading={loading}
            visible={true}
            onOk={onFinish}
            okText={'Remove'}
            onCancel={() => navigate(-1)}
        >
            <Form
                name="CalendarDaysRemoveForm"
                form={form}
                onFinish={onFinish}
                initialValues={{
                    date: date,
                    daysOfWeek: Object.values(DayOfWeek),
                }}
            >
                <Tabs defaultActiveKey={tab} onChange={tab => setTab(tab as Tab)}>
                    <TabPane
                        tab={<><LineOutlined/>One</>}
                        key="One"
                    >
                        <Form.Item name="date">
                            <DatePicker
                                className={'w-100'}
                                dateRender={current => dateRender(current, calendarDays)}
                            />
                        </Form.Item>
                    </TabPane>
                    <TabPane
                        tab={<><UnorderedListOutlined/>Range</>}
                        key="Range"
                    >
                        <Form.Item name="fromAndTo">
                            <RangePicker
                                className={'w-100'}
                                dateRender={current => dateRender(current, calendarDays)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="daysOfWeek"
                        >
                            <Select
                                className={'w-100'}
                                mode="multiple"
                                allowClear
                                placeholder="Day of weeks"
                            >
                                {(Object.values(DayOfWeek) as Array<DayOfWeek>).map((value) => (
                                    <Select.Option key={value} value={value}>
                                        {uppercaseToWords(value)}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </TabPane>
                </Tabs>
            </Form>
        </Modal>
    );
};