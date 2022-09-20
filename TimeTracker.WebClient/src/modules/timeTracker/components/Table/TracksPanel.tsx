import React, {FC} from 'react';
import {Pagination, PaginationProps} from 'antd';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import {Track} from "../../graphQL/tracks.types";
import {TracksHeader} from "./TracksHeader";
import {useAppSelector} from "../../../../store/store";
import {tracksAction} from "../../store/tracks.slice";
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TrackInfo} from "./TrackInfo";

type Props = {
    tracks: Track[],
    searchParams: URLSearchParams
}

export const TracksPanel: FC<Props> =({tracks, searchParams})=>{
    const pageNumber = searchParams.get('pageNumber') || '1'
    const totalPages = useAppSelector(s => s.tracks.total)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const like = searchParams.get('like') || ''
    const trackKind = searchParams.get('kind') || ''
    const indexOfS = Object.values(TrackKind).indexOf(trackKind as unknown as TrackKind)

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        navigate(`/time-tracker?pageNumber=${pageNumber}&pageSize=${pageSize}&kind=${trackKind}`)
        dispatch(tracksAction.getAsync({
            like: like,
            pageSize: pageSize,
            pageNumber: pageNumber,
            kind: Object.values(TrackKind)[indexOfS]
        }))
    }
    return(
        <>
            <div className={s.container}>
                <TracksHeader/>
                {tracks.map((track) => (
                    <TrackInfo track={track}/>
                ))}
                <Pagination
                    showQuickJumper
                    showSizeChanger
                    defaultCurrent={parseInt(pageNumber)}
                    total={totalPages}
                    onChange={onChange}
                    style={{margin: '2px'}}
                />
            </div>
        </>
    )
}