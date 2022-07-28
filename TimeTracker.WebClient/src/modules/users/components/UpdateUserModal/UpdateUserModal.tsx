import * as React from 'react';
import {Form, Input, Modal, Select} from "antd";
import {FC, useEffect,} from "react";
import Title from "antd/lib/typography/Title";
import {useNavigate} from "react-router-dom";
import {nameof, uppercaseToWords} from "../../../../utils/stringUtils";
import {Permission} from "../../../../graphQL/enums/Permission";
import {useForm} from "antd/es/form/Form";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../graphQL/users.types";
import {usersActions} from "../../store/users.slice";
import {RootState} from "../../../../store/store";
import {UpdateUserInput} from "../../graphQL/users.mutations";


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
export const UpdateUserModal: FC<Props> = () => {
    const navigate = useNavigate();
    const [form] = useForm()
    const dispatch = useDispatch()

    // dispatch(actions.searchSmtngUserByEmail(Email))
    let user = useSelector((s: RootState) => s.users.users[0])
    let usersForVocation = useSelector((s: RootState) => s.users.usersForVocation)

    useEffect(() => {
        dispatch(usersActions.fetchUsersForVocationsSelect({filter: {email: ""}, skip: 0, take: 1000}))
    }, [])

    const handleOk = async () => {
        try {
            await form.validateFields()
            const firstName = form.getFieldValue(nameof<FormValues>("firstName"))
            const lastName = form.getFieldValue(nameof<FormValues>("lastName"))
            const middleName = form.getFieldValue(nameof<FormValues>("middleName"))
            const email = form.getFieldValue(nameof<FormValues>("email"))
            const permissions = form.getFieldValue(nameof<FormValues>("permissions")) ?? []
            const usersWhichCanApproveVacationRequest =
                form.getFieldValue(nameof<FormValues>("usersWhichCanApproveVacationRequest")) ?? []

            let updatedUser: UpdateUserInput = {
                id: user.id,
                firstName, lastName, middleName, email, permissions,
                usersWhichCanApproveVocationRequestIds: usersWhichCanApproveVacationRequest
            } as UpdateUserInput

            //dispatch(usersPageActions.updateUser(updatedUser))
            navigate(-1)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            title={<Title level={4}>{"Update User " + user.firstName}</Title>}
            // confirmLoading={loading}
            visible={true}
            onOk={handleOk}
            okText={'Update'}
            onCancel={() => navigate(-1)}
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
                    usersWhichCanApproveVacationRequest: user.usersWhichCanApproveVacationRequest
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
                            dispatch(usersActions.fetchUsersForVocationsSelect({filter: {email: e}, skip: 0, take: 1000}))
                        }}
                    >
                        {usersForVocation.map((user) => (
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