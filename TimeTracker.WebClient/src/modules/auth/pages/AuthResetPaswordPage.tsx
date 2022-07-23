import React, {FC} from "react";
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth.actions";
import {Link, useParams} from "react-router-dom";

type FormValues = {
    password: string
}

export const AuthResetPasswordPage: FC = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const token = params.token || ""

    const onFinish = (values: FormValues) => {
        dispatch(authActions.resetPasswordAsync({password: values.password, token: token}))
    };

    return (
        <div className="login-box">
            <Form
                name="login-form"
                onFinish={onFinish}
            >
                <p className="form-title" style={{marginBottom: '20px'}}>Reset password</p>
                <Form.Item name="password"
                           rules={[{required: true, message: 'Please input new password!'}]}
                >
                    <Input placeholder="New password" type="password"/>
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