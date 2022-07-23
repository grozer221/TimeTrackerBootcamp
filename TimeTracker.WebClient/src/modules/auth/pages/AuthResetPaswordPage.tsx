import React, {FC, useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth.actions";
import {
    AuthLoginInputType,
    AuthRequestResetPasswordInputType,
    AuthResetPasswordInputType
} from "../graphQL/auth.mutations";
import {RootState} from "../../../store/store";
import {useNavigate, useParams} from "react-router-dom";


type FormValues = {
    password: string
}

export const AuthResetPasswordPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const token = params.token || ""

    const onFinish = (values: FormValues) => {
        dispatch(authActions.resetPasswordAsync({password: values.password, token: token}))
    };

    return (
        <div className="login-box">
            <Form
                name="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <p className="form-title">Reset password</p>

                <Form.Item name="password"
                           rules={[{required: true, message: 'Please input new password!'}]}
                >
                    <Input placeholder="New password" type="password"/>
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