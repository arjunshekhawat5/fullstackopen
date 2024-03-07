const LoginForm = ({
    handleSubmit,
    handlePasswordChange,
    handleUsernameChange,
    username,
    password
}) => {
    return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username: <input
            type='text'
            value={username}
            name='username'
            onChange={handleUsernameChange} />
        </div>
        <div>
          password: <input
            type='password'
            value={password}
            name='password'
            onChange={handlePasswordChange} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
    )
}

export default LoginForm