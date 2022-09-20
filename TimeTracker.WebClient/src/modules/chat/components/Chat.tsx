import React, {useEffect, useState} from "react";
import {getJwtToken} from "../../../utils/localStorageUtils";
import s from './Chat.module.css'
import {IconChat} from "./IconChat";
import {FullChat} from "./FullChat";
import {useDispatch} from "react-redux";
import {chatActions} from "../store/chat.slice";
import {usersActions} from "../../users/store/users.slice";

const signalR = require("@microsoft/signalr");

let connection = new signalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_CHAT_HUB, {accessTokenFactory: () => getJwtToken()})
    .build();

export const Chat: React.FC = () => {
    const [showChat, setShowChat] = useState<boolean>(false)
    const dispatch = useDispatch()

    const chat = () => {
        setShowChat(!showChat)
        console.log(showChat)
    }

    useEffect(() => {
        dispatch(chatActions.getMessages())
        dispatch(usersActions.getAsync({
            take: 1000,
            skip: 0,
        }))
        connection.start()
    }, [])


    return (
        <div className={s.chat_inner}>
            <div onClick={chat}>
                <IconChat/>
            </div>
            {showChat ? <FullChat connection={connection}/> : <></>}
        </div>
    )

}