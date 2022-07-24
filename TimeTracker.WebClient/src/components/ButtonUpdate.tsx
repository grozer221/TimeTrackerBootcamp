import React, {FC} from 'react';
import {Link, Location} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";

type Props = {
    to: string,
    popup?: Location,
    size?: SizeType,
};

export const ButtonUpdate: FC<Props> = ({to, popup, size = 'small'}) => {
    return (
        <Link to={to} state={{popup}}>
            <Button shape="circle" type="primary" icon={<EditOutlined/>} size={size}/>
        </Link>
    );
};