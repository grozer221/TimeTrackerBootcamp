import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {PlusCircleOutlined, SmileOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, Row, Typography} from 'antd';
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useAppSelector} from "../../../../store/store";
import {isAuthenticated} from "../../../../utils/permissions";
import {nameof} from "../../../../utils/stringUtils";
import {useForm} from "antd/es/form/Form";
import {CreateTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import s from './TrackerPage.module.css'
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import Stopwatch from "../../components/Stopwatch/TrackerStopwatch";
import {TracksPanel} from "../../components/Table/TracksPanel";

type FormValues = {
    title: string,
    kind: TrackKind
}


export const TrackerPage: React.FC = () => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = useForm()
    const tracks = useAppSelector(s => s.tracks.tracks)

    const [searchParams, setSearchParams] = useSearchParams({});
    const like = searchParams.get('like') || ''
    const pageSize = searchParams.get('pageSize') || '10'
    const pageNumber = searchParams.get('pageNumber') || '1'
    const trackKind = searchParams.get('kind') || ''
    const indexOfS = Object.values(TrackKind).indexOf(trackKind as unknown as TrackKind)

    const onCreate = async (values: FormValues) => {
        let newTrack: CreateTrackInput = {
            title: values.title || "",
            kind: TrackKind.Vacation

        }
        dispatch(tracksAction.createTrack(newTrack))
        form.resetFields()
    };

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])


    useEffect( () => {
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: parseInt(pageSize),
            pageNumber: parseInt(pageNumber),
            kind: Object.values(TrackKind)[indexOfS]
        }))
    }, [setSearchParams])

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
            {tracks.length ? (
                <>
                    <Stopwatch track={tracks[0]}/>
                    <TracksPanel tracks={tracks} searchParams={searchParams}/>
                </>
            ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                    ( <SmileOutlined/> No tracks yet. )
                </Typography.Text>
            )}
        </>
    );
};

