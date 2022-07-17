import React, {FC} from 'react';
import {Row, Tabs} from "antd";
import {MinusOutlined, SlidersOutlined} from "@ant-design/icons";
import {SettingsCommonUpdate} from "../../components/SettingsCommonUpdate/SettingsCommonUpdate";
import {useNavigate, useParams} from "react-router-dom";
import {SettingsTasksUpdate} from "../../components/SettingsTasksUpdate/SettingsTasksUpdate";

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
                    tab={<span><SlidersOutlined/>Common</span>}
                    key="common"
                >
                    <SettingsCommonUpdate/>
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