import React, {FC} from 'react';
import {FileManagerGetInFolderPage} from "../FileManagerGetInFolderPage/FileManagerGetInFolderPage";
import Title from "antd/lib/typography/Title";
import {Modal} from 'antd';
import {FileManagerItem} from "../../graphQL/fileManager.types";
import s from './FileManagerGetInFolderModalPage.module.css';

type Props = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    onSelectFile: (item: FileManagerItem) => void
};
export const FileManagerGetInFolderModalPage: FC<Props> = ({visible, setVisible, onSelectFile}) => {
    return (
        <Modal
            title={<Title level={4}>File manager</Title>}
            visible={visible}
            okText={false}
            onCancel={() => setVisible(false)}
            className={s.modal}
        >
           <div className={s.modalInner}>
               <FileManagerGetInFolderPage onSelectFile={onSelectFile}/>
           </div>
        </Modal>
    );
};