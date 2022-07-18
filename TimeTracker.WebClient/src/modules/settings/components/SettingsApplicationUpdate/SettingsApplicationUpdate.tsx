import {Col, Form, Image, Input, Row} from 'antd';
import React, {FC, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSubmit} from "../../../../components/ButtonSubmit/ButtonSubmit";
import {SettingsApplicationUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";

type FormValues = {
    title?: string,
    faviconUrl?: string,
    logoUrl?: string,
};

export const SettingsApplicationUpdate: FC = ({}) => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)
    const [faviconUrlPreview, setFaviconUrlPreview] = useState<string | undefined>(settings?.application.faviconUrl);
    const [logoUrlPreview, setLogoUrlPreview] = useState<string | undefined>(settings?.application.logoUrl);

    const onFinish = (values: FormValues) => {
        const settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType = {
            title: values.title,
            faviconUrl: values.faviconUrl,
            logoUrl: values.logoUrl,
        }
        dispatch(settingsActions.updateApplicationAsync(settingsApplicationUpdateInputType));
    };

    const onValuesChange = (values: FormValues) => {
        values.faviconUrl && setFaviconUrlPreview(values.faviconUrl);
        values.logoUrl && setLogoUrlPreview(values.logoUrl);
    }

    const initialValues: FormValues = {
        title: settings?.application.title,
        faviconUrl: settings?.application.faviconUrl,
        logoUrl: settings?.application.logoUrl,
    }

    return (
        <Form
            form={form}
            name="SettingsApplicationUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
            onValuesChange={onValuesChange}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Title"
                        name={nameof<FormValues>('title')}
                    >
                        <Input placeholder={'Title'}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Favicon url"
                        name={nameof<FormValues>('faviconUrl')}
                        rules={[
                            {
                                pattern: new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
                                message: 'Favicon url must be url'
                            }
                        ]}
                    >
                        <Input placeholder={'Favicon url'}/>
                    </Form.Item>
                    {faviconUrlPreview && !form.getFieldError(nameof<FormValues>('faviconUrl')).length &&
                        <Image width={'25%'} src={faviconUrlPreview}/>
                    }
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Logo url"
                        name={nameof<FormValues>('logoUrl')}
                        rules={[
                            {
                                pattern: new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
                                message: 'Favicon url must be url'
                            }
                        ]}
                    >
                        <Input placeholder={'Logo url'}/>
                    </Form.Item>
                    {logoUrlPreview && !form.getFieldError(nameof<FormValues>('logoUrl')).length &&
                        <Image width={'25%'} src={logoUrlPreview}/>
                    }
                </Col>
            </Row>
            <ButtonSubmit loading={loading}>
                Save
            </ButtonSubmit>
        </Form>
    );
};