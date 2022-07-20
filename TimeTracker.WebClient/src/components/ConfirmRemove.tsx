import React, {FC} from 'react';
import {Popconfirm} from "antd";

type Props = {
    onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void,
    children?: React.ReactNode,
};
export const ConfirmRemove: FC<Props> = ({onConfirm, children = 'Remove'}) => {
    return (
        <Popconfirm
            title="Are you sure to remove?"
            onConfirm={onConfirm}
        >
            <span>{children}</span>
        </Popconfirm>
    );
};