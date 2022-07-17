import {Checkbox, DatePicker, Form, InputNumber, Modal, Select, Tabs, Typography} from 'antd';
import React, {useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import moment, {Moment} from "moment";
import {LineOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {calendarDaysActions} from "../../store/calendarDays.actions";
import {RootState} from "../../../../store/store";
import {DayKind} from "../../../../graphQL/enums/DayKind";
import {DayOfWeek} from "../../../../graphQL/enums/DayOfWeek";
import {nameof, uppercaseToWords} from "../../../../utils/stringUtils";
import {dateRender} from "../../../../convertors/dateRender";
import {CalendarDaysCreateInputType, CalendarDaysCreateRangeInputType} from "../../graphQL/calendarDays.mutations";
import Input from "antd/es/input/Input";
import {formStyles} from "../../../../assets/form";

const {Title} = Typography;
const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

type Tab = 'One' | 'Range';

export const CalendarDaysCreatePage = () => {
    const [tab, setTab] = useState<Tab>('One')
    const isAuth = useSelector((s: RootState) => s.auth.isAuth);
    const calendarDays = useSelector((s: RootState) => s.calendarDays.calendarDays);
    const loading = useSelector((s: RootState) => s.calendarDays.loadingCreate);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form] = useForm();
    const dispatch = useDispatch();
    const date = searchParams.get('date') && moment(searchParams.get('date'));

    // useEffect(() => {
    //     if (!isAdministratorOrHavePermissions([Permission.UpdateCalendar]))
    //         navigate(`/error/403?from=${location.pathname}`)
    // }, [isAuth])

    const onFinish = async () => {
        try {
            await form.validateFields();
            const override = form.getFieldValue(nameof<CalendarDaysCreateInputType>('override'));
            const title = form.getFieldValue(nameof<CalendarDaysCreateInputType>('title'));
            const kind = form.getFieldValue(nameof<CalendarDaysCreateInputType>('kind'));
            const percentageWorkHours = form.getFieldValue(nameof<CalendarDaysCreateInputType>('percentageWorkHours'))
            switch (tab) {
                case 'One':
                    const dateFieldName = nameof<CalendarDaysCreateInputType>('date');
                    if (!form.getFieldValue(dateFieldName)) {
                        form.setFields([{name: dateFieldName, errors: ['Date is required']}])
                        break
                    }
                    const calendarDaysCreateInputType: CalendarDaysCreateInputType = {
                        date: (form.getFieldValue(dateFieldName) as Moment).format('YYYY-MM-DD'),
                        title,
                        kind,
                        percentageWorkHours,
                        override,
                    }
                    dispatch(calendarDaysActions.createAsync(calendarDaysCreateInputType))
                    break;
                case 'Range':
                    if (!form.getFieldValue('fromAndTo')) {
                        form.setFields([{name: 'fromAndTo', errors: ['From and to is required']}])
                        break
                    }
                    const daysOfWeekFieldName = nameof<CalendarDaysCreateRangeInputType>('daysOfWeek');
                    if (!form.getFieldValue(daysOfWeekFieldName)) {
                        form.setFields([{name: daysOfWeekFieldName, errors: ['Day of weeks is required']}])
                        break
                    }
                    const fromAndTo = form.getFieldValue('fromAndTo') as Moment[];
                    const daysOfWeek = form.getFieldValue(daysOfWeekFieldName) as DayOfWeek[];
                    const calendarDaysCreateRangeInputType: CalendarDaysCreateRangeInputType = {
                        from: fromAndTo[0].format('YYYY-MM-DD'),
                        to: fromAndTo[1].format('YYYY-MM-DD'),
                        title,
                        daysOfWeek: daysOfWeek,
                        kind,
                        percentageWorkHours,
                        override,
                    }
                    dispatch(calendarDaysActions.createRangeAsync(calendarDaysCreateRangeInputType))
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            title={<Title level={4}>Create calendar day</Title>}
            confirmLoading={loading}
            visible={true}
            onOk={onFinish}
            okText={'Create'}
            onCancel={() => navigate(-1)}
        >
            <Form
                name="CalendarDaysCreateForm"
                form={form}
                onFinish={onFinish}
                initialValues={{
                    date: date,
                    daysOfWeek: Object.values(DayOfWeek),
                    kind: DayKind.DayOff,
                    percentageWorkHours: 0,
                    override: false,
                }}
                labelCol={formStyles}
            >
                <Tabs defaultActiveKey={tab} onChange={tab => setTab(tab as Tab)}>
                    <TabPane
                        tab={<><LineOutlined/>One</>}
                        key="One"
                    >
                        <Form.Item
                            name={nameof<CalendarDaysCreateInputType>('date')}
                            label={'Date'}
                        >
                            <DatePicker
                                placeholder={'Date'}
                                className={'w-100'}
                                dateRender={current => dateRender(current, calendarDays)}
                            />
                        </Form.Item>
                    </TabPane>
                    <TabPane
                        tab={<><UnorderedListOutlined/>Range</>}
                        key="Range"
                    >
                        <Form.Item name="fromAndTo" label={'From and to'}>
                            <RangePicker
                                className={'w-100'}
                                dateRender={current => dateRender(current, calendarDays)}
                            />
                        </Form.Item>
                        <Form.Item
                            name={nameof<CalendarDaysCreateRangeInputType>('daysOfWeek')}
                            label={'Days of week'}
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
                <Form.Item
                    name={nameof<CalendarDaysCreateRangeInputType>('title')}
                    label={'Title'}
                >
                    <Input placeholder={'Title'}/>
                </Form.Item>
                <Form.Item
                    name={nameof<CalendarDaysCreateRangeInputType>('kind')}
                    label="Kind"
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
                    name={nameof<CalendarDaysCreateRangeInputType>('percentageWorkHours')}
                    label="% work hours"
                    rules={[{required: true, message: '% work hours is required'}]}
                >
                    <InputNumber
                        placeholder={'% work hours'}
                        type={'number'}
                        className={'w-100'}
                        min={0}
                        max={100}
                    />
                </Form.Item>
                <Form.Item
                    name={nameof<CalendarDaysCreateRangeInputType>('override')}
                    valuePropName="checked"
                >
                    <Checkbox>Override</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};