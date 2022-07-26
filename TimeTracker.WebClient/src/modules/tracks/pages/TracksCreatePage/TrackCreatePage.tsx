import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Modal} from 'antd';
import type { FormInstance } from 'antd/es/form';
import {useNavigate} from 'react-router-dom';
import {useForm} from "antd/es/form/Form";
import {nameof} from "../../../../utils/stringUtils";

type FormValues = {
    title: string,
    description: string | null
}

export const TrackCreatePage = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const onOk = async () => {

    };

    return (
            <Modal
                title="Track create page"
                visible={true}
                onOk={onOk}
                onCancel={() => navigate(-1)}>
            <Form form={form} layout="vertical" name="trackForm">
                <Form.Item name={nameof<FormValues>('title')} label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={nameof<FormValues>('description')} label="Description" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>

    );
};