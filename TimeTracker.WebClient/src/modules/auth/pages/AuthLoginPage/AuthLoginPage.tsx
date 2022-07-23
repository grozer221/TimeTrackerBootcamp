import React, {FC, useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth.actions";
import {AuthLoginInputType} from "../../graphQL/auth.mutations";
import './AuthLoginPage.css'
import {RootState} from "../../../../store/store";
import {Link, useNavigate} from "react-router-dom";

export const AuthLoginPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    useEffect(() => {
        if (isAuth)
            navigate(-1);
    }, [isAuth])

    const onFinish = (values: AuthLoginInputType) => {
        dispatch(authActions.userLoginAsync(values))
    };

    return (
        <div className="login-box">
            <Form
                name="login-form"
                initialValues={{remember: true}}
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
                    <Link to="../request-reset">
                        Forget password
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        LOGIN
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}