import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {CalendarOutlined, EditOutlined, FormOutlined, SmileOutlined} from '@ant-design/icons';
import {Button, Card, Col, Form, Input, Pagination, PaginationProps, Row, Typography} from 'antd';
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useAppSelector} from "../../../../store/store";
import {isAuthenticated} from "../../../../utils/permissions";
import {nameof} from "../../../../utils/stringUtils";
import {useForm} from "antd/es/form/Form";
import {CreateTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import s from './TrackerPage.module.css'
import './TrackerPage.module.css'
import {TrackKind} from "../../../../graphQL/enums/TrackKind";

type FormValues = {
    title: string,
    kind: TrackKind | TrackKind.Default
}

export const TrackerPage: React.FC = () => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = useForm()

    let totalPages = useAppSelector(s => s.tracks.total)
    let tracks = useAppSelector(s => s.tracks.tracks)

    let [currentPage, setCurrentPage] = useState<number>(0)
    const [searchParams, setSearchParams] = useSearchParams({});
    const like = searchParams.get('like') || ''
    const pageSize = searchParams.get('pageSize') || '10'
    const pageNumber = searchParams.get('pageNumber') || '1'
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);

    const onFinish = async (values: FormValues) => {
        let newTrack: CreateTrackInput = {
            title: values.title,
            kind: TrackKind.Default
        }

        dispatch(tracksAction.createTrack(newTrack))
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: parseInt(pageSize),
            pageNumber: parseInt(pageNumber)
        }))
        form.resetFields()
    };


    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(() => {
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: parseInt(pageSize),
            pageNumber: parseInt(pageNumber)
        }))
    }, [setSearchParams])

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        navigate(`/time-tracker?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: pageSize,
            pageNumber: pageNumber
        }));
    };

    console.log(tracks)

    function GetDate(sqlDate: string) {
        let date = new Date(sqlDate)
        return date.toDateString() + " " + date.toLocaleTimeString()

    }

    // @ts-ignore
    return (
        <>
            <Form
                className={s.font}
                form={form}
                name="trackForm"
                onFinish={onFinish}
                size={'large'}
            >
                <Card>
                    <Row gutter={16}>
                        <Col span={20}>
                            <Form.Item name={nameof<FormValues>('title')} rules={[{required: true}]}>
                                <Input placeholder={'Title'}/>
                            </Form.Item>
                        </Col>
                        {/*<Col span={10}>
                            <Form.Item name={nameof<FormValues>('kind')} rules={[{required: false}]}>
                                <Input placeholder={'Description'}/>
                            </Form.Item>
                        </Col>*/}
                        <Col span={4}>
                            <Button htmlType={'submit'}>Start </Button>
                        </Col>
                    </Row>
                </Card>
            </Form>
            {tracks.length ? (
                <div className={s.container}>
                    <div className = {s.table_header}>
                        <div className={s.cell} style={{width: '40%'}}>
                            Title
                        </div>
                        <div className={s.divider} style={{color: "white", borderColor: "white"}}/>
                        <div className={s.cell} style={{width: '20%'}}>
                            Hours kind
                        </div>
                        <div className={s.divider} style={{color: "white", borderColor: "white"}}/>
                        <div className={s.cell} style={{width: '20%'}}>
                            Start Time
                        </div>
                        <div className={s.divider} style={{color: "white", borderColor: "white"}}/>
                        <div className={s.cell} style={{width: '20%'}}>
                            End Time
                        </div>

                    </div>
                    {tracks.map((track, index) => (
                        <div className={s.table_row} key={index}>
                            <div className={s.cell} style={{width: '40%'}}>
                                <EditOutlined className={s.icons}/>{track.title}
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '20%'}}>
                                <FormOutlined className={s.icons}/>{track.kind}
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '20%'}}>
                                <CalendarOutlined  className={s.icons}/>{GetDate(track.startTime)}
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '20%'}}>

                                <CalendarOutlined className={s.icons}/>
                            </div>
                        </div>
                    ))}
                    <Pagination
                        showQuickJumper
                        showSizeChanger
                        defaultCurrent={parseInt(pageNumber)}
                        total={totalPages}
                        onChange={onChange}
                        style={{margin: '2px'}}
                    />
                </div>
            ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                    ( <SmileOutlined/> No tracks yet. )
                </Typography.Text>
            )}
        </>
    );
};

