import React, {FC} from 'react';
import s from '../../pages/TrackerPage/TrackerPage.module.css'

export const TracksHeader: FC = () =>{
    return(
        <div className={s.table_header}>
            <div className={s.cell} style={{width: '30%'}}>
                Title
            </div>
            <div className={[s.divider, s.header_divider].join(' ')}/>
            <div className={s.cell} style={{width: '20%'}}>
                Hours kind
            </div>
            <div className={[s.divider, s.header_divider].join(' ')}/>
            <div className={s.cell} style={{width: '20%'}}>
                Start Time
            </div>
            <div className={[s.divider, s.header_divider].join(' ')}/>
            <div className={s.cell} style={{width: '20%'}}>
                End Time
            </div>
            <div className={[s.divider, s.header_divider].join(' ')}/>
            <div className={s.cell} style={{width: '10%'}}>
                Tools
            </div>

        </div>
    )
}