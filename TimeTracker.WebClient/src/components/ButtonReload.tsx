import React, {FC} from 'react';
import {Location} from "react-router-dom";
import {Button} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {ReloadOutlined} from "@ant-design/icons";

type Props = {
    onClick: () => void,
    popup?: Location,
    size?: SizeType,
};
export const ButtonReload: FC<Props> = ({onClick, size = 'small'}) => {
    return (
        <Button onClick={() => onClick()} shape="circle" type="default" icon={<ReloadOutlined/>} size={size}/>
    );
};