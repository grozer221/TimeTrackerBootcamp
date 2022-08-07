import * as React from 'react';
import {Form, Input, Modal, Radio, Select} from "antd";
import {FC, useEffect, useState,} from "react";
import Title from "antd/lib/typography/Title";
import {useParams} from "react-router-dom";
import {nameof, uppercaseToWords} from "../../../../utils/stringUtils";
import {Permission} from "../../../../graphQL/enums/Permission";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../graphQL/users.types";
import {usersActions} from "../../store/users.slice";
import {RootState, useAppSelector} from "../../../../store/store";
import {UpdateUserInput} from "../../graphQL/users.mutations";
import {Employment} from "../../../../graphQL/enums/Employment";
import {navigateActions} from "../../../navigate/store/navigate.slice";

type FormValues = {
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    password: string,
    repeatPassword: string,
    permissions: Permission[],
    usersWhichCanApproveVacationRequest: string[],
    employment: Employment,
}

type Props = {};
export const UpdateUserModal: FC<Props> = () => {
    const [form] = useForm()
    const dispatch = useDispatch()
    const params = useParams();
    const email = params['email']

    let user = useSelector((s: RootState) => s.users.users.find(x => x.email === email)) as User
    let usersForVacation = useSelector((s: RootState) => s.users.usersForVacation)

    let notFetchedUsers = user.usersWhichCanApproveVacationRequest.filter(user => {
        return !usersForVacation.find(u => u.id === user.id);
    }) as User[]

    let usersForVacationLoading = useAppSelector(s => s.users.usersForVacationLoading)
    let [usersForVacationEmail, setUsersForVacationEmail] = useState('')
    let [currentPage, setCurrentPage] = useState(0)
    let [usersPageSize, setUsersPageSize] = useState(10)
    let totalUsersForVacation = useAppSelector(s => s.users.totalUsersForVacation)


    useEffect(() => {
        dispatch(usersActions.fetchUsersForVacationsSelect({filter: {email: ""}, skip: 0, take: usersPageSize}))
    }, [])

    const handleOk = async () => {
        try {
            await form.validateFields()
            const firstName = form.getFieldValue(nameof<FormValues>("firstName"))
            const lastName = form.getFieldValue(nameof<FormValues>("lastName"))
            const middleName = form.getFieldValue(nameof<FormValues>("middleName"))
            const email = form.getFieldValue(nameof<FormValues>("email"))
            const employment = form.getFieldValue(nameof<FormValues>("employment"))
            const permissions = form.getFieldValue(nameof<FormValues>("permissions")) ?? []
            const usersWhichCanApproveVacationRequestIds =
                form.getFieldValue(nameof<FormValues>("usersWhichCanApproveVacationRequest")) ?? []

            let updatedUser: UpdateUserInput = {
                id: user.id,
                firstName, lastName, middleName, email, permissions, employment,
                usersWhichCanApproveVacationRequestIds: usersWhichCanApproveVacationRequestIds
            } as UpdateUserInput

            dispatch(usersActions.updateUser(updatedUser))
        } catch (e) {
            console.log(e)
        }
    }

    const handleCancel = () => {
        dispatch(usersActions.clearUsersForVacationData())
        dispatch(navigateActions.navigate(-1))
    }

    return (
        <Modal
            title={<Title level={4}>{"Update User " + user.firstName}</Title>}
            // confirmLoading={loading}
            visible={true}
            onOk={handleOk}
            okText={'Update'}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                labelCol={{span: 24}}
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    middleName: user.middleName,
                    email: user.email,
                    permissions: user.permissions,
                    employment: user.employment,
                    usersWhichCanApproveVacationRequest: user.usersWhichCanApproveVacationRequest.map(u => u.id)
                } as FormValues}
            >
                <Form.Item name={nameof<FormValues>("firstName")}
                           label={"Firstname:"}
                           rules={[{required: true, message: 'Please input user Firstname!'}]}
                >
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

                <Form.Item name={nameof<FormValues>("employment")}
                           label={"Employment:"}
                           rules={[{required: true, message: 'Please choose user employment!'}]}>
                    <Radio.Group>
                        {
                            Object.values(Employment).map(value =>
                                <Radio value={value}>
                                    {uppercaseToWords(value)}
                                </Radio>)
                        }
                    </Radio.Group>
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
                    label={'Users which can approve vacation request'}
                >
                    <Select
                        className={'w-100'}
                        mode="multiple"
                        allowClear
                        placeholder="Users"
                        filterOption={false}
                        onPopupScroll={(e) => {
                            let target = e.target as HTMLSelectElement
                            if (!usersForVacationLoading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
                                if (currentPage < totalUsersForVacation) {
                                    dispatch(usersActions.setUsersForVacationLoading(true))
                                    target.scrollTo(0, target.scrollHeight)
                                    dispatch(usersActions.fetchUsersForVacationsSelect({
                                        filter: {email: usersForVacationEmail},
                                        take: usersPageSize,
                                        skip: currentPage + 1,
                                    }))
                                    setCurrentPage(currentPage + 1)
                                }
                            }
                        }}
                        onSearch={(email) => {
                            setUsersForVacationEmail(email)
                            dispatch(usersActions.setUsersForVacationLoading(true))
                            dispatch(usersActions.fetchUsersForVacationsSelect({
                                filter: {email},
                                take: usersPageSize,
                                skip: 0,
                            }))
                            setCurrentPage(0)
                        }}
                    >
                        {usersForVacation.map((user) => (
                            <Select.Option key={user.id} value={user.id}>
                                {user.email}
                            </Select.Option>
                        ))}

                        {notFetchedUsers.map((user) => (
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