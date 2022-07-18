import {Col, Form, Row, Select, Space} from 'antd';
import React, {FC, useEffect, useRef} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSaveChanges} from "../../../../components/ButtonSaveChanges/ButtonSaveChanges";
import {SettingsEmploymentUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {range} from "../../../../utils/arrayUtils";
import {getHeaderExtraButtonsElement} from "../../../../components/AppLayout/AppLayout";
import {createPortal} from "react-dom";
import {ButtonDiscardChanges} from "../../../../components/ButtonDiscardChanges/ButtonDiscardChanges";

type FromValues = {
    fullTimeHoursInWorkday?: string,
    partTimeHoursInWorkday?: string[],
};

export const SettingsEmploymentUpdate: FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)
    const headerExtraButtonsElement = useRef(document.createElement('div'))

    useEffect(() => {
        getHeaderExtraButtonsElement().appendChild(headerExtraButtonsElement.current);
        return () => {
            getHeaderExtraButtonsElement().removeChild(headerExtraButtonsElement.current);
        }
    }, [])

    const onFinish = (values: FromValues) => {
        const settingsEmploymentUpdateInputType: SettingsEmploymentUpdateInputType = {
            fullTimeHoursInWorkday: values.fullTimeHoursInWorkday ? parseInt(values.fullTimeHoursInWorkday) : 0,
            partTimeHoursInWorkday: values.partTimeHoursInWorkday ? values.partTimeHoursInWorkday.map(hour => parseInt(hour)) : [],
        }
        dispatch(settingsActions.updateEmploymentAsync(settingsEmploymentUpdateInputType));
    };

    const initialValues: FromValues = {
        fullTimeHoursInWorkday: settings?.employment?.fullTimeHoursInWorkday.toString(),
        partTimeHoursInWorkday: settings?.employment?.partTimeHoursInWorkday.map(h => h.toString()),
    }

    return (
        <Form
            form={form}
            name="SettingsEmploymentUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
            onReset={() => form.resetFields()}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Full time hours in workday"
                        name={nameof<FromValues>('fullTimeHoursInWorkday')}
                        rules={[{required: true, message: 'Full time hours in workday is required'}]}
                    >
                        <Select
                            allowClear
                            placeholder="Full time hours in workday"
                        >
                            {range(24, 0).map(num => <Select.Option key={num}>{num}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Part time hours in workday"
                        name={nameof<FromValues>('partTimeHoursInWorkday')}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Part time hours in workday"
                        >
                            {range(24, 0).map(num => <Select.Option key={num}>{num}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            {createPortal(
                <Space>
                    <ButtonDiscardChanges onClick={() => form.resetFields()}/>
                    <ButtonSaveChanges loading={loading} onClick={() => form.submit()}/>
                </Space>,
                headerExtraButtonsElement.current)
            }
        </Form>
    );
};