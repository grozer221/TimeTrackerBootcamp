import React, {FC} from 'react';
import {AlertOutlined, CarOutlined, CodeSandboxOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import s from '../pages/TrackerPage/TrackerPage.module.css'
import {TrackKind} from "../../../graphQL/enums/TrackKind";

type Props = {
    kind: TrackKind
}

export const TrackKindInfo: FC<Props> = ({kind}) => {
    let trackKindIcon: { [id: string]: JSX.Element; } = {
        "DEFAULT": <CodeSandboxOutlined className={s.icons}/>,
        "VACATION": <CarOutlined className={s.icons}/>,
        "SICK": <AlertOutlined className={s.icons}/>
    };

    return (
        <>
            <div className={s.cell} style={{width: '20%'}}>
                <Tag icon={trackKindIcon[kind]} style={{padding: '6px'}}>
                    {kind}
                </Tag>
            </div>
            <div className={s.divider}/>
        </>
    )
}