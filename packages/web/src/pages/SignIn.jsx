import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:8000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then(console.log);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          inputMode="email"
          autoComplete="username"
          onChange={(event) => setEmail(event.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          inputMode="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </fieldset>

      <button type="submit">Login</button>
    </form>
  );
};

export { SignIn };
