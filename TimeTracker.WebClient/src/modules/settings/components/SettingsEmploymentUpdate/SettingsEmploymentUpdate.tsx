import {Col, Form, Row, Select} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSubmit} from "../../../../components/ButtonSubmit/ButtonSubmit";
import {SettingsEmploymentUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {range} from "../../../../utils/arrayUtils";

type FromValues = {
    fullTimeHoursInWorkday?: string,
    partTimeHoursInWorkday?: string[],
};

export const SettingsEmploymentUpdate: FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)

    const onFinish = (values: FromValues) => {
        const settingsEmploymentUpdateInputType: SettingsEmploymentUpdateInputType = {
            fullTimeHoursInWorkday: values.fullTimeHoursInWorkday ? parseInt(values.fullTimeHoursInWorkday) : 0,
            partTimeHoursInWorkday: values.partTimeHoursInWorkday ? values.partTimeHoursInWorkday.map(hour => parseInt(hour)) : [],
        }
        dispatch(settingsActions.updateEmploymentAsync(settingsEmploymentUpdateInputType));
    };

    const initialValues: FromValues = {
        fullTimeHoursInWorkday: settings?.employment.fullTimeHoursInWorkday.toString(),
        partTimeHoursInWorkday: settings?.employment.partTimeHoursInWorkday.map(h => h.toString()),
    }

    return (
        <Form
            form={form}
            name="SettingsEmploymentUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
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
            <ButtonSubmit loading={loading}>
                Save
            </ButtonSubmit>
        </Form>
    );
};