import React, {useEffect, useRef} from 'react';
import {Calendar, Row, Space, Tooltip, Typography} from "antd";
import {Moment} from 'moment';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {calendarDaysActions} from "../../store/calendarDays/calendarDays.actions";
import {RootState} from "../../store/store";
import s from './CalendarPage.module.css';
import {ButtonCreate} from "../../components/ButtonCreate/ButtonCreate";
import {DayKind} from "../../graphQL/enums/DayKind";
import {ButtonRemove} from "../../components/ButtonRemove/ButtonRemove";
import {ButtonUpdate} from "../../components/ButtonUpdate/ButtonUpdate";
import {uppercaseToWords} from "../../utils/stringUtils";
import {isAuthenticated} from "../../permissions/permissions";
import {Loading} from "../../components/Loading/Loading";

const {Text} = Typography;

export const CalendarPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuth = useSelector((s: RootState) => s.auth.isAuth)
    const calendarDays = useSelector((s: RootState) => s.calendarDays.calendarDays)
    const selectedDate = useSelector((s: RootState) => s.calendarDays.selectedDate)
    const loading = useSelector((s: RootState) => s.calendarDays.loadingGet)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])

    useEffect(() => {
        dispatch(calendarDaysActions.getAsync('2019-01-01', '2023-01-01'));
    }, [])

    const onSelect = (newValue: Moment) => {
        console.log('onSelect')
        dispatch(calendarDaysActions.setSelectedDate(newValue));
    };

    const onPanelChange = (newValue: Moment) => {
        console.log('onPanelChange')
        dispatch(calendarDaysActions.setSelectedDate(newValue));
    };

    const dateCellRender = (current: Moment) => {
        let dayKindClass;
        const currentCalendarDay = calendarDays.find(d => d.date === current.format("YYYY-MM-DD"));
        switch (currentCalendarDay?.kind) {
            case DayKind.DayOff:
                dayKindClass = s.dayOff;
                break;
            case DayKind.Holiday:
                dayKindClass = s.holiday;
                break;
            case DayKind.ShortDay:
                dayKindClass = s.shortDay;
                break;
        }
        return (
            <Link to={`days/${currentCalendarDay?.date}`} state={{popup: location}}>
                <Tooltip
                    title={currentCalendarDay && `${currentCalendarDay.title || ''} (${uppercaseToWords(currentCalendarDay.kind)})`}>
                    <div className={[s.day, dayKindClass].join(' ')}>
                        <div className={s.titleAndKind}>
                            <Text style={{textAlign: 'center'}}>{currentCalendarDay?.title}</Text>
                            <Text style={{fontSize: '12px'}}
                                  type="secondary">{currentCalendarDay && uppercaseToWords(currentCalendarDay.kind)}</Text>
                        </div>
                        <Row align={'bottom'} className={s.buttons}>
                            {currentCalendarDay
                                ? <Space size={3}>
                                    <ButtonUpdate to={`days/update/${currentCalendarDay?.date}`} popup={location}/>
                                    <ButtonRemove to={`days/remove/${currentCalendarDay?.date}`} popup={location}/>
                                </Space>
                                :
                                <ButtonCreate to={`days/create?date=${current.format('YYYY-MM-DD')}`} popup={location}/>
                            }
                        </Row>
                    </div>
                </Tooltip>
            </Link>
        );
    }

    return (
        <div className={s.wrapperPage}>
            {loading && <div className={s.absoluteCenter}>
                <Loading/>
            </div>}
            <Space size={3}>
                <ButtonCreate to={'days/create'} popup={location}/>
                <ButtonRemove to={'days/remove'} popup={location}/>
            </Space>
            <Calendar
                value={selectedDate}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                // validRange={[moment('2021-01-25'), moment('2023-01-25')]}
                dateCellRender={dateCellRender}
            />
        </div>
    );
};