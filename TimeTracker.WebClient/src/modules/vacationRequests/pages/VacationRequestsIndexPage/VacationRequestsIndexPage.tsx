import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {vacationRequestsActions} from "../../store/vacationRequests.slice";
import {Button, Popconfirm, Row, Space, Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {VacationRequest} from "../../graphQL/vacationRequests.types";
import {nameof} from "../../../../utils/stringUtils";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {vacationRequestStatusToTag} from "../../../../convertors/enumToTagConvertors";
import {ButtonUpdate} from "../../../../components/ButtonUpdate";
import {ButtonCreate} from "../../../../components/ButtonCreate";
import {DeleteOutlined, ReloadOutlined} from "@ant-design/icons";
import {WithSmallLoading} from "../../../../hocs/WithSmallLoading/WithSmallLoading";

const {Text} = Typography;

export const VacationRequestsIndexPage: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const vacationRequestsGetInputType = useAppSelector(s => s.vacationRequests.vacationRequestsGetInputType)
    const vacationRequests = useAppSelector(s => s.vacationRequests.vacationRequests)
    const loadingGet = useAppSelector(s => s.vacationRequests.loadingGet)
    const availableDays = useAppSelector(s => s.vacationRequests.availableDays)
    const loadingGetAvailableDays = useAppSelector(s => s.vacationRequests.loadingGetAvailableDays)
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '') || vacationRequestsGetInputType.pageNumber;
    const pageSize = parseInt((searchParams.get('pageSize')) || '') || vacationRequestsGetInputType.pageSize;

    useEffect(() => {
        dispatch(vacationRequestsActions.getAvailableDaysAsync())
    }, [])

    useEffect(() => {
        dispatch(vacationRequestsActions.getAsync({
            pageNumber,
            pageSize,
        }))
    }, [pageNumber, pageSize])

    const columns: ColumnsType<VacationRequest> = [
        {
            title: 'Status',
            dataIndex: nameof<VacationRequest>('status'),
            key: nameof<VacationRequest>('status'),
            render: (_, vacationRequest) => <span>{vacationRequestStatusToTag(vacationRequest.status)}</span>
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
                </Space>
        },
        {
            title: 'Comment',
            dataIndex: nameof<VacationRequest>('comment'),
            key: nameof<VacationRequest>('comment'),
        },
        {
            title: 'User',
            dataIndex: nameof<VacationRequest>('user'),
            key: nameof<VacationRequest>('user'),
            render: (_, vacationRequest) =>
                <Link to={`/users/${vacationRequest.user.email}`}>
                    {vacationRequest.user.firstName} {vacationRequest.user.lastName}
                </Link>
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
                </Space>
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
                    onChange: (pageNumber, pageSize) => {
                        setSearchParams({pageNumber: pageNumber.toString(), pageSize: pageSize.toString()})
                    }
                }}
            />
        </div>
    );
};