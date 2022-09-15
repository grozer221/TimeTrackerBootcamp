import React, {useEffect} from "react";
import {DefaultHttpClient, HttpRequest, HttpResponse} from "@microsoft/signalr";
import {getJwtToken} from "../../../utils/localStorageUtils";

const signalR = require("@microsoft/signalr");

let connection = new signalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_CHAT_HUB, {accessTokenFactory: () => getJwtToken()})
    .build();


connection.on("ReceiveMessage", (data : any)=> {
    console.log(data);
});

const send = () => {
        connection.invoke("SendMessage", {message: "Hello", userIdTo: "1720274c-693e-4118-bf9f-56b58f6ec477"})
}


export const ChatPage : React.FC = () => {
        useEffect(()=>{
            connection.start()
        }, [])

       return(<div>
           <button onClick={send}>Send</button>
       </div>)

}