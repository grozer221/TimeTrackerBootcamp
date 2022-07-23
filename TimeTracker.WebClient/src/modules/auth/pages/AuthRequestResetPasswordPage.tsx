import React, {FC, useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth.actions";
import {AuthLoginInputType, AuthRequestResetPasswordInputType} from "../graphQL/auth.mutations";
import {RootState} from "../../../store/store";
import {Link, useNavigate} from "react-router-dom";

export const AuthRequestResetPasswordPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onFinish = (values: AuthRequestResetPasswordInputType) => {
        dispatch(authActions.requestResetPasswordAsync(values))
    };

    return (
        <div className="login-box">
            <Form
                name="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <p className="form-title">Reset password</p>

                <Form.Item name="email"
                           rules={[{required: true, message: 'Please input your email!'},
                                   {type: 'email', message: 'It`s not email'}]}
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