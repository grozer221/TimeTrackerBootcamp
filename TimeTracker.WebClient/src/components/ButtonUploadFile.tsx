import React, {FC} from 'react';
import {CloudUploadOutlined} from "@ant-design/icons";
import {Button} from "antd";

type Props = {};
export const ButtonUploadFile: FC<Props> = ({}) => {
    return (
        <Button type={'primary'} icon={<CloudUploadOutlined />}/>
    );
};