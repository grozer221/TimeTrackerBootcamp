import React, {useEffect, useRef, useState} from 'react';
import {isAuthenticated} from "../../../../utils/permissions";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../store/store";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Role} from "../../../../graphQL/enums/Role";
import {Permission} from "../../../../graphQL/enums/Permission";
import {User} from "../../graphQL/users.types";
import {Button, Col, Divider, Dropdown, Menu, Row, Space, Table, TableProps, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {DownCircleFilled, UserAddOutlined} from '@ant-design/icons';
import {uppercaseToWords} from "../../../../utils/stringUtils";
import {usersActions} from "../../store/users.slice";
import {ExcelExportButton} from "../../../../components/ExcelExportButton";
import {Employment} from "../../../../graphQL/enums/Employment";
import {getColumnSearchProps} from "../../components/parrtial/ColumnSerach";

export const UsersPage = React.memo(() => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    let totalPages = useAppSelector(s => s.users.total)
    let pageSize = useAppSelector(s => s.users.pageSize)
    let users = useAppSelector(s => s.users.users)
    let filter = useAppSelector(s => s.users.filter)
    let currentPage = useAppSelector(s => s.users.currentPage)

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(() => {
        dispatch(usersActions.getAsync({
            take: pageSize,
            skip: currentPage,
        }));
    }, [filter])

    // handle functions for filter dropdowns
    const handleChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
        console.log('changed')
        dispatch(usersActions.setFilter(
            {
                ...filter,
                ["roles"]: filters["role"] as Role[] ?? [],
                ["permissions"]: filters["permissions"] as Permission[] ?? [],
                ["employments"]: filters["employment"] as Employment[] ?? []
            }
        ))
    };

    //menu on every user row
    const menu = (userEmail: string, userId: string) => (
        <Menu
            items={[
                {key: '1', label: (<Link to={"update/" + userEmail} state={{popup: location}}>Update</Link>)},
                {key: '2', label: (<Link to={"remove/" + userEmail} state={{popup: location}}>Remove</Link>)},
                {key: '3', label: 'View'}
            ]}
        />
    )

    // columns structure for table
    const columns: ColumnsType<User> = [
        {
            title: 'FirstName', dataIndex: 'firstName', key: 'firstName',
            ...getColumnSearchProps('firstName'),
        },
        {
            title: 'LastName', dataIndex: 'lastName', key: 'lastName',
            ...getColumnSearchProps('lastName'),
        },
        {
            title: 'MiddleName', dataIndex: 'middleName', key: 'middleName',
            ...getColumnSearchProps('middleName'),
        },
        {
            title: 'Email', dataIndex: 'email', key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Role', dataIndex: 'role', key: 'role',
            filters: Object.values(Role).map(value => {
                return {text: uppercaseToWords(value), value: value}
            }),
            render: (role, user) => {
                return <Tag key={role}
                            color={role === Role.Administrator ? 'gold' : 'geekblue'}>
                    {uppercaseToWords(role)}
                </Tag>
            }
        },
        {
            title: 'Permissions', dataIndex: 'permissions', key: 'permissions',
            filters: Object.values(Permission).map(value => {
                return {text: uppercaseToWords(value), value: value}
            }),
            render: (permissions: Permission[], user) => {
                return user.permissions.map(p => <Tag key={p} color={'blue'}>{uppercaseToWords(p)}</Tag>)
            }
        },
        {
            title: 'Employments', dataIndex: 'employment', key: 'employment',
            filterMultiple: false,
            filters: Object.values(Employment).map(value => {
                return {text: uppercaseToWords(value), value: value}
            }),
            render: (employment: Employment, user) => (
                <Tag key={employment} color={employment === Employment.FullTime ? 'green' : 'yellow'}>
                    {uppercaseToWords(employment)}
                </Tag>
            )
        },
        {title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt'},
        {title: 'UpdatedAt', dataIndex: 'updatedAt', key: 'updatedAt'},
        {
            title: 'Action', dataIndex: 'operation', key: 'operation',
            render: (text, record, index) => (
                <Space size="middle">
                    <Dropdown overlay={menu(record.email, record.id)}>
                        <DownCircleFilled/>
                    </Dropdown>
                </Space>
            ),
        }];

    return <>
        <Row justify="space-between" align={'middle'}>
            <Col>
                <Link to={"create"} state={{popup: location}}>
                    <Button type="primary" icon={<UserAddOutlined/>}> Add User</Button>
                </Link>
            </Col>
            <Col>
                <ExcelExportButton date={"2022-07-27T16:11:04Z"} like={""}/>
            </Col>
        </Row>
        <Divider/>
        <Table
            columns={columns}
            dataSource={users}
            rowKey={"id"}
            onChange={handleChange}
            pagination={{
                total: totalPages,
                pageSize: pageSize,
                defaultPageSize: pageSize, showSizeChanger: true,
                onChange: (page, pageSize1) => {
                    dispatch(usersActions.setCurrentPage(page - 1));
                }
            }}
        />
    </>
})
