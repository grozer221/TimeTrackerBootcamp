import React, {FC} from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {excelExportActions} from "../modules/excelExport/store/excelExport.slice";
import {useAppSelector} from "../store/store";
const dispatch = useDispatch()

const downloadData = (byteArr: Uint8Array) => {
    let data = new FormData();
    data.append('PARAM1', 'Value1');
    data.append('PARAM2', 'Value2');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.open('POST', 'SERVICEURL');
    xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
    xhr.onload = function() {
        let blob = this.response;
        let a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = "test.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    xhr.send(data);
}

const byteArr = useAppSelector(state => state.excel.file)

const onClick = (like: string, date: string) => {
    dispatch(excelExportActions.createReportAsync({like, date}))
    downloadData(byteArr)
}

type props = {
    like: string
    date: string
}

export const ExcelExportButton: FC<props> = ({like, date}) => {
    return(
        <Link to={""}>
            <Button onClick={() => onClick(like, date)}>Excel export</Button>
        </Link>
    )
}