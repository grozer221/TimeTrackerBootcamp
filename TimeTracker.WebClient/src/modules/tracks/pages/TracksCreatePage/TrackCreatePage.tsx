import React from 'react';
import {Form, Input, Modal} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useForm} from "antd/es/form/Form";
import {nameof} from "../../../../utils/stringUtils";
import {CreateTrackInput} from "../../graphQL/tracks.mutations";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../store/tracks.slice";

type FormValues = {
    title: string,
    description: string | null
}

export const TrackCreatePage = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const onFinish = async () => {
        try {
            await form.validateFields()
            const title = form.getFieldValue(nameof<FormValues>('title'))
            const description = form.getFieldValue(nameof<FormValues>('description'))

            let newTrack: CreateTrackInput = {
                title,
                description
            } as CreateTrackInput

            dispatch(tracksAction.createTrack(newTrack))
            navigate(-1)
        } catch (e) {
            console.log(e)
        }
    };


    return (
            <Modal
                title="Track create page"
                visible={true}
                onOk={() => form.submit()}
                okText={'Create'}
                onCancel={() => navigate(-1)}>
            <Form
                form={form}
                layout="vertical"
                name="trackForm"
                onFinish={onFinish}>
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