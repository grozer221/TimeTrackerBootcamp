import {Col, Form, Row, Space, TimePicker} from 'antd';
import React, {FC, useEffect, useRef} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSaveChanges} from "../../../../components/ButtonSaveChanges/ButtonSaveChanges";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {SettingsTasksUpdateInputType} from "../../graphQL/settings.mutations";
import moment, {Moment} from "moment";
import {settingsActions} from "../../store/settings.actions";
import {getHeaderExtraButtonsElement} from "../../../../components/AppLayout/AppLayout";
import {createPortal} from "react-dom";
import {ButtonDiscardChanges} from "../../../../components/ButtonDiscardChanges/ButtonDiscardChanges";

type FormValues = {
    autoSetWorkingHoursForFullTimers: Moment,
}

export const SettingsTasksUpdate: FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)
    const headerExtraButtonsElement = useRef(document.createElement('div'))

    useEffect(() => {
        getHeaderExtraButtonsElement().appendChild(headerExtraButtonsElement.current);
        return () => {
            getHeaderExtraButtonsElement().removeChild(headerExtraButtonsElement.current);
        }
    }, [])

    const onFinish = (values: FormValues) => {
        const settingsTasksUpdateInputType: SettingsTasksUpdateInputType = {
            autoSetWorkingHoursForFullTimers: values.autoSetWorkingHoursForFullTimers?.format('HH:mm:ss'),
        }
        dispatch(settingsActions.updateTasksAsync(settingsTasksUpdateInputType));
    };

    const initialValues: FormValues = {
        autoSetWorkingHoursForFullTimers: moment(settings?.tasks?.autoSetWorkingHoursForFullTimers, 'HH:mm:ss'),
    }

    return (
        <Form
            form={form}
            name="SettingsTasksUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
            onReset={() => form.resetFields()}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Auto set working hours for full timers"
                        name={nameof<FormValues>('autoSetWorkingHoursForFullTimers')}
                    >
                        <TimePicker placeholder={'Auto set working hours for full timers'}/>
                    </Form.Item>
                </Col>
            </Row>
            {createPortal(
                <Space>
                    <ButtonDiscardChanges onClick={() => form.resetFields()}/>
                    <ButtonSaveChanges loading={loading} onClick={() => form.submit()}/>
                </Space>,
                headerExtraButtonsElement.current)
            }
        </Form>
    );
};