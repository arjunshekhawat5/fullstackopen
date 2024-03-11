import { useState } from "react"

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const userCredentials = { username, password }
        handleLogin(userCredentials)
        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username: <input
                        type='text'
                        value={username}
                        name='username'
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    password: <input
                        type='password'
                        value={password}
                        name='password'
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm