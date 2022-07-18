import React, {FC} from 'react';
import {Row, Tabs} from "antd";
import {AppstoreOutlined, MinusOutlined, UserOutlined} from "@ant-design/icons";
import {SettingsEmploymentUpdate} from "../../components/SettingsEmploymentUpdate/SettingsEmploymentUpdate";
import {useNavigate, useParams} from "react-router-dom";
import {SettingsTasksUpdate} from "../../components/SettingsTasksUpdate/SettingsTasksUpdate";
import {SettingsApplicationUpdate} from "../../components/SettingsApplicationUpdate/SettingsApplicationUpdate";

const {TabPane} = Tabs;

type Props = {};
export const SettingsPage: FC<Props> = ({}) => {
    const {tab} = useParams();
    const navigate = useNavigate();

    return (
        <Row>
            <Tabs
                defaultActiveKey={tab || 'common'}
                onChange={newTab => navigate(`/settings/${newTab}`)}
                style={{width: '100%'}}
            >
                <TabPane
                    tab={<span><AppstoreOutlined/>Application</span>}
                    key="application"
                >
                    <SettingsApplicationUpdate/>
                </TabPane>
                <TabPane
                    tab={<span><UserOutlined/>Employment</span>}
                    key="employment"
                >
                    <SettingsEmploymentUpdate/>
                </TabPane>
                <TabPane
                    tab={<span><MinusOutlined/>Tasks</span>}
                    key="tasks"
                >
                    <SettingsTasksUpdate/>
                </TabPane>
            </Tabs>
        </Row>
    );
};