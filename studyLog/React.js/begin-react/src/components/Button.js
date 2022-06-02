import classNames from "classnames"
import React from "react"
import './Button.scss'

function Button({children,size,color,outline,fullwidth,...rest}){
    return(
        <button className={classNames('Button',size,color,{outline,fullwidth})}
        {...rest}>
            {children}
        </button>
    )
}

Button.defaultProps={
    size:'medium',
    color:'blue',
}


export default Button;