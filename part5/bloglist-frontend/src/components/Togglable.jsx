import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}
    
    const toggleVisibility = () => {
        setVisible((prevValue) => !prevValue)
    }

    useImperativeHandle(refs, () => {
        return (
            toggleVisibility
        )   
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </>
    )
})

export default Togglable