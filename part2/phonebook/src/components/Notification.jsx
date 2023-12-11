const Notification = ({notification}) => {
    if (notification === null){
        return null
    }
    return(
        <div className="notification">
            {notification}
        </div>
    )
}

export default Notification