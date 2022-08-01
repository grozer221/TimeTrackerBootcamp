import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    AlertOutlined,
    CalendarOutlined, CarOutlined, CodeSandboxOutlined,
    DeleteOutlined,
    EditOutlined,
    FormOutlined,
    PlusCircleOutlined,
    SmileOutlined,
    SyncOutlined
} from '@ant-design/icons';
import {Button, Card, Col, Divider, Form, Input, InputRef, Pagination, PaginationProps, Row, Tag, Typography} from 'antd';
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useAppSelector} from "../../../../store/store";
import {isAuthenticated} from "../../../../utils/permissions";
import {nameof} from "../../../../utils/stringUtils";
import {useForm} from "antd/es/form/Form";
import {CreateTrackInput, RemoveTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import s from './TrackerPage.module.css'
import './TrackerPage.module.css'
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {ButtonRemove} from "../../../../components/ButtonRemove";
import {Track} from "../../../tracks/graphQL/tracks.types";
import Stopwatch from "../../components/TrackerStopwatch";

type FormValues = {
    title: string,
    kind: TrackKind
}

export const TrackerPage: React.FC = () => {
    const location = useLocation();
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = useForm()

    let totalPages = useAppSelector(s => s.tracks.total)
    let tracks = useAppSelector(s => s.tracks.tracks);
    
    let trackKindIcon: { [id: string]: JSX.Element; } = {
        "DEFAULT": <CodeSandboxOutlined className={s.icons}/>,
        "VACATION": <CarOutlined className={s.icons}/>,
        "SICK": <AlertOutlined className={s.icons}/>
    };
    const [searchParams, setSearchParams] = useSearchParams({});
    const like = searchParams.get('like') || ''
    const pageSize = searchParams.get('pageSize') || '10'
    const pageNumber = searchParams.get('pageNumber') || '1'
    const trackKind = searchParams.get('kind') || ''
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);

    const onCreate = async (values: FormValues) => {
        let newTrack: CreateTrackInput = {
            title: values.title || "",
            kind: TrackKind.Default
        }
        dispatch(tracksAction.createTrack(newTrack))
        form.resetFields()
    };

    const onRemove = async (id: string) => {
        let removeTrackId: RemoveTrackInput = {
            id: id
        }
        dispatch(tracksAction.removeTrack(removeTrackId))
    };


    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(() => {
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: parseInt(pageSize),
            pageNumber: parseInt(pageNumber),
            kind: trackKind
        }))
    }, [setSearchParams])

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        navigate(`/time-tracker?pageNumber=${pageNumber}&pageSize=${pageSize}&kind=${trackKind}`)
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: pageSize,
            pageNumber: pageNumber,
            kind: trackKind
        }));
    };
    console.log(tracks)

    const Processing = () => {
        return (
            <Tag icon={<SyncOutlined spin/>} color="processing" style={{padding: '6px'}}>
                PROCESSING
            </Tag>
        )

    }

    const RenderStopWatch = () => {
      if(tracks.length == 0){
          return
      }
      return(
          <Stopwatch track={tracks[0]}/>
      )
    }

    // @ts-ignore
    return (
        <>
            <Form
                form={form}
                name="trackForm"
                onFinish={onCreate}
                size={'large'}
            >
                <Row gutter={24}>
                    <Col span={20}>
                        <Form.Item name={nameof<FormValues>('title')}>
                            <Input placeholder={'Title'}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button
                            htmlType={'submit'}
                            type={'primary'}
                            shape={'round'}
                            icon={<PlusCircleOutlined/>}
                            size={'large'}
                            className={s.start_button}
                        >Start </Button>
                    </Col>
                </Row>
            </Form>
            {RenderStopWatch()}
            {tracks.length ? (
                <div className={s.container}>
                    <div className={s.table_header}>
                        <div className={s.cell} style={{width: '30%'}}>
                            Title
                        </div>
                        <div className={[s.divider, s.header_divider].join(' ')}/>
                        <div className={s.cell} style={{width: '20%'}}>
                            Hours kind
                        </div>
                        <div className={[s.divider, s.header_divider].join(' ')}/>
                        <div className={s.cell} style={{width: '20%'}}>
                            Start Time
                        </div>
                        <div className={[s.divider, s.header_divider].join(' ')}/>
                        <div className={s.cell} style={{width: '20%'}}>
                            End Time
                        </div>
                        <div className={[s.divider, s.header_divider].join(' ')}/>
                        <div className={s.cell} style={{width: '10%'}}>
                            Tools
                        </div>

                    </div>
                    {tracks.map((track, index) => (
                        <div className={s.table_row} key={index}>
                            <div className={s.cell} style={{width: '30%'}}>
                                <EditOutlined className={s.icons}/>{track.title == "" ? ". . ." : track.title}
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '20%'}}>
                                <Tag icon={trackKindIcon[track.kind]} style={{padding: '6px'}}>
                                    {track.kind}
                                </Tag>
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '20%'}}>
                                <CalendarOutlined className={s.icons}/>{track.startTime.replace('T', ' ')}
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '20%'}}>
                                {track.endTime == null ? <>{Processing()}</> : <><CalendarOutlined
                                    className={s.icons}/>{track.endTime.replace('T', ' ')}</>}
                            </div>
                            <div className={s.divider}/>
                            <div className={s.cell} style={{width: '10%'}}>
                                <Form onFinish={()=>onRemove(track.id)}>
                                    <Button htmlType={'submit'} shape={'round'} icon={<DeleteOutlined/>} danger/>
                                </Form>
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

