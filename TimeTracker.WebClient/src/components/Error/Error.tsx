import React, {FC} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Result} from 'antd';

type Props = {
    statusCode?: number,
}

export const Error: FC<Props> = ({statusCode = 404}) => {
    const navigate = useNavigate();
    const params = useParams();
    const paramsStatusCode = params.statusCode;

    switch (paramsStatusCode || statusCode) {
        case 403:
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle="You do not have permission."
                    extra={<Button type="primary" onClick={() => navigate(-1)}>Back</Button>}
                />
            );
        default:
            return (
                <Result
                    status="404"
                    title="404"
                    subTitle="Page not found."
                    extra={<Button type="primary" onClick={() => navigate(-1)}>Back</Button>}
                />
            );
    }
};
