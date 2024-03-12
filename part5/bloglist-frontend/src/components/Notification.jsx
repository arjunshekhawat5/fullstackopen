
const Notification = ({ errorMessage }) => {
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }
  return null
}

export default Notification