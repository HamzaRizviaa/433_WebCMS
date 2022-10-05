import React from "react";
import OptionsFormatter from "./OptionsFormatter";
import StatusBadge from "../../StatusBadge";
import MediaPreviewer from "../../../common/MediaPreviewer";

const formatter = {
    status: StatusBadge,
    options: OptionsFormatter,
    media: MediaPreviewer
}

export const getFormatter = (option, props) => {
    if(Object.prototype.hasOwnProperty.call(formatter, `${option}`)){
        const Formatter = formatter[option]
        return <Formatter {...props} />
    }
}