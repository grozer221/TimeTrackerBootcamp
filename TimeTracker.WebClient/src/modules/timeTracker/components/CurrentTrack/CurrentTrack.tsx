import React, {FC} from 'react';
import {Track} from "../../../tracks/graphQL/tracks.types";
import {TrackTitle} from "../Table/TrackTitle";
import {TrackKindInfo} from "../Table/TrackKindInfo";
import {TrackStartTime} from "../Table/TrackStartTime";
import {TrackEndTime} from "../Table/TrackEndTime";
import {TrackTools} from "../Table/TrackTools";
import s from '../Stopwatch/TrackerStopwatch.module.css'
import {SyncOutlined} from "@ant-design/icons";
import {Card, Tag} from "antd";
import {RemoveTrackInput, UpdateTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import {PayloadAction} from "@reduxjs/toolkit";

type Props = {
    track: Track,
    crudCallbacks: {
        update: ((updateTrackInput: UpdateTrackInput) => PayloadAction<UpdateTrackInput, string>),
        remove: ((removeTrackInput: RemoveTrackInput) => PayloadAction<RemoveTrackInput, string>)
    }
}

export const CurrentTrackInfo: FC<Props> = ({track, crudCallbacks}) => {

    return (
        <>
            <Card><span className={s.current_track_panel_title}><b>Current track</b></span>
                <div className={s.current_track_item}>
                    <TrackTitle track={track} updateCallback={crudCallbacks.update}/>
                </div>
                <div className={s.current_track_panel_row}>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <span>Kind</span>
                        <TrackKindInfo kind={track.kind}/>
                    </div>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <span>Start Time</span>
                        <TrackStartTime startTime={track.startTime}/>
                    </div>
                </div>
                <div className={s.current_track_panel_row}>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <span>State</span>
                        <Tag icon={<SyncOutlined spin/>} color="processing" className={s.processing_tag}>PROCESSING</Tag>
                    </div>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <div className={s.current_track_delete_tool}>
                            <TrackTools id={track.id} removeCallback={crudCallbacks.remove}/>
                        </div>
                    </div>
                </div>
            </Card>


        </>
    )
}