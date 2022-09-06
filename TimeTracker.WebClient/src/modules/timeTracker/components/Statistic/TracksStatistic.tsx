import React, {FC, useEffect} from 'react';
import {CalendarOutlined} from '@ant-design/icons';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import moment from "moment";
import {Track} from "../../../tracks/graphQL/tracks.types";
import {useAppSelector} from "../../../../store/store";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {statisticAction} from "../../userStatistic/store/statistic.slice";
import {Col, Row} from "antd";
import {toUTCDateTime} from "../../../../convertors/toUTCDateTime";

type Props = {
    userId: string,
    date: string
}

export const TracksStatistic: FC<Props> = ({userId, date}) => {
    const statistic = useAppSelector(s=>s.statistic.statistic)
    const workerHoursInDate = new Date(statistic.workerHours * 60 * 60 * 1000)
    const workerHours = moment(workerHoursInDate).utc().format('HH:mm:ss')
    const monthHours = statistic.monthHours
    const needToWork =Math.ceil( statistic.monthHours - statistic.workerHours)

    return (
        <>
            <Row>
                <Col span={4}>
                    <p>Total time: {workerHours}</p>
                </Col>
                <Col span={4}>
                    <p>Month hours: {monthHours}</p>
                </Col>
                <Col span={4}>
                    <p>Need to work: {needToWork}</p>
                </Col>
            </Row>
        </>
    )
}