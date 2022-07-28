import React, {useState, memo} from 'react';
import {Modal} from "antd";
import Title from "antd/lib/typography/Title";
import {useNavigate, useParams} from "react-router-dom";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {User} from "../../graphQL/users.types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import './RemoveUserModal.css'

const {confirm} = Modal;

export const RemoveUserModal = memo(() => {
    const navigate = useNavigate();
    const params = useParams();
    const email = params['email']
    const dispatch = useDispatch()

    const showConfirm = () => {
        confirm({
            title: <Title level={4}>Confirm removing</Title>,
            icon: <ExclamationCircleOutlined/>,
            content: 'Do you want to delete user "' + email + '" ?',
            onOk() {
                navigate(-1)
            },
            onCancel() {
                navigate(-1)
            },
        });
        return <></>
    };

    return <>
        {showConfirm()}
    </>
})