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

type Props = {
    track: Track
}

export const CurrentTrackInfo: FC<Props> = ({track}) => {

    return (
        <>
            <Card><span className={s.current_track_panel_title}><b>Current track</b></span>
                <div className={s.current_track_item}>
                    <TrackTitle track={track}/>
                </div>
                <div className={s.current_track_panel_row}>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <span>Kind</span>
                        <TrackKindInfo track={track}/>
                    </div>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <span>Start Time</span>
                        <TrackStartTime track={track}/>
                    </div>
                </div>
                <div className={s.current_track_panel_row}>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <span>State</span>
                        <Tag icon={<SyncOutlined spin/>} color="processing" className={s.processing_tag}>PROCESSING</Tag>
                    </div>
                    <div className={[s.current_track_item, s.kind_item].join(' ')}>
                        <div className={s.current_track_delete_tool}>
                            <TrackTools track={track}/>
                        </div>
                    </div>
                </div>
            </Card>


        </>
    )
}