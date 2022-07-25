import * as React from 'react';
import {Button, Divider, Form, Input, Modal, Select, Space, Typography} from "antd";
import {FC, KeyboardEventHandler, memo, useCallback, useEffect, useState} from "react";
import {UserAddOutlined} from "@ant-design/icons";
import './CreateUserModal.css'
import Title from "antd/lib/typography/Title";
import {useNavigate} from "react-router-dom";
import {nameof, uppercaseToWords} from "../../../../utils/stringUtils";
import {CalendarDaysCreateRangeInputType} from "../../../calendarDays/graphQL/calendarDays.mutations";
import {DayOfWeek} from "../../../../graphQL/enums/DayOfWeek";
import {Permission} from "../../../../graphQL/enums/Permission";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import {User, UserFilter} from "../../graphQL/users.types";
import {usersPageActions} from "../../store/usersPage.actions";
import {RootState} from "../../../../store/store";
import {CreateUserInput} from "../../graphQL/users.mutations";


type FormValues = {
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    password: string,
    repeatPassword: string,
    permissions: Permission[],
    usersWhichCanApproveVacationRequest: User[],
}

type Props = {};
export const CreateUserModal: FC<Props> = () => {
    const navigate = useNavigate();
    const [form] = useForm()
    const dispatch = useDispatch()
    let [searchUrl, setSearchUrl] = useState("")

    let users = useSelector((s: RootState) => s.usersPage.usersForVocation)

    useEffect(()=>{
        dispatch(usersPageActions.fetchUsersForVocationsSelect(""))
    },[])

    const handleOk = async () => {
        try {
            await form.validateFields()
            const firstName = form.getFieldValue(nameof<FormValues>("firstName"))
            const lastName = form.getFieldValue(nameof<FormValues>("lastName"))
            const middleName = form.getFieldValue(nameof<FormValues>("middleName"))
            const email = form.getFieldValue(nameof<FormValues>("email"))
            const password = form.getFieldValue(nameof<FormValues>("password"))
            const permissions = form.getFieldValue(nameof<FormValues>("permissions")) ?? []
            const usersWhichCanApproveVacationRequest =
                form.getFieldValue(nameof<FormValues>("usersWhichCanApproveVacationRequest")) ?? []

            let newUser: CreateUserInput = {
                firstName, lastName, middleName, email, permissions, password,
                usersWhichCanApproveVocationRequestIds: usersWhichCanApproveVacationRequest
            } as CreateUserInput

            dispatch(usersPageActions.createUser(newUser))

        } catch (e) {
            console.log(e)
        }
    }

    console.log(users)

    return (
        <Modal
            title={<Title level={4}>Create new User</Title>}
            // confirmLoading={loading}
            visible={true}
            onOk={handleOk}
            okText={'Create'}
            onCancel={() => navigate(-1)}
        >
            <Form
                form={form}
                labelCol={{span: 24}}>
                <Form.Item name={nameof<FormValues>("firstName")}
                           label={"Firstname:"}
                           rules={[{required: true, message: 'Please input user Firstname!'}]}>
                    <Input placeholder="Input user firstname"/>
                </Form.Item>

                <Form.Item name={nameof<FormValues>("lastName")}
                           label={"Lastname:"}
                           rules={[{required: true, message: 'Please input user Lastname!'}]}>
                    <Input placeholder="Input user lastname"/>
                </Form.Item>

                <Form.Item name={nameof<FormValues>("middleName")}
                           label={"Middle name:"}
                           rules={[{required: true, message: 'Please input user Middle name!'}]}>
                    <Input placeholder="Input user Middle name"/>
                </Form.Item>

                <Form.Item name={nameof<FormValues>("email")}
                           label={"Email:"}
                           rules={[{required: true, message: 'Please input user Email!'}]}>
                    <Input placeholder="example@gmail.com"/>
                </Form.Item>

                <Form.Item name={nameof<FormValues>("password")}
                           label={"Password:"}
                           rules={[{required: true, message: 'Please input user Password!'}]}>
                    <Input.Password
                        placeholder="Input user password"
                    />
                </Form.Item>

                <Form.Item name={nameof<FormValues>("repeatPassword")}
                           label={"Repeat password:"}
                           dependencies={['password']}
                           hasFeedback
                           rules={[
                               {
                                   required: true,
                                   message: 'Please confirm password!',
                               },
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('password') === value) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                   },
                               }),
                           ]}>
                    <Input.Password
                        placeholder="Repeat password"
                    />
                </Form.Item>

                <Form.Item
                    name={nameof<FormValues>("permissions")}
                    label={'Permissions'}
                >
                    <Select
                        className={'w-100'}
                        mode="multiple"
                        allowClear
                        placeholder="Day of weeks"
                    >
                        {(Object.values(Permission) as Array<Permission>).map((value) => (
                            <Select.Option key={value} value={value}>
                                {uppercaseToWords(value)}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={nameof<FormValues>("usersWhichCanApproveVacationRequest")}
                    label={'Can approve vacation requests for users:'}
                >
                    <Select
                        className={'w-100'}
                        mode="multiple"
                        allowClear
                        placeholder="Users"
                        filterOption={false}
                        onSearch={(e) => {
                            dispatch(usersPageActions.fetchUsersForVocationsSelect(e))
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
    )
        ;
};