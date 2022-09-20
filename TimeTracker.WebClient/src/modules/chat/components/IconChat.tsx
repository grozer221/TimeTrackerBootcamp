import React, {useEffect} from "react";
import {DefaultHttpClient, HttpRequest, HttpResponse} from "@microsoft/signalr";
import {getJwtToken} from "../../../utils/localStorageUtils";
import s from './Chat.module.css'
import {Avatar, Badge, Col} from "antd";
import {MessageOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../store/store";



export const IconChat : React.FC = () => {
    const messages = useAppSelector(s => s.chat.messages)
    console.log(messages)

    return(
            <div className={s.chat_icon}>
                <MessageOutlined  type="message" style={{fontSize: '32px', color: 'lightgray'}}/>
            </div>
)

}