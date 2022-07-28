import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {vacationRequestsActions} from "../../store/vacationRequests.slice";
import {Button, Popconfirm, Row, Select, Space, Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {VacationRequest} from "../../graphQL/vacationRequests.types";
import {nameof, uppercaseToWords} from "../../../../utils/stringUtils";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {vacationRequestStatusToTag} from "../../../../convertors/enumToTagConvertors";
import {ButtonUpdate} from "../../../../components/ButtonUpdate";
import {ButtonCreate} from "../../../../components/ButtonCreate";
import {DeleteOutlined, ReloadOutlined} from "@ant-design/icons";
import {WithSmallLoading} from "../../../../hocs/WithSmallLoading/WithSmallLoading";
import {VacationRequestStatus} from "../../../../graphQL/enums/VacationRequestStatus";
import {usersActions} from "../../../users/store/users.slice";

const {Text} = Typography;

export const VacationRequestsIndexPage: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const users = useAppSelector(s => s.users.users)
    const vacationRequestsGetInputType = useAppSelector(s => s.vacationRequests.vacationRequestsGetInputType)
    const vacationRequests = useAppSelector(s => s.vacationRequests.vacationRequests)
    const loadingGet = useAppSelector(s => s.vacationRequests.loadingGet)
    const availableDays = useAppSelector(s => s.vacationRequests.availableDays)
    const loadingGetAvailableDays = useAppSelector(s => s.vacationRequests.loadingGetAvailableDays)
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '') || vacationRequestsGetInputType.pageNumber;
    const pageSize = parseInt((searchParams.get('pageSize')) || '') || vacationRequestsGetInputType.pageSize;
    const statuses = searchParams.get('statuses')?.split('|').filter(s => Object.values(VacationRequestStatus).includes(s as VacationRequestStatus)) as VacationRequestStatus[] || vacationRequestsGetInputType.filter.statuses;
    const userIds = searchParams.get('userIds')?.split('|').filter(Boolean) as string[] || vacationRequestsGetInputType.filter.userIds;

    useEffect(() => {
        dispatch(vacationRequestsActions.getAvailableDaysAsync())
    }, [])

    useEffect(() => {
        dispatch(vacationRequestsActions.getAsync({
            pageNumber,
            pageSize,
            filter: {
                statuses,
                userIds
            }
        }))
    }, [searchParams])

    useEffect(() => {
        dispatch(usersActions.getAsync({
            take: 10,
            skip: 0,
            filter: {
                email: '',
                roles: [],
                permissions: [],
            }
        }))
    }, [])

    const columns: ColumnsType<VacationRequest> = [
        {
            title: 'Status',
            dataIndex: nameof<VacationRequest>('status'),
            key: nameof<VacationRequest>('status'),
            render: (_, vacationRequest) => <span>{vacationRequestStatusToTag(vacationRequest.status)}</span>,
            filters: (Object.values(VacationRequestStatus) as Array<VacationRequestStatus>).map((value) => ({
                value: value,
                text: uppercaseToWords(value),
            })),
            defaultFilteredValue: statuses,
            width: '20%',
        },
        {
            title: 'Start - End',
            dataIndex: 'start-end',
            key: 'start-end',
            render: (_, vacationRequest) =>
                <Space>
                    <Tag>{vacationRequest.dateStart}</Tag>
                    <Text type={'secondary'}>to</Text>
                    <Tag>{vacationRequest.dateEnd}</Tag>
                </Space>,
            width: '20%',
        },
        {
            title: 'Comment',
            dataIndex: nameof<VacationRequest>('comment'),
            key: nameof<VacationRequest>('comment'),
            width: '20%',
        },
        {
            title: <Select
                style={{width: '100%'}}
                mode="multiple"
                placeholder="User"
                defaultValue={userIds}
                onChange={userIds => setSearchParams({userIds: userIds?.join('|') || ''})}
                filterOption={_ => true}
                onSearch={value => dispatch(usersActions.getAsync({
                    take: 10,
                    skip: 0,
                    filter: {
                        email: value,
                        roles: [],
                        permissions: [],
                    }
                }))}
                maxTagCount={'responsive'}
            >
                {users.map(user => (
                    <Select.Option key={user.id}>{user.email}</Select.Option>
                ))}
            </Select>,
            dataIndex: nameof<VacationRequest>('user'),
            key: nameof<VacationRequest>('user'),
            render: (_, vacationRequest) =>
                <Link to={`/users/${vacationRequest.user.email}`}>
                    {vacationRequest.user.firstName} {vacationRequest.user.lastName}
                </Link>,
            width: '30%',
        },
        {
            title: 'Actions',
            dataIndex: 'Actions',
            key: 'Actions',
            render: (_, vacationRequest) =>
                <Space size={5}>
                    <ButtonUpdate to={`update/${vacationRequest.id}`} popup={location}/>
                    <Popconfirm
                        title={'Sure to remove?'}
                        onConfirm={() => dispatch(vacationRequestsActions.removeAsync({id: vacationRequest.id}))}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button shape="circle" type="primary" danger icon={<DeleteOutlined/>} size={'small'}/>
                    </Popconfirm>
                </Space>,
            width: '10%',
        },
    ];

    return (
        <div>
            <Row align={'middle'} justify={'space-between'}>
                <ButtonCreate to={'create'} popup={location}/>
                <WithSmallLoading loading={loadingGetAvailableDays}>
                    <Space>
                        <ReloadOutlined onClick={() => dispatch(vacationRequestsActions.getAvailableDaysAsync())}/>
                        <div>Available days: {availableDays}</div>
                    </Space>
                </WithSmallLoading>
            </Row>
            <Table
                rowKey={'id'}
                loading={loadingGet}
                columns={columns}
                dataSource={vacationRequests.entities}
                pagination={{
                    total: vacationRequests.total,
                    pageSize: pageSize,
                    defaultPageSize: pageSize,
                    defaultCurrent: pageNumber,
                    showSizeChanger: true,
                }}
                onChange={(pagination, filters, sorter) => {
                    console.log(pagination, filters, sorter);
                    setSearchParams({
                        pageNumber: pagination.current?.toString() || vacationRequestsGetInputType.pageNumber.toString(),
                        pageSize: pagination.pageSize?.toString() || vacationRequestsGetInputType.pageSize.toString(),
                        statuses: filters.status?.join('|') || '',
                    })
                }}
            />
        </div>
    );
};