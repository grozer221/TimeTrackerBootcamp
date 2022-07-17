import React, {FC} from 'react';
import {Button} from "antd";
import {SizeType} from "antd/es/config-provider/SizeContext";

type Props = {
    size?: SizeType,
    children?: React.ReactNode,
    loading: boolean,
};
export const ButtonSubmit: FC<Props> = ({size = 'middle', children = 'Submit', loading = false}) => {
    return (
        <Button type="primary" htmlType={'submit'} size={size} loading={loading}>
            {children}
        </Button>
    );
};