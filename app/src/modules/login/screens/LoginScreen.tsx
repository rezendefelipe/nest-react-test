import { useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Container,
} from '@mantine/core';
import classes from '../styles/login.module.css';
import { useRequests } from '../../../shared/hooks/useRequests';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { authRequest } = useRequests();

  const handleUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const handleLogin = () => {
    authRequest({
      email: email,
      password: userPassword,
    });
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" onChange={handleUserEmail} placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" onChange={handlePasswordName} placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
