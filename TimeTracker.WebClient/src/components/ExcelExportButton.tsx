import React, {FC, useEffect} from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {excelExportActions} from "../modules/excelExport/store/excelExport.slice";
import {useAppSelector} from "../store/store";




type props = {
    like: string
    date: string
}

export const ExcelExportButton: FC<props> = ({like, date}) => {
    const dispatch = useDispatch()
    const byteArr = useAppSelector(state => state.excel.file)
    useEffect(()=> {
        if (byteArr.length){
            let a = new Uint8Array(byteArr)
            downloadData(a)
        }
    },[byteArr])

    const downloadData = (byteArr: Uint8Array) => {
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([byteArr], { type: 'application/octet-stream' }));
        a.download = "tst.xlsx";
// Append anchor to body.
        document.body.appendChild(a)
        a.click();
// Remove anchor from body
        document.body.removeChild(a)
    }

    const onClick = (like: string, date: string) => {
        dispatch(excelExportActions.createReportAsync({like, date}))

    }

    return(
        <Link to={""}>
            <Button onClick={() => onClick(like, date)} type={"primary"}>Excel export</Button>
        </Link>
    )
}