import React, {FC, useEffect, useRef} from 'react';
import {createPortal} from "react-dom";
import {Space} from "antd";
import {ButtonDiscardChanges} from "./ButtonDiscardChanges";
import {ButtonSaveChanges} from "./ButtonSaveChanges";
import {getHeaderExtraButtonsElement} from "./AppLayout/AppLayout";

type Props = {
    onDiscardChanges: () => void,
    onSaveChanges: () => void,
    loading: boolean
}

export const ExtraHeaderButtons: FC<Props> = ({onSaveChanges, onDiscardChanges, loading}) => {
    const headerExtraButtonsElement = useRef(document.createElement('div'))

    useEffect(() => {
        getHeaderExtraButtonsElement()?.appendChild(headerExtraButtonsElement.current);
        return () => {
            getHeaderExtraButtonsElement()?.removeChild(headerExtraButtonsElement.current);
        }
    }, [])

    return createPortal(
        <Space>
            <ButtonDiscardChanges onClick={onDiscardChanges}/>
            <ButtonSaveChanges loading={loading} onClick={onSaveChanges}/>
        </Space>,
        headerExtraButtonsElement.current);
};
