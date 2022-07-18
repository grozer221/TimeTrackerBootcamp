import React, {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

type Props = {};
export const Settings: FC<Props> = ({}) => {
    const settings = useSelector((state: RootState) => state.settings.settings)

    useEffect(() => {
        if (settings?.application?.faviconUrl) {
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            link.href = settings.application.faviconUrl;
        }
    }, [settings?.application?.faviconUrl])

    useEffect(() => {
        if (settings?.application?.title) {
            let title = document.querySelector("title") as HTMLTitleElement;
            title.innerHTML = settings.application.title;
        }

    }, [settings?.application?.title])

    return null
};