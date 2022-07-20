import {Col, Form, Image, Input, Row, Typography} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {formStyles} from "../../../../assets/form";
import {SettingsApplicationUpdateInputType} from "../../graphQL/settings.mutations";
import {useDispatch, useSelector} from "react-redux";
import {settingsActions} from "../../store/settings.actions";
import {RootState} from "../../../../store/store";
import {nameof} from "../../../../utils/stringUtils";
import {linkRegexPattern} from "../../../../utils/regexUtils";
import {ExtraHeaderButtons} from "../../../../components/ExtraHeaderButtons";
import {ButtonUploadFile} from "../../../files/components/ButtonUploadFile/ButtonUploadFile";

const {Text} = Typography;

type FormValues = {
    title?: string,
};

export const SettingsApplicationUpdate: FC = ({}) => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const settingsLoadingUpdate = useSelector((s: RootState) => s.settings.loadingUpdate)
    const settings = useSelector((s: RootState) => s.settings.settings)
    const [faviconUrl, setFaviconUrl] = useState<string | undefined>(settings?.application?.faviconUrl);
    const [logoUrl, setLogoUrl] = useState<string | undefined>(settings?.application?.logoUrl);

    useEffect(() => {

    }, [])

    const onFinish = (values: FormValues) => {
        console.log(values)
        const settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType = {
            title: values.title,
            faviconUrl: faviconUrl,
            logoUrl: logoUrl,
        }
        dispatch(settingsActions.updateApplicationAsync(settingsApplicationUpdateInputType));
    };

    const onDiscardChanges = () => {
        form.resetFields()
        setFaviconUrl(settings?.application?.faviconUrl)
        setLogoUrl(settings?.application?.logoUrl)
    }


    const initialValues: FormValues = {
        title: settings?.application?.title,
    }

    return (
        <Form
            form={form}
            name="SettingsApplicationUpdateForm"
            onFinish={onFinish}
            labelCol={formStyles}
            initialValues={initialValues}
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
                        name={'faviconUrl'}
                        rules={[
                            {
                                pattern: new RegExp(linkRegexPattern),
                                message: 'Favicon url must be url'
                            }
                        ]}
                    >
                        <Input.Group compact>
                            <Input
                                placeholder={'Favicon url'}
                                style={{width: 'calc(100% - 32px)'}}
                                value={faviconUrl}
                                onChange={e => setFaviconUrl(e.target.value)}
                            />
                            <ButtonUploadFile
                                accept={'.png,.jpg,.jpeg,.gif'}
                                onUploaded={files => setFaviconUrl(files[0])}
                            />
                        </Input.Group>
                    </Form.Item>
                    <div className={'mt--10'}>
                        <Text type={'secondary'}>Recommended size 16 x 16 px</Text>
                    </div>
                    {faviconUrl && !form.getFieldError('faviconUrl').length &&
                        <div className={'imagePreview'}>
                            <Image src={faviconUrl}/>
                        </div>
                    }
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Logo url"
                        name={'logoUrl'}
                        rules={[
                            {
                                pattern: new RegExp(linkRegexPattern),
                                message: 'Favicon url must be url'
                            }
                        ]}
                    >
                        <Input.Group compact>
                            <Input
                                placeholder={'Logo url'}
                                style={{width: 'calc(100% - 32px)'}}
                                value={logoUrl}
                                onChange={e => setLogoUrl(e.target.value)}
                            />
                            <ButtonUploadFile
                                accept={'.png,.jpg,.jpeg,.gif'}
                                onUploaded={files => setLogoUrl(files[0])}
                            />
                        </Input.Group>
                    </Form.Item>
                    <div className={'mt--10'}>
                        <Text type={'secondary'}>Recommended size 120 x 30 px</Text>
                    </div>
                    {logoUrl && !form.getFieldError('logoUrl').length &&
                        <div className={'imagePreview'}>
                            <Image src={logoUrl}/>
                        </div>
                    }
                </Col>
            </Row>
            <ExtraHeaderButtons
                onDiscardChanges={onDiscardChanges}
                onSaveChanges={form.submit}
                loading={settingsLoadingUpdate}
            />
        </Form>
    );
};