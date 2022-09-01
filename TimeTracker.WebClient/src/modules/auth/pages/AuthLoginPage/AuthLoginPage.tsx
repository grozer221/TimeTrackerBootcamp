import React, {FC, useEffect} from "react";
import {Button, Checkbox, Form, Input, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth.slice";
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

    function handleCallbackResponse(response: { credential: String }) {
        console.log(response.credential)
        dispatch(authActions.userLoginGoogleAsync(response.credential))
    }

    useEffect(()=>{
        // @ts-ignore
        google.accounts.id.initialize({
            client_id: "988882606161-213a1m96g0m00so07uhkvhv41o1hci2b.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        // @ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "medium"}
            )
    }, [])

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

                <Form.Item
                    name="email"
                    rules={[
                        {required: true, message: 'Email is required'},
                        {type: 'email', message: 'It is not email'},
                    ]}
                >
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Password is required'}]}
                >
                    <Input.Password placeholder="Password"/>
                </Form.Item>

                <Form.Item>
                    <Row justify={'space-between'} align={'middle'}>
                        <Checkbox>Remember me</Checkbox>
                        <Link to="../request-reset-password">Forget password</Link>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        LOGIN
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div id="signInDiv"></div>
                </Form.Item>
            </Form>
        </div>
    )
}