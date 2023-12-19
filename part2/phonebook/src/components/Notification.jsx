const Notification = ({ notification, isError }) => {
    if (notification === null) {
        return null
    }
    //console.log('type of notification', typeof (notification), notification)
    const className = isError ? 'error' : 'notification'
    //console.log(className)
    return (
        <div className={className}>
            {notification}
        </div>
    )
}

export default Notification