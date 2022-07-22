import React, {FC} from 'react';
import {FileManagerItem} from "../graphQL/fileManager.types";
import {
    FileManagerGetInFolderModalPage
} from "../pages/FileManagerGetInFolderModalPage/FileManagerGetInFolderModalPage";
import {Button} from "antd";
import {FileAddOutlined} from "@ant-design/icons";

type Props = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    onSelectFile: (item: FileManagerItem) => void
};
export const FileManagerOpenButton: FC<Props> = ({visible, setVisible, onSelectFile}) => {
    return (
        <>
            <Button icon={<FileAddOutlined/>} onClick={() => setVisible(true)}/>
            <FileManagerGetInFolderModalPage visible={visible} setVisible={setVisible} onSelectFile={onSelectFile}/>
        </>
    );
};