import React, {createRef, FC, useEffect, useState} from "react";
import {getJwtToken} from "../../../utils/localStorageUtils";
import s from './Chat.module.css'
import {Badge, Button, Col, Dropdown, Input, InputRef, Menu, Row, Space} from "antd";
import {CloseOutlined, DownCircleFilled, DownOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../store/store";
import {chatActions} from "../store/chat.slice";
import {InfiniteScrollSelect} from "../../../components/InfiniteScrollSelect";
import {MessageType} from "../graphQL/chat.types";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {User} from "../../users/graphQL/users.types";
import {notificationsActions} from "../../notifications/store/notifications.slice";
import {UpdateMessageInput, UpdateMessageInputType} from "../graphQL/chat.mutation";

type Props = {
    connection: any
}


export const FullChat: FC<Props> = ({connection}) => {
    const inputRef = createRef<InputRef>()
    const messages = useAppSelector(s => s.chat.messages)
    const dispatch = useDispatch()
    const dialog = useAppSelector(s => s.chat.dialog)
    const [content, setContent] = useState('')
    const users = useAppSelector(s => s.users.users)
    const userId = useAppSelector(s => s.auth.authedUser?.id) as string
    const [userTo, setUserTo] = useState<User>()

    connection.on("ReceiveMessage", (data: MessageType) => {
        dispatch(chatActions.createMessage(data))
    })

    useEffect(() => {
        console.log(userTo)
        if (userTo) {
            dispatch(chatActions.setGetChatDialogInputData({user1: userTo.id, user2: userId}))
            dispatch(chatActions.getChatDialog({user1: userTo.id, user2: userId}))
            dialog.map((message)=>{
                let newMessage: UpdateMessageInput = {
                    id: message.id as string,
                    message: message.message,
                    isRead: true
                }
                dispatch(chatActions.updateMessage(newMessage))
            })
        }

    }, [userTo])

    const onInput = () => {
        setContent(inputRef.current!.input!.value)
    }

    const send = () => {
        if (!userTo) {
            setContent('')
            return
        }
        const sendMessage: MessageType = {
            userIdFrom: userId,
            userIdTo: userTo.id,
            message: content,
        }
        connection.invoke("SendMessage", sendMessage)
        setContent('')

        dispatch(chatActions.createMessage(sendMessage))
    }

    const changeDialog = (user: User) => {
        setUserTo(user)

    }

    const menu = () => {
        let items: ItemType[] = []
        if (users) {
            {
                users.map((user, index) => {
                    const count = messages.filter((obj) => obj.isRead === false && obj.userIdFrom === user.id && obj.userIdTo === userId).length;
                    if (user.id !== userId)
                        items.push(
                            {
                                key: index.toString(), label: (
                                    <div onClick={() => changeDialog(user)}>{user.email}
                                    </div>)
                            }
                        )
                })
            }
        }
        return <Menu items={items}/>
    }


    return (
        <div className={s.chat_content}>
            <div className={s.chat_header}>
                <div style={{display: 'flex', width: '95%'}}>
                    <UserOutlined type="message" style={{fontSize: '32px', color: 'lightgray'}}/>
                    <div style={{marginLeft: '5px', fontSize: '24px', color: 'lightgray'}}
                         title={userTo ? userTo.email + ', ' + userTo.role.toLowerCase() : ''}>{userTo ? [userTo.firstName, userTo.middleName].join(' ') : ''}</div>
                </div>
                <Space size="middle" wrap>
                    <Dropdown overlay={menu} placement={"bottomRight"}>
                        <DownOutlined type="message" style={{fontSize: '24px', color: 'lightgray'}}/>
                    </Dropdown>
                </Space>
            </div>
            <div className={s.full_chat_container}>
                {userTo ?
                    <>
                        {dialog.map((message, index) => (
                            userId === message.userIdFrom ? <div key={index} className={s.chat_message}
                                                                 style={{left: '26%'}}>{message.message}</div> :
                                <div key={index} className={s.chat_message}>{message.message}</div>
                        ))}
                    </> :
                    <div className={s.empty_chat}>Select user</div>
                }
            </div>
            <div className={s.chat_input_panel}>

                {userTo ? <Row style={{marginTop: '3px'}}>
                    <Col span={17}>
                        <Input style={{color: 'gray'}}
                               onInput={onInput}
                               value={content}
                               ref={inputRef}
                        />
                    </Col>
                    <Col span={1}/>
                    <Col span={6}>
                        <Button
                            type={'primary'}
                            shape={'round'}
                            onClick={send}
                        >Send</Button>
                    </Col>
                </Row> : <></>
                }
            </div>


        </div>
    )

}