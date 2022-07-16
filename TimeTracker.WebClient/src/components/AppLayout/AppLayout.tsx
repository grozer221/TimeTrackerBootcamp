import React, {FC, useState} from 'react';
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth/auth.actions";
import s from './AppLayout.module.css';
import {AppBreadcrumb} from "../AppBreadcrumb/AppBreadcrumb";
import Sider from "antd/es/layout/Sider";
import {
    AuditOutlined,
    BarChartOutlined,
    CalendarOutlined,
    FieldTimeOutlined,
    HomeOutlined,
    LogoutOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {isAuthenticated} from "../../permissions/permissions";
import {RootState} from "../../store/store";

type Props = {
    children?: React.ReactNode
}

export const AppLayout: FC<Props> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()
    const authedUser = useSelector((s: RootState) => s.auth.authedUser);

    const logoutHandler = () => {
        dispatch(authActions.logOutAsync())
    }

    return (
        <Layout className={s.layout}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className={s.wrapperMenu}>
                <Link to={'/time-tracker'}>
                    <div className={s.logo}/>
                </Link>
                <div className={s.name}>{authedUser?.firstName} {authedUser?.lastName}</div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="/time-tracker" icon={<FieldTimeOutlined/>}>
                        <Link to={'./time-tracker'}>Time tracker</Link>
                    </Menu.Item>
                    <Menu.Item key="/calendar" icon={<CalendarOutlined/>}>
                        <Link to={'calendar'}>Calendar</Link>
                    </Menu.Item>
                    <Menu.Item key="/reports" icon={<BarChartOutlined/>}>
                        <Link to={'reports'}>Reports</Link>
                    </Menu.Item>
                    <Menu.Item key="/vocation-requests" icon={<AuditOutlined/>}>
                        <Link to={'vocation-requests'}>Vocation requests</Link>
                    </Menu.Item>
                    <Menu.Item key="/users" icon={<UsergroupAddOutlined/>}>
                        <Link to={'users'}>Users</Link>
                    </Menu.Item>
                    {isAuthenticated() && (
                        <Menu.Item key="logout" icon={<LogoutOutlined/>} onClick={logoutHandler}>
                            Logout
                        </Menu.Item>
                    )}
                    <div style={{height: '48px'}}/>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content className={s.content}>
                    <AppBreadcrumb/>
                    <div className={s.siteLayoutBackground}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
};