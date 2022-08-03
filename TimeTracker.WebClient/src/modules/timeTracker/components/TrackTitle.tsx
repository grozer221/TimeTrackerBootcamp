import React, {FC, useState} from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import s from '../pages/TrackerPage/TrackerPage.module.css'

type Props = {
    title: string
}

export const TrackTitle: FC<Props> = ({title}) => {
    const [bordered, setBordered] = useState(false)
    const content = title == "" ? ". . ." : title

    return (
        <>
            <div className={s.cell} style={{width: '30%'}}>
                <Input
                    prefix={<EditOutlined className={s.icons}/>}
                    bordered={bordered}
                    onFocus={() => setBordered(true)}
                    onBlur={() => setBordered(false)}
                    value={content}
                    readOnly={false}
                />
            </div>
            <div className={s.divider}/>
        </>

    )
}