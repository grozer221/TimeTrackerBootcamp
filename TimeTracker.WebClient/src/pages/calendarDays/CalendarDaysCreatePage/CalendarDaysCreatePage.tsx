import {DatePicker, Form, Modal, Tabs} from 'antd';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import {Moment} from "moment";
import s from "../../CalendarPage/CalendarPage.module.css";
import {LineOutlined, UnorderedListOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const dateCellRender = (value: Moment) => {
    if (value.day() === 0 || value.day() === 6)
        return (
            <div className={s.dayOff}>
            </div>
        );
};

export const CalendarDaysCreatePage = () => {
    const navigate = useNavigate();
    const [form] = useForm();

    const handleOk = async () => {
        await form.validateFields();
    };

    return (
        <Modal
            confirmLoading={false}
            visible={true}
            onOk={handleOk}
            okText={'Create'}
            onCancel={() => navigate(-1)}
        >
            <Form
                name="CalendarDaysCreateForm"
                form={form}
            >
                <Tabs defaultActiveKey="One">
                    <TabPane
                        tab={<><LineOutlined/>One</>}
                        key="One"
                    >
                        <Form.Item
                            name="title"
                            rules={[{required: true, message: 'Required!'}]}
                        >
                            <DatePicker
                                dateRender={current => {
                                    const style: React.CSSProperties = {};
                                    if (current.date() === 1) {
                                        style.border = '1px solid #1890ff';
                                        style.borderRadius = '50%';
                                    }
                                    return (
                                        <div className="ant-picker-cell-inner" style={style}>
                                            {current.date()}
                                        </div>
                                    );
                                }}
                            />
                        </Form.Item>
                    </TabPane>
                    <TabPane
                        tab={<><UnorderedListOutlined/>Multiple</>}
                        key="Multiple"
                    >
                        <Form.Item
                            name="title"
                            rules={[{required: true, message: 'Required!'}]}
                        >
                            <RangePicker
                                dateRender={current => {
                                    const style: React.CSSProperties = {};
                                    if (current.date() === 1) {
                                        style.border = '1px solid #1890ff';
                                        style.borderRadius = '50%';
                                    }
                                    return (
                                        <div className="ant-picker-cell-inner" style={style}>
                                            {current.date()}
                                        </div>
                                    );
                                }}
                            />
                        </Form.Item>
                    </TabPane>
                </Tabs>
                <Form.Item
                    name="title"
                    rules={[{required: true, message: 'Required!'}]}
                >
                    <DatePicker />
                </Form.Item>
                {/*<Form.Item*/}
                {/*    name="type"*/}
                {/*    label="Тип"*/}
                {/*    rules={[{required: true, message: 'Введіть Тип!'}]}*/}
                {/*>*/}
                {/*    <Select style={{width: '100%'}} value={type} onChange={setType}>*/}
                {/*        {(Object.values(SubjectPostType) as Array<SubjectPostType>).map((value) => (*/}
                {/*            <Select.Option key={value} value={value}>*/}
                {/*                {subjectPostTypeWithTranslateToString(value)}*/}
                {/*            </Select.Option>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}
            </Form>
        </Modal>
    );
};