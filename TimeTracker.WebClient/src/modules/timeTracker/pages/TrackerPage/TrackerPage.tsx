import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {PlusOutlined, SmileOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Form, Typography} from 'antd';
import {Track} from "../../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useAppSelector} from "../../../../store/store";
import {isAuthenticated} from "../../../../utils/permissions";

type DataIndex = keyof Track

export const TrackerPage: React.FC = () => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const like = ""

    let totalPages = useAppSelector(s => s.tracks.total)
    let pageSize = useAppSelector(s => s.tracks.pageSize)
    let tracks = useAppSelector(s => s.tracks.tracks)

    let [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(()=>{
        dispatch(tracksAction.getAsync({
            like: "",
            take: 10,
            skip: 1
        }))
    }, [like])


    console.log(tracks)

    return (
            <Form name="dynamic_form_nest_item">

                <Form.Item>
                    <Link to={'create'} state={{popup: location}}>
                        <Button type={'dashed'} icon={<PlusOutlined />} size={'large'} style={{width: '100%'}}>Add Track</Button>
                    </Link>
                </Form.Item>
            </Form>
    );
};

