import React, {FC, useEffect, useState} from 'react';
import {Col, Layout, Menu, Row} from 'antd';
import s from './AppLayout.module.css';
import {AppBreadcrumb} from "../AppBreadcrumb/AppBreadcrumb";
import {Link, useLocation} from "react-router-dom";

const {Header, Content} = Layout;

type Props = {
    children?: React.ReactNode
}

export const AppLayout: FC<Props> = ({children}) => {
    const location = useLocation();
    const [defaultSelectedKey, setDefaultSelectedKey] = useState('');

    useEffect(() => {
        const newDefaultSelectedKey = getDefaultSelectedKey(location.pathname);
        if (newDefaultSelectedKey !== defaultSelectedKey)
            setDefaultSelectedKey(newDefaultSelectedKey);
    }, [location.pathname]);

    const getDefaultSelectedKey = (path: string): string => {
        if (path.match(/todos/i))
            return 'todos';
        else if (path.match(/categories/i))
            return 'categories';
        else
            return '';
    }

    return (
        <Layout className={s.layout}>
            <Header>
                <Row>
                    <Col span={22}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[defaultSelectedKey]}>
                            <Menu.Item key={'todos'}>
                                <Link to={'/users'}>
                                    Todos
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={'categories'}>
                                <Link to={'/categories'}>
                                    Categories
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <Content className={s.content}>
                <div className={s.appBreadcrumb}>
                    <AppBreadcrumb/>
                </div>
                <div className={s.siteLayoutContent}>{children}</div>
            </Content>
        </Layout>
    );
};