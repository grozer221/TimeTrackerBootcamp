import React, {FC} from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

type Props = {
    loading: boolean,
    children?: React.ReactNode
};
export const WithSmallLoading: FC<Props> = ({loading, children}) => {
    return <div style={{position: 'relative'}}>
        {loading && <Spin className={'absoluteCenter'} indicator={<LoadingOutlined style={{fontSize: '24px'}} spin/>}/>}
        {children}
    </div>
};