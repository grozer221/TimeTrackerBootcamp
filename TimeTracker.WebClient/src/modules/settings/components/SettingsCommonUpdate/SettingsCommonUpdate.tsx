import {Col, Form, Input, InputNumber, Row} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSubmit} from "../../../../components/ButtonSubmit/ButtonSubmit";
import {SettingsCommonUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {identity} from "rxjs";
import {nameof} from "../../../../utils/stringUtils";

type Props = {};
export const SettingsCommonUpdate: FC<Props> = ({}) => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)

    const onFinish = (values: SettingsCommonUpdateInputType) => {
        const settingsCommonUpdateInputType: SettingsCommonUpdateInputType = {
            fullTimeHoursInWorkday: values.fullTimeHoursInWorkday,
        }
        dispatch(settingsActions.updateCommonAsync(settingsCommonUpdateInputType));
    };

    return (
        <Form
            form={form}
            name="SettingsCommonUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={{
                fullTimeHoursInWorkday: settings?.common.fullTimeHoursInWorkday
            }}
        >
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item
                        label="Full time hours in workday"
                        name={nameof<SettingsCommonUpdateInputType>('fullTimeHoursInWorkday')}
                        rules={[{required: true, message: 'Full time hours in workday is required'}]}
                    >
                        <InputNumber
                            placeholder={'Full time hours in workday'}
                            type={'number'}
                            className={'w-100'}
                            min={1}
                            max={24}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Input"
                        name="Input1"
                    >
                        <Input placeholder="Input"/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Input"
                        name="Input2"
                    >
                        <Input placeholder="Input"/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Input"
                        name="Input3"
                    >
                        <Input placeholder="Input"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}>

                    <Form.Item
                        label="Input"
                        name="Input4"
                    >
                        <Input placeholder="Input"/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Input"
                        name="Input5"
                    >
                        <Input placeholder="Input"/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Input"
                        name="Input6"
                    >
                        <Input placeholder="Input"/>
                    </Form.Item>
                </Col>
            </Row>
            <ButtonSubmit loading={loading}>
                Save
            </ButtonSubmit>
        </Form>
    );
};