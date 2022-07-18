import React, {FC, useState} from 'react';
import {Button, Dropdown, Layout, Menu, Row, Space} from 'antd';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../modules/auth/store/auth.actions";
import s from './AppLayout.module.css';
import {AppBreadcrumb} from "../AppBreadcrumb/AppBreadcrumb";
import {
    AppstoreOutlined,
    AuditOutlined,
    BarChartOutlined,
    CalendarOutlined,
    DownOutlined,
    FieldTimeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {RootState} from "../../store/store";
import Logo from '../../assets/images/clockify-logo-with-title.png';
import {ItemType} from "antd/lib/menu/hooks/useItems";

const {Header, Content, Sider} = Layout;

type Props = {
    children?: React.ReactNode
}

export const AppLayout: FC<Props> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()
    const authedUser = useSelector((s: RootState) => s.auth.authedUser);
    const settings = useSelector((s: RootState) => s.settings.settings);

    const headerMenu = (
        <Menu
            items={[
                {
                    key: 'Profile',
                    label: (
                        <Link to={'#'}>
                            <Space>
                                <ProfileOutlined/>
                                <span>Profile</span>
                            </Space>
                        </Link>
                    ),
                },
                {
                    key: 'Logout',
                    onClick: () => dispatch(authActions.logOutAsync()),
                    label: (
                        <Space>
                            <LogoutOutlined/>
                            <span>Logout</span>
                        </Space>
                    ),
                },
            ]}
        />
    );

    const mainMenuItems: ItemType[] = [
        {
            key: '/time-tracker',
            icon: <FieldTimeOutlined/>,
            label: <Link to={'./time-tracker'}>Time tracker</Link>,
        },
        {
            key: '/calendar',
            icon: <CalendarOutlined/>,
            label: <Link to={'calendar'}>Calendar</Link>,
        },
        {
            key: '/reports',
            icon: <BarChartOutlined/>,
            label: <Link to={'reports'}>Reports</Link>,
        },
        {
            key: '/vocation-requests',
            icon: <AuditOutlined/>,
            label: <Link to={'vocation-requests'}>Vocation requests</Link>,
        },
        {
            key: '/users',
            icon: <UsergroupAddOutlined/>,
            label: <Link to={'users'}>Users</Link>,
        },
        {
            key: '/settings',
            icon: <SettingOutlined/>,
            label: <Link to={'settings/application'}>Settings</Link>,
        },
    ]

    return (
        <Layout className={s.layout}>
            <Header className={s.header}>
                <Row justify={'space-between'} align={'middle'}>
                    <Row align={'middle'}>
                        <Button type="default"
                                icon={<AppstoreOutlined/>}
                                size={'large'}
                                onClick={() => setCollapsed(!collapsed)}
                        />
                        <Link to={'/time-tracker'}>
                            <img className={s.logo}
                                 src={settings?.application.logoUrl || Logo}
                            />
                        </Link>
                    </Row>
                    <Dropdown overlay={headerMenu}>
                        <Space className={s.name}>
                            <span>{authedUser?.firstName} {authedUser?.lastName}</span>
                            <DownOutlined/>
                        </Space>
                    </Dropdown>
                </Row>
            </Header>
            <Layout>
                <Sider collapsed={collapsed} onCollapse={setCollapsed} className={s.wrapperMenu}>
                    <Menu theme="dark" mode="inline" items={mainMenuItems}/>
                </Sider>
                <Layout className="site-layout">
                    <Content className={s.content}>
                        <div className={s.siteLayoutBackground}>
                            <div className={s.breadcrumbs}>
                                <AppBreadcrumb/>
                            </div>
                            <div>{children}</div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};