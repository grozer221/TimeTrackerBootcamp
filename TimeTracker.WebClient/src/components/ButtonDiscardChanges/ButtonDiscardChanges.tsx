import React, {FC, MouseEventHandler} from 'react';
import {Button} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";

type Props = {
    size?: SizeType,
    children?: React.ReactNode,
    loading?: boolean,
    onClick?: MouseEventHandler<HTMLElement>,
};
export const ButtonDiscardChanges: FC<Props> = ({
                                                 onClick,
                                                 size = 'middle',
                                                 children = 'Discard changes',
                                                 loading = false
                                             }) => {
    return (
        <Button onClick={onClick} htmlType={'submit'} size={size} loading={loading}>
            {children}
        </Button>
    );
};