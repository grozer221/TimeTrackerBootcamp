import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Modal} from 'antd';
import type { FormInstance } from 'antd/es/form';
import {useNavigate} from 'react-router-dom';


const useResetFormOnCloseModal = ({ form, visible }: { form: FormInstance; visible: boolean }) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [form, prevVisible, visible]);
};


export const TrackCreatePage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useResetFormOnCloseModal({
        form,
        visible
    });

    const onOk = () => {
        form.submit();
        navigate(-1)
    };

    return (
        <Form.Provider
            onFormFinish={(name, { values, forms }) => {
                if (name === 'trackForm') {
                    const { basicForm } = forms;
                    const tracks = basicForm.getFieldValue('tracks') || [];
                    console.log(tracks)
                    basicForm.setFieldsValue({ tracks: [...tracks, values] });
                }
            }}>
            <Modal title="Basic Drawer" visible={true} onOk={onOk} onCancel={() => navigate(-1)}>
            <Form form={form} layout="vertical" name="trackForm">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </Form.Provider>

    );
};