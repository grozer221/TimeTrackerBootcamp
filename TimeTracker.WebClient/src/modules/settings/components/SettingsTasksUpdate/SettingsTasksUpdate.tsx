import {Col, Form, Row, TimePicker} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {SettingsTasksUpdateInputType} from "../../graphQL/settings.mutations";
import moment, {Moment} from "moment";
import {settingsActions} from "../../store/settings.actions";
import {ExtraHeaderButtons} from "../../../../components/ExtraHeaderButtons";

type FormValues = {
    autoSetWorkingHoursForFullTimers: Moment,
}

export const SettingsTasksUpdate: FC = () => {
    const [form] = useForm<FormValues>();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)

    const onFinish = (values: FormValues) => {
        const settingsTasksUpdateInputType: SettingsTasksUpdateInputType = {
            autoSetWorkingHoursForFullTimers: values.autoSetWorkingHoursForFullTimers?.format('HH:mm:ss'),
        }
        dispatch(settingsActions.updateTasksAsync(settingsTasksUpdateInputType));
    };

    const onDiscardChanges = () => {
        form.resetFields()
        form.setFieldsValue({
            autoSetWorkingHoursForFullTimers: moment(settings?.tasks?.autoSetWorkingHoursForFullTimers, 'HH:mm:ss'),
        })
    }

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
            <ExtraHeaderButtons
                onDiscardChanges={onDiscardChanges}
                onSaveChanges={form.submit}
                loading={loading}
            />
        </Form>
    );
};