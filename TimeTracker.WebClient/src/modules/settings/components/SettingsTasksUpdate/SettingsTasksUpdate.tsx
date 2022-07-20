import {Col, Form, Row, Select, Space, Switch, TimePicker} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {nameof, uppercaseToWords} from "../../../../utils/stringUtils";
import moment, {Moment} from "moment";
import {ExtraHeaderButtons} from "../../../../components/ExtraHeaderButtons";
import Title from "antd/lib/typography/Title";
import {DayOfWeek} from "../../../../graphQL/enums/DayOfWeek";
import {SettingsTasksUpdateInputType} from "../../graphQL/settings.mutations";
import {settingsActions} from "../../store/settings.actions";

type FormValues = {
    autoSetWorkingHoursForFullTimers: Moment,
    autoCreateDaysOff_IsEnabled: boolean,
    autoCreateDaysOff_DayOfWeekWhenCreate?: DayOfWeek,
    autoCreateDaysOff_TimeWhenCreate?: Moment,
    autoCreateDaysOff_DaysOfWeek?: DayOfWeek[],
}

export const SettingsTasksUpdate: FC = () => {
    const [form] = useForm<FormValues>();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)
    const isEnabled = Form.useWatch(nameof<FormValues>('autoCreateDaysOff_IsEnabled'), form);

    const onFinish = (values: FormValues) => {
        const settingsTasksUpdateInputType: SettingsTasksUpdateInputType = {
            autoSetWorkingHoursForFullTimers: values.autoSetWorkingHoursForFullTimers?.format('HH:mm:ss'),
            autoCreateDaysOff: {
                isEnabled: values.autoCreateDaysOff_IsEnabled,
                dayOfWeekWhenCreate: values.autoCreateDaysOff_DayOfWeekWhenCreate,
                timeWhenCreate: values.autoCreateDaysOff_TimeWhenCreate?.format('HH:mm:ss'),
                daysOfWeek: values.autoCreateDaysOff_DaysOfWeek,
            }
        }
        dispatch(settingsActions.updateTasksAsync(settingsTasksUpdateInputType));
    };

    const onDiscardChanges = () => {
        form.resetFields()
        form.setFieldsValue(initialValues)
    }

    const initialValues: FormValues = {
        autoSetWorkingHoursForFullTimers: moment(settings?.tasks?.autoSetWorkingHoursForFullTimers, 'HH:mm:ss'),
        autoCreateDaysOff_IsEnabled: settings?.tasks?.autoCreateDaysOff?.isEnabled || false,
        autoCreateDaysOff_DayOfWeekWhenCreate: settings?.tasks?.autoCreateDaysOff?.dayOfWeekWhenCreate,
        autoCreateDaysOff_TimeWhenCreate: moment(settings?.tasks?.autoCreateDaysOff?.timeWhenCreate, 'HH:mm:ss'),
        autoCreateDaysOff_DaysOfWeek: settings?.tasks?.autoCreateDaysOff?.daysOfWeek,
    }

    return (
        <Form
            form={form}
            name="SettingsTasksUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Auto set working hours for full timers"
                        name={nameof<FormValues>('autoSetWorkingHoursForFullTimers')}
                    >
                        <TimePicker placeholder={'Auto set working hours for full timers'}/>
                    </Form.Item>
                </Col>
            </Row>
            <div className={'settingsBlock'}>
                <Space>
                    <Form.Item
                        name={nameof<FormValues>('autoCreateDaysOff_IsEnabled')}
                        style={{marginBottom: 0}}
                    >
                        <Switch size={'small'} defaultChecked={initialValues.autoCreateDaysOff_IsEnabled}/>
                    </Form.Item>
                    <Title level={4}>Auto create days off</Title>
                </Space>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label="Day of week when create"
                            name={nameof<FormValues>('autoCreateDaysOff_DayOfWeekWhenCreate')}
                        >
                            <Select
                                allowClear
                                placeholder="Day of week"
                                disabled={!isEnabled}
                            >
                                {(Object.values(DayOfWeek) as Array<DayOfWeek>).map((value) => (
                                    <Select.Option key={value} value={value}>
                                        {uppercaseToWords(value)}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Time when create"
                            name={nameof<FormValues>('autoCreateDaysOff_TimeWhenCreate')}
                        >
                            <TimePicker
                                placeholder={'Time'}
                                disabled={!isEnabled}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Days of week"
                            name={nameof<FormValues>('autoCreateDaysOff_DaysOfWeek')}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Days of week"
                                disabled={!isEnabled}
                            >
                                {(Object.values(DayOfWeek) as Array<DayOfWeek>).map((value) => (
                                    <Select.Option key={value} value={value}>
                                        {uppercaseToWords(value)}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <ExtraHeaderButtons
                onDiscardChanges={onDiscardChanges}
                onSaveChanges={form.submit}
                loading={loading}
            />
        </Form>
    );
};