import React, {createRef, FC, FormEvent, useEffect, useState} from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Input, InputRef} from 'antd';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import {Track} from "../../../tracks/graphQL/tracks.types";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useDispatch} from "react-redux";

type Props = {
    track: Track
}

export const TrackTitle: FC<Props> = ({track}) => {
    const title = track.title == '' ? '. . .' : track.title
    const inputRef = createRef<InputRef>()
    const dispatch = useDispatch()
    const [bordered, setBordered] = useState(false)
    const [content, setContent] = useState(title)

    useEffect(() => {
        setContent(title)
    }, [title])

    const onInput = () => {
        setContent(inputRef.current!.input!.value)
    }

    const onFocus = () => {
        setBordered(true)
    }

    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            inputRef.current!.blur()
        }
    }

    const onSubmit = () => {
        setBordered(false)
        const newTitle = (content == '. . .' ? '' : content)
        if (content === track.title || content === '. . .')
            return
        dispatch(tracksAction.updateTrack({
            id: track.id,
            title: newTitle,
            kind: track.kind,
            startTime: track.startTime,
            endTime: track.endTime
        }))
    }

    return (
        <>
            <Input
                prefix={<EditOutlined className={s.icons}/>}
                bordered={bordered}
                onFocus={onFocus}
                onBlur={onSubmit}
                onKeyDown={onEnter}
                onInput={onInput}
                value={content}
                ref={inputRef}
                readOnly={false}
            />
        </>
    )
}