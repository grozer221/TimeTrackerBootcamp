import React, {FC} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store/auth/auth.actions";
import {AuthLoginInputType} from "../../../graphQL/modules/auth/auth.mutations";
import './LoginPage.css'
import {RootState} from "../../../store/store";

export const LogInPage: FC = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const onFinish = (values: AuthLoginInputType) => {
        dispatch(authActions.userLoginAsync(values))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <div className="login-box">
            {
                isAuth
                    ? "you already logged in!"
                    :<Form
                        name="login-form"
                        initialValues={{remember: true}}
                        onFinishFailed={onFinishFailed}
                        onFinish={onFinish}
                    >
                        <p className="form-title">Welcome back</p>
                        <p>Login to the TimeTracker</p>

                        <Form.Item name="email"
                                   rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input placeholder="Email"/>
                        </Form.Item>

                        <Form.Item name="password"
                                   rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </div>
    </>
}