import {Col, Form, Image, Input, Row, Space, Typography} from 'antd';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {ButtonSaveChanges} from "../../../../components/ButtonSaveChanges/ButtonSaveChanges";
import {SettingsApplicationUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {createPortal} from "react-dom";
import {getHeaderExtraButtonsElement} from "../../../../components/AppLayout/AppLayout";
import {ButtonDiscardChanges} from "../../../../components/ButtonDiscardChanges/ButtonDiscardChanges";
import {linkRegexPattern} from "../../../../utils/regexUtils";

const {Text} = Typography;

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
    const [faviconUrlPreview, setFaviconUrlPreview] = useState<string | undefined>(settings?.application?.faviconUrl);
    const [logoUrlPreview, setLogoUrlPreview] = useState<string | undefined>(settings?.application?.logoUrl);
    const headerExtraButtonsElement = useRef(document.createElement('div'))

    useEffect(() => {
        getHeaderExtraButtonsElement().appendChild(headerExtraButtonsElement.current);
        return () => {
            getHeaderExtraButtonsElement().removeChild(headerExtraButtonsElement.current);
        }
    }, [])

    const onFinish = (values: FormValues) => {
        const settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType = {
            title: values.title,
            faviconUrl: values.faviconUrl,
            logoUrl: values.logoUrl,
        }
        dispatch(settingsActions.updateApplicationAsync(settingsApplicationUpdateInputType));
    };

    const onValuesChange = (values: FormValues) => {
        console.log(values)
        values.hasOwnProperty(nameof<FormValues>('faviconUrl')) && setFaviconUrlPreview(values.faviconUrl);
        values.hasOwnProperty(nameof<FormValues>('logoUrl')) && setLogoUrlPreview(values.logoUrl);
    }

    const initialValues: FormValues = {
        title: settings?.application?.title,
        faviconUrl: settings?.application?.faviconUrl,
        logoUrl: settings?.application?.logoUrl,
    }

    return (
        <Form
            form={form}
            name="SettingsApplicationUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
            onValuesChange={onValuesChange}
            onReset={() => form.resetFields()}
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
                                pattern: new RegExp(linkRegexPattern),
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
                                pattern: new RegExp(linkRegexPattern),
                                message: 'Favicon url must be url'
                            }
                        ]}
                    >
                        <Input placeholder={'Logo url'}/>
                    </Form.Item>
                    <div className={'mt--10'}>
                        <Text type={'secondary'}>Recommended size 120x30px</Text>
                    </div>
                    {logoUrlPreview && !form.getFieldError(nameof<FormValues>('logoUrl')).length &&
                        <Image width={'25%'} src={logoUrlPreview}/>
                    }
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