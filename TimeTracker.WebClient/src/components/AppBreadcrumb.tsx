import React, {FC} from 'react';
import {Breadcrumb} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {capitalize} from "../utils/stringUtils";

export const AppBreadcrumb: FC = () => {
    const location = useLocation();
    let modules = location.pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {modules.map((module, i) => {
                const link = modules.slice(0, i + 1).join('/');
                return (
                    <Breadcrumb.Item key={module}>
                        <Link to={link}>{capitalize(module)}</Link>
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    );
};
