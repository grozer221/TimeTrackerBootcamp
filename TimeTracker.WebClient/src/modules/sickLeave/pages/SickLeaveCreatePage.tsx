import {DatePicker, Form, Modal, Select} from "antd";
import {Moment} from "moment";
import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useForm} from "antd/es/form/Form";
import {nameof} from "../../../utils/stringUtils";
import Title from "antd/lib/typography/Title";
import {formStyles} from "../../../assets/form";
import Input from "antd/es/input/Input";
import {SickLeaveInputType} from "../graphQL/sickLeave.mutation";
import {sickLeaveActions} from "../store/sickLeave.slice";
import {User} from "../../users/graphQL/users.types";
import {usersActions} from "../../users/store/users.slice";
import {Employment} from "../../../graphQL/enums/Employment";
import {Role} from "../../../graphQL/enums/Role";

const {RangePicker} = DatePicker;


type FormValues = {
    startAndEnd: Moment[],
    comment?: string,
    userId: string
}

export const SickLeaveCreatePage: FC = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm<FormValues>();
    const navigate = useNavigate();
    let users = useAppSelector(s => s.users.usersForVacation)
    const loadingCreate = useAppSelector(s => s.sickLeave.loadingCreate)

    useEffect(() => {
        dispatch(usersActions.fetchUsersForVacationsSelect({
            filter: {email: '', permissions: [], roles: []},
            take: 100,
            skip: 0,
        }))
    }, [])

    const onFinish = async () => {
        try {
            await form.validateFields();
            const startAndEnd = form.getFieldValue(nameof<FormValues>('startAndEnd'))
            const comment = form.getFieldValue(nameof<FormValues>('comment'))
            const userId = form.getFieldValue(nameof<FormValues>("userId"))
            const sickLeaveInputType: SickLeaveInputType = {
                startDate: startAndEnd[0].format('YYYY-MM-DD'),
                endDate: startAndEnd[1].format('YYYY-MM-DD'),
                comment,
                userId
            }
            dispatch(sickLeaveActions.createAsync(sickLeaveInputType))
        } catch (e) {
            console.log(e)
        }
    }

    const initialValues: FormValues = {
        startAndEnd: [],
        comment: '',
        userId: ""
    }

    return (
        <Modal
            title={<Title level={4}>Create sick leave days</Title>}
            confirmLoading={loadingCreate}
            visible={true}
            onOk={() => form.submit()}
            okText={'Create'}
            onCancel={() => navigate(-1)}
        >
            <Form
                name="SickLeaveCreateForm"
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
                labelCol={formStyles}
            >
                <Form.Item
                    name={nameof<FormValues>('startAndEnd')}
                    label={'Start and end'}
                    rules={[{required: true, message: 'Date start and date end is required'}]}
                >
                    <RangePicker/>

                </Form.Item>
                <Form.Item
                    name={nameof<FormValues>('comment')}
                    label={'Comment'}
                >
                    <Input placeholder={'Comment'}/>
                </Form.Item>
                <Form.Item
                    name={nameof<FormValues>("userId")}
                    label={'User'}
                >
                    <Select
                        className={'w-100'}
                        placeholder="User"
                        filterOption={false}
                        onSearch={(email) => {
                            dispatch(usersActions.fetchUsersForVacationsSelect({
                                filter: {email, permissions: [], roles: []},
                                take: 100,
                                skip: 0,
                            }))
                        }}
                    >
                        {users.map((user) => (
                            <Select.Option key={user.id} value={user.id}>
                                {user.email}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};