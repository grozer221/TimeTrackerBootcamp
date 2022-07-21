import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fileManagerActions} from "../../store/fileManager.actions";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RootState} from "../../../../store/store";
import {FileManagerItem, FileManagerItemKind} from "../../graphQL/fileManager.types";
import {
    CloudDownloadOutlined,
    CopyOutlined,
    DeleteOutlined,
    FileAddOutlined,
    FileOutlined,
    FolderAddOutlined,
    FolderOpenOutlined,
    ReloadOutlined,
    RollbackOutlined
} from "@ant-design/icons";
import s from './FileManagerGetInFolder.module.css';
import {Breadcrumb, Button, Popconfirm, Space, Tooltip} from "antd";
import {Loading} from "../../../../components/Loading/Loading";
import {capitalize} from "../../../../utils/stringUtils";

type Props = {};
export const FileManagerGetInFolder: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams()
    const folderPath = searchParams.get('folderPath') || '';
    const items = useSelector((s: RootState) => s.fileManager.items);
    const loadingGetInFolder = useSelector((s: RootState) => s.fileManager.loadingGetInFolder);
    const [selectedItem, setSelectedItem] = useState<FileManagerItem | null>(null)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getInFolder();
    }, [folderPath])

    const getInFolder = () => {
        setSelectedItem(null);
        dispatch(fileManagerActions.getInFolderAsync(folderPath))
    }

    const onDoubleClick = (item: FileManagerItem): void => {
        if (item.kind !== FileManagerItemKind.Folder)
            return;
        setSelectedItem(null);
        setFolderPath(item.path)
    }

    const setFolderPath = (folderPath: string) => {
        setSearchParams({folderPath})
    }

    const onStepBack = () => {
        const regex = new RegExp(/\/(\w+)?$/);
        let newFolderPath: string;
        if (folderPath.match(regex))
            newFolderPath = folderPath.replace(regex, '');
        else
            newFolderPath = ''
        setSelectedItem(null);
        setFolderPath(newFolderPath)
    }

    return (
        <Space direction={'vertical'} className={s.wrapperPage}>
            <Space>
                <Tooltip title="Step back">
                    <Button
                        icon={<RollbackOutlined/>}
                        size={'small'}
                        onClick={onStepBack}
                        disabled={!folderPath || loadingGetInFolder}
                    />
                </Tooltip>
                <Tooltip title="Reload">
                    <Button
                        icon={<ReloadOutlined/>} size={'small'}
                        onClick={getInFolder}
                    />
                </Tooltip>
                <Tooltip title="Create folder">
                    <Link to={`create-folder?folderPath=${folderPath}`} state={{popup: location}}>
                        <Button icon={<FolderAddOutlined/>} size={'small'}/>
                    </Link>
                </Tooltip>
                <Tooltip title="Upload files">
                    <Link to={`upload-files?folderPath=${folderPath}`} state={{popup: location}}>
                        <Button
                            icon={<FileAddOutlined/>}
                            size={'small'}
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Download">
                    <a href={selectedItem?.path} target={'_blank'}>
                        <Button
                            icon={<CloudDownloadOutlined/>}
                            size={'small'}
                            disabled={!(selectedItem?.kind === FileManagerItemKind.File)}
                        />
                    </a>
                </Tooltip>
                <Tooltip title="Copy to clipboard">
                    <Button
                        icon={<CopyOutlined/>}
                        size={'small'}
                        disabled={!(selectedItem?.kind === FileManagerItemKind.File)}
                        onClick={() => navigator.clipboard.writeText(selectedItem?.path || '')}
                    />
                </Tooltip>
                <Tooltip title="Remove">
                    <Popconfirm
                        title="Are you sure to remove?"
                        okText="Yes"
                        cancelText="No"
                        disabled={!selectedItem}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined/>}
                            size={'small'}
                            disabled={!selectedItem}
                        />
                    </Popconfirm>
                </Tooltip>
            </Space>
            <table className={[s.tableFileManager, loadingGetInFolder ? s.loading : ''].join(' ')}>
                <tr>
                    <th colSpan={2}>Name</th>
                    <th>Created at</th>
                </tr>
                {items.map(item => (
                    <tr key={item.path}
                        onDoubleClick={(e) => onDoubleClick(item)}
                        onClick={() => setSelectedItem(item)}
                        className={item === selectedItem ? s.selected : ''}
                    >
                        <td>{item.kind === FileManagerItemKind.File ? <FileOutlined/> : <FolderOpenOutlined/>}</td>
                        <td>{item.name}</td>
                        <td>{item.createdAt}</td>
                    </tr>
                ))}
            </table>
            <Breadcrumb separator=">">
                <Breadcrumb.Item onClick={() => setFolderPath('')}>Root</Breadcrumb.Item>
                {folderPath.split('/').map((module, i) => {
                    const path = folderPath.split('/').slice(0, i + 1).join('/');
                    return (
                        <Breadcrumb.Item key={module} onClick={() => setFolderPath(path)}>
                            {capitalize(module)}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
            {loadingGetInFolder &&
                <div className={'absoluteCenter'}>
                    <Loading/>
                </div>
            }
        </Space>
    );
};