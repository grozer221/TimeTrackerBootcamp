import {Col, Form, Input, Row} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSubmit} from "../../../../components/ButtonSubmit/ButtonSubmit";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {notificationsActions} from "../../../notifications/store/notifications.actions";

type Props = {};
export const SettingsTasksUpdate: FC<Props> = ({}) => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)

    const onFinish = () => {
        dispatch(notificationsActions.addInfo('No actions'))
    };

    return (
        <Form
            form={form}
            name="SettingsTasksUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={{}}
        >
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item
                        label="Input"
                        name="Input"
                    >
                        <Input placeholder="Input"/>
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