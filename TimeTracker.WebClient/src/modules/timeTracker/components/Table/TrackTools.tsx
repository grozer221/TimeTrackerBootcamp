import React, {FC} from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import {Button, Form} from 'antd';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import {useDispatch} from "react-redux";
import {RemoveTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {Track} from "../../../tracks/graphQL/tracks.types";

type Props = {
    id: string
}

export const TrackTools: FC<Props> = ({id}) =>{
    const dispatch = useDispatch()

    const onRemove = async () => {
        let removeTrackId: RemoveTrackInput = {
            id: id
        }
        dispatch(tracksAction.removeTrack(removeTrackId))
    }
    return(
            <Form onFinish={onRemove}>
                <Button htmlType={'submit'} shape={'round'} icon={<DeleteOutlined/>} danger/>
            </Form>
    )
}