import {Col, Form, Image, Input, Row, Typography} from 'antd';
import React, {FC, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {SettingsApplicationUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {linkRegexPattern} from "../../../../utils/regexUtils";
import {ExtraHeaderButtons} from "../../../../components/ExtraHeaderButtons";

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

    const onDiscardChanges = () => {
        form.resetFields()
        setFaviconUrlPreview(settings?.application?.faviconUrl)
        setLogoUrlPreview(settings?.application?.logoUrl)
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
                    <div className={'mt--10'}>
                        <Text type={'secondary'}>Recommended size 16 x 16 px</Text>
                    </div>
                    {faviconUrlPreview && !form.getFieldError(nameof<FormValues>('faviconUrl')).length &&
                        <div className={'imagePreview'}>
                            <Image src={faviconUrlPreview}/>
                        </div>
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
                        <Text type={'secondary'}>Recommended size 120 x 30 px</Text>
                    </div>
                    {logoUrlPreview && !form.getFieldError(nameof<FormValues>('logoUrl')).length &&
                        <div className={'imagePreview'}>
                            <Image src={logoUrlPreview}/>
                        </div>
                    }
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