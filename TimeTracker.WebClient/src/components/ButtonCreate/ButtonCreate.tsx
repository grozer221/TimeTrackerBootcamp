import React, {FC} from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {Link, Location} from "react-router-dom";
import {Button} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";

type Props = {
    to: string,
    popup?: Location,
    size?: SizeType,
};
export const ButtonCreate: FC<Props> = ({to, popup, size = 'small'}) => {
    return (
        <Link to={to} state={{popup}}>
            <Button shape="circle" type="primary" icon={<PlusOutlined/>} size={size}/>
        </Link>
    );
};