import React, {FC, useState} from 'react';
import {Layout, Menu, Space, Tag, Typography} from 'antd';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth/auth.actions";
import s from './AppLayout.module.css';
import {AppBreadcrumb} from "../AppBreadcrumb/AppBreadcrumb";
import Sider from "antd/es/layout/Sider";
import {HomeOutlined, LineChartOutlined, LogoutOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import SanaLogo from '../../assets/images/SanaLogo.png'
import {isAuthenticated} from "../../permissions/permissions";
import {RootState} from "../../store/store";

const {Text} = Typography;

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
                <img alt={'Logo'} src={SanaLogo} className={s.logo}/>
                {authedUser &&
                    <Space direction={'vertical'} className={s.user}>
                        <Tag color="red">{authedUser?.firstName} {authedUser?.lastName}</Tag>
                        <Tag color="green">{authedUser?.email}</Tag>
                    </Space>
                }
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="/" icon={<HomeOutlined/>}>
                        <Link to={'./'}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/calendar" icon={<LineChartOutlined/>}>
                        <Link to={'calendar'}>Calendar</Link>
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