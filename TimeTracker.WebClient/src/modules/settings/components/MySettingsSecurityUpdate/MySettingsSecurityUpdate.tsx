import {Button, Col, Form, Input, Row} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {useDispatch} from "react-redux";
import Title from "antd/lib/typography/Title";
import {nameof} from "../../../../utils/stringUtils";
import {authActions} from "../../../auth/store/auth.slice";

type ChangePasswordFormValues = {
    oldPassword: string,
    newPassword: string,
};

export const MySettingsSecurityUpdate: FC = () => {
    const [changePasswordForm] = useForm();
    const dispatch = useDispatch();

    const onChangePasswordFinish = (values: ChangePasswordFormValues) => {
        dispatch(authActions.changePasswordAsync({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        }))
    };

    return (
        <div>
            <div className={'settingsBlock'}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form
                            form={changePasswordForm}
                            name="MySettingsSecurityChangePasswordForm"
                            onFinish={onChangePasswordFinish}
                            labelCol={formStyles}
                        >
                            <Title level={4}>Change password</Title>
                            <Form.Item
                                label="Old password"
                                name={nameof<ChangePasswordFormValues>('oldPassword')}
                                rules={[
                                    {required: true, message: 'Old password is required'},
                                ]}
                            >
                                <Input.Password placeholder={'Old password'}/>
                            </Form.Item>
                            <Form.Item
                                label="New password"
                                name={nameof<ChangePasswordFormValues>('newPassword')}
                                rules={[
                                    {required: true, message: 'New password is required'},
                                    {min: 5, message: 'Min length for new password is 5 symbols'},
                                ]}
                            >
                                <Input.Password placeholder={'New password'}/>
                            </Form.Item>
                            <Button
                                style={{width: '100%'}}
                                htmlType={'submit'}
                            >Change</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};