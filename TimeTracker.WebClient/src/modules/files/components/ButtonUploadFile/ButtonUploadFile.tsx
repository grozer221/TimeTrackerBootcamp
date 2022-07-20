import React, {FC, useEffect, useRef} from 'react';
import {UploadOutlined} from "@ant-design/icons";
import {Button, Upload} from "antd";
import {UploadChangeParam} from "antd/lib/upload/interface";
import {useDispatch, useSelector} from "react-redux";
import {filesActions} from "../../store/files.actions";
import {RootState} from "../../../../store/store";
import {getGuid} from "../../../../utils/stringUtils";

type Props = {
    multiple?: boolean,
    onUploaded: (uploadedFiles: string[]) => void,
    accept?: string
};
export const ButtonUploadFile: FC<Props> = ({multiple = false, onUploaded, accept}) => {
    const dispatch = useDispatch();
    const uploadedFiles = useSelector((s: RootState) => s.files.uploadedFiles)
    const loadingUpload = useSelector((s: RootState) => s.files.loadingUpload)
    const currentComponentKey = useRef(getGuid())

    useEffect(() => {
        if (uploadedFiles.length) {
            const currentUploadedFiles = uploadedFiles.find(f => f.currentComponentKey === currentComponentKey.current);
            if (currentUploadedFiles) {
                onUploaded(currentUploadedFiles?.files || [])
                dispatch(filesActions.removeUploadedFiles(currentComponentKey.current))
            }
        }
    }, [uploadedFiles])

    const onChange = (info: UploadChangeParam) => {
        if (multiple) {
            dispatch(filesActions.uploadAsync(info.fileList as any, currentComponentKey.current))
        } else {
            dispatch(filesActions.uploadAsync([info.file as any], currentComponentKey.current))
        }
    };

    return (
        <Upload
            multiple={multiple}
            itemRender={() => null}
            beforeUpload={() => false}
            onChange={onChange}
            accept={accept}
        >
            <Button loading={!!loadingUpload.find(l => l === currentComponentKey.current)} icon={<UploadOutlined/>}/>
        </Upload>
    );
};