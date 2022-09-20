import React from "react";
import OptionsFormatter from "./optionsFormatter";
import StatusFormatter from "./statusFormatter";

const formatter = {
    status: StatusFormatter,
    options: OptionsFormatter
}

export const getFormatter = (option, styledClass = null, props) => {
    if(Object.prototype.hasOwnProperty.call(formatter, `${option}`)){
        const Formatter = formatter[option]
        return <Formatter params={props} styledClass={styledClass ? styledClass : null} />
    }
}