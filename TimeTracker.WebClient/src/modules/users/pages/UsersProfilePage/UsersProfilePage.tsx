import React, {useEffect} from "react";
import {isAuthenticated} from "../../../../utils/permissions";
import {RootState, useAppSelector} from "../../../../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {usersActions} from "../../store/users.slice";
import {Loading} from "../../../../components/Loading/Loading";
import {Card, Descriptions, Space, Tag} from "antd";
import {uppercaseToWords} from "../../../../utils/stringUtils";
import {Employment} from "../../../../graphQL/enums/Employment";

export const UsersProfilePage = () => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const email = params['email'] as string

    const userProfile = useSelector((s: RootState) => s.users.userProfile)

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(() => {
        dispatch(usersActions.getUserByEmailAsync(email))
    }, [])

    if (userProfile == null) return <Loading/>

    return <>
        <Card size={"small"}>
            <Descriptions title={userProfile.email + " info"}>
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
    </>
}