import {Col, Form, Row, TimePicker} from 'antd';
import React, {FC} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSubmit} from "../../../../components/ButtonSubmit/ButtonSubmit";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {SettingsTasksUpdateInputType} from "../../graphQL/settings.mutations";
import moment, {Moment} from "moment";
import {settingsActions} from "../../store/settings.actions";

type FormValues = {
    calculateSalaryForFullTimer: Moment,
}

export const SettingsTasksUpdate: FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)

    const onFinish = (values: FormValues) => {
        const settingsTasksUpdateInputType: SettingsTasksUpdateInputType = {
            calculateSalaryForFullTimer: values.calculateSalaryForFullTimer.format('HH:mm:ss'),
        }
        dispatch(settingsActions.updateTasksAsync(settingsTasksUpdateInputType));
    };

    const initialValues: FormValues = {
        calculateSalaryForFullTimer: moment(settings?.tasks.calculateSalaryForFullTimer, 'HH:mm:ss'),
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
                        label="Calculate salary for full timer"
                        name={nameof<FormValues>('calculateSalaryForFullTimer')}
                    >
                        <TimePicker placeholder={'Calculate salary for full timer'}/>
                    </Form.Item>
                </Col>
            </Row>
            <ButtonSubmit loading={loading}>
                Save
            </ButtonSubmit>
        </Form>
    );
};