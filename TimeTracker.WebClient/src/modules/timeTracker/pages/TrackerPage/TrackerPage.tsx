import React, { useEffect, useRef, useState } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {isAdministratorOrHavePermissions, isAuthenticated} from "../../../../utils/permissions";
import {Permission} from "../../../../graphQL/enums/Permission";
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, InputNumber, Modal, Typography } from 'antd';
import s from "./TrackerPage.module.css"
import {TrackCreatePage} from "../../../tracks/pages/TracksCreatePage/TrackCreatePage";
import type { FormInstance } from 'antd/es/form';
import {ButtonCreate} from "../../../../components/ButtonCreate";


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


interface TrackType {
    title: string;
    description: string;
}


export const TrackerPage: React.FC = () => {

    const location = useLocation();

    const onFinish = (values: any) => {
        console.log('Finish:', values);
    };

    return (
        <Form.Provider>
            <Form {...layout} name="basicForm" onFinish={onFinish} style={{position: "absolute", left: "10px", width: "90%"}}>
                <Form.Item name="group" label="Project Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Track List"
                    shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
                >
                    {({getFieldValue}) => {
                        const tracks: TrackType[] = getFieldValue('tracks') || [];
                        return tracks.length ? (
                            <ul>
                                {tracks.map((tracks, index) => (
                                    <li key={index} className={s.user}>
                                        <Avatar icon={<UserOutlined />} />
                                        {tracks.title} - {tracks.description}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography.Text className="ant-form-text" type="secondary">
                                ( <SmileOutlined /> No tracks yet. )
                            </Typography.Text>
                        );
                    }}
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <ButtonCreate to={'create'} popup={location} size={'large'} />
                </Form.Item>
            </Form>
        </Form.Provider>
    );
};

