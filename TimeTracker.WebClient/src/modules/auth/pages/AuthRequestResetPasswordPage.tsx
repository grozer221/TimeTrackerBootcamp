import React, {FC} from "react";
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth.slice";
import {AuthRequestResetPasswordInputType} from "../graphQL/auth.mutations";
import {Link} from "react-router-dom";

export const AuthRequestResetPasswordPage: FC = () => {
    const dispatch = useDispatch()

    const onFinish = (values: AuthRequestResetPasswordInputType) => {
        dispatch(authActions.requestResetPasswordAsync(values))
    };

    return (
        <div className="login-box">
            <Form
                name="login-form"
                onFinish={onFinish}
            >
                <p className="form-title" style={{marginBottom: '20px'}}>Reset password</p>
                <Form.Item
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        {type: 'email', message: 'It`s not email'}
                    ]}
                >
                    <Input placeholder="Email"/>
                </Form.Item>
                <Form.Item>
                    <Link to="/auth/login">
                        Back to login
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        RESET
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}