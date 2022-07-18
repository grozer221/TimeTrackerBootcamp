import React, {FC, useState} from 'react';
import {Row, Tabs} from "antd";
import {AppstoreOutlined, MinusOutlined, UserOutlined} from "@ant-design/icons";
import {SettingsEmploymentUpdate} from "../../components/SettingsEmploymentUpdate/SettingsEmploymentUpdate";
import {useNavigate, useParams} from "react-router-dom";
import {SettingsTasksUpdate} from "../../components/SettingsTasksUpdate/SettingsTasksUpdate";
import {SettingsApplicationUpdate} from "../../components/SettingsApplicationUpdate/SettingsApplicationUpdate";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {Loading} from "../../../../components/Loading/Loading";

const {TabPane} = Tabs;

type Tab = 'application' | 'employment' | 'tasks';

export const SettingsPage: FC = () => {
    const {tab} = useParams();
    const navigate = useNavigate();
    const initialised = useSelector((s: RootState) => s.app.initialised);
    const settingsLoadingGet = useSelector((s: RootState) => s.settings.loadingGet);
    const authLoadingMe = useSelector((s: RootState) => s.auth.loadingMe);
    const [selectedTab, setSelectedTab] = useState<Tab>(tab as Tab);

    const onChangeTabHandler = (tab: string) => {
        setSelectedTab(tab as Tab);
        navigate(`/settings/${tab}`)
    }

    if (!initialised || settingsLoadingGet || authLoadingMe)
        return <Loading/>

    return (
        <Row>
            <Tabs
                defaultActiveKey={tab || 'common'}
                onChange={onChangeTabHandler}
                style={{width: '100%'}}
            >
                <TabPane
                    tab={<span><AppstoreOutlined/>Application</span>}
                    key="application"
                >
                    {selectedTab === 'application' && <SettingsApplicationUpdate/>}
                </TabPane>
                <TabPane
                    tab={<span><UserOutlined/>Employment</span>}
                    key="employment"
                >
                    {selectedTab === 'employment' && <SettingsEmploymentUpdate/>}
                </TabPane>
                <TabPane
                    tab={<span><MinusOutlined/>Tasks</span>}
                    key="tasks"
                >
                    {selectedTab === 'tasks' && <SettingsTasksUpdate/>}
                </TabPane>
            </Tabs>
        </Row>
    );
};