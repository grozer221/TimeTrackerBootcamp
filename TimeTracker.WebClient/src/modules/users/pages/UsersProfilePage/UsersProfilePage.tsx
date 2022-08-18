import React, {useEffect, useState} from "react";
import {isAuthenticated} from "../../../../utils/permissions";
import {RootState, useAppSelector} from "../../../../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {usersActions} from "../../store/users.slice";
import {Loading} from "../../../../components/Loading/Loading";
import {Button, Card, Col, DatePicker, Descriptions, Row, Space, Tag} from "antd";
import {uppercaseToWords} from "../../../../utils/stringUtils";
import {Employment} from "../../../../graphQL/enums/Employment";
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import Title from "antd/lib/typography/Title";
import moment, {now} from "moment/moment";
import {TracksTable} from "../../../timeTracker/components/TracksTable/TracksTable";
import {PlusOutlined} from "@ant-design/icons";

type DataType = {
    id: string
    userId: string,
    title: string,
    kind: TrackKind,
    date: string,
    duration: string,
}

export const UsersProfilePage = () => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const email = params['email'] as string

    const userProfile = useSelector((s: RootState) => s.users.userProfile)
    let tracks = useSelector((s: RootState) => s.users.userTracks)
    let userTracksLoading = useSelector((s: RootState) => s.users.userTracksLoading)

    let [date, setDate] = useState(moment(now()).toISOString())

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(() => {
        dispatch(usersActions.getUserByEmailAsync(email))
    }, [])

    useEffect(() => {
        if (userProfile != null)
            dispatch(usersActions.getTracksByUserIdAndDate({UserId: userProfile.id, Date: date}))
    }, [userProfile])

    useEffect(() => {
        if (userProfile != null)
            dispatch(usersActions.getTracksByUserIdAndDate({UserId: userProfile.id, Date: date}))
    }, [date])


    if (userProfile == null) return <Loading/>
    if (tracks == null) tracks = []

    return <>
        <Card size={"small"}>
            <Descriptions title={userProfile.firstName + " " + userProfile.lastName}>
                <Descriptions.Item label={"First name"}>{userProfile.firstName}</Descriptions.Item>
                <Descriptions.Item label={"Last name"}>{userProfile.lastName}</Descriptions.Item>
                <Descriptions.Item label={"Middle name"}>{userProfile.middleName}</Descriptions.Item>
                <Descriptions.Item label={"Email"}>{userProfile.email}</Descriptions.Item>
                <Descriptions.Item label={"Employment"}>
                    <Tag color={userProfile.employment === Employment.FullTime ? 'green' : 'yellow'}>
                        {uppercaseToWords(userProfile.employment)}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={"Permissions"}>
                    <Space wrap>
                        {userProfile.permissions.map(p => <Tag color={"blue"}>{uppercaseToWords(p)}</Tag>)}
                    </Space>
                </Descriptions.Item>
            </Descriptions>
        </Card>
        <Row style={{marginTop: 10, marginBottom: 10}}>
            <Col span={20}></Col>
            <Col span={4}>
                <DatePicker picker={"month"} defaultValue={moment(now())} onChange={e => {
                    if (e != null)
                        setDate(e.toISOString())
                }}/>
            </Col>
        </Row>
        <Card size={"small"}
              title={
                  <Row justify="space-between" align={'middle'}>
                      <Col>
                          <Title level={5}>Tracks: </Title>
                      </Col>
                      <Col>
                          <Button shape={"circle"} type={"primary"} icon={<PlusOutlined />}></Button>
                      </Col>
                  </Row>
              }>
            <TracksTable tracks={tracks} date={date} loading={userTracksLoading}/>
        </Card>
    </>
}