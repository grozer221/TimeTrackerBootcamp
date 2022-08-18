import React, {FC, useEffect} from 'react';
import {AlertOutlined, CarOutlined, CodeSandboxOutlined, DownOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, MenuProps, Space, Tag} from 'antd';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useDispatch} from "react-redux";
import {Track} from "../../../tracks/graphQL/tracks.types";

type Props = {
    track: Track
}

export const TrackKindEdit: FC<Props> = ({track}) => {
    let kind = track.kind
    const dispatch = useDispatch()

    const handleMenuClick: MenuProps['onClick'] = e => {
        kind = TrackKind[e.key as keyof typeof TrackKind]
        dispatch(tracksAction.updateTrack({
            id: track.id,
            title: track.title,
            kind: track.kind,
            startTime: track.startTime,
            endTime: track.endTime
        }))
    }

    let trackKindIcon: { [id: string]: JSX.Element; } = {
        "WORKING": <CodeSandboxOutlined className={s.icons}/>,
        "VACATION": <CarOutlined className={s.icons}/>,
        "SICK": <AlertOutlined className={s.icons}/>
    }

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'WORKING',
                    key: 'WORKING',
                    icon: <CodeSandboxOutlined className={s.icons}/>,
                },
                {
                    label: 'VACATION',
                    key: 'VACATION',
                    icon: <CarOutlined className={s.icons}/>,
                },
                {
                    label: 'SICK',
                    key: 'SICK',
                    icon: <CarOutlined className={s.icons}/>,
                },
            ]}
        />
    );

    return (
        <>
            {/*<Tag icon={trackKindIcon[kind]} style={{padding: '6px'}}>
                {kind}
            </Tag>*/}
            <Dropdown overlay={menu}>
                <Button>
                    <Space>
                        {trackKindIcon[kind]}{kind}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </>
    )
}