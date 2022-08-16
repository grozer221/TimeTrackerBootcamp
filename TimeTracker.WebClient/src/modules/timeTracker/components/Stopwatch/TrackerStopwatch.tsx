import React, {FC, useEffect, useState} from "react";
import {Button, Col, Divider, Form, Input, Row} from "antd";
import {Track} from "../../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import moment from "moment";
import {toUTCDateTime} from "../../../../convertors/toUTCDateTime";
import {nameof} from "../../../../utils/stringUtils";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {useForm} from "antd/es/form/Form";
import {CreateTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import {TrackerPanel} from "./TrackerPanel";
import s from './/src/modules/timeTracker/components/Stopwatch/TrackerStopwatch.module.css'

type FormValues = {
    title: string,
    kind: TrackKind
}

type stopwatchProps = {
    track: Track
}




export const Stopwatch: FC<stopwatchProps> = ({track}) => {
    const dispatch = useDispatch()
    const [stopDisable, setStopDisable] = useState(false)
    const [form] = useForm()



    const onCreate = async (values: FormValues) => {
        let newTrack: CreateTrackInput;
        newTrack = {
            title: values.title || "",
            kind: TrackKind.Working
        }
        dispatch(tracksAction.createTrack(newTrack))
        setStopDisable(false)
        form.resetFields()
    }

    const OnEndTrack = () => {
        if(track.endTime)
            return
        setStopDisable(true)
        const endTime = new Date()
        const endTimeUTC = toUTCDateTime(endTime)
        dispatch(tracksAction.updateTrack({
            id: track.id,
            title: track.title,
            kind: track.kind,
            startTime: track.startTime,
            endTime: moment(endTimeUTC).format('YYYY-MM-DDTHH:mm:ss')
        }))
    }
    return (
        <>
            <Form
                form={form}
                name="trackForm"
                onFinish={onCreate}
                size={'large'}
            >
                <Row gutter={24}>
                    <Col span={16}>
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
                    <Col span={4}>
                        <Button
                            type={'primary'}
                            shape={"round"}
                            size={"large"}
                            disabled={stopDisable}
                            icon={<MinusCircleOutlined />}
                            className={s.start_button}
                            danger={true}
                            onClick={OnEndTrack}
                        >End</Button>

                    </Col>
                </Row>
            </Form>
            <Divider/>
            {track ? (
                <TrackerPanel track={track}/>
            ) : (<></>)}

        </>

    )
}