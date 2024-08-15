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
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { unsetAuthorizationToken } from '../../../shared/functions/connections/auth';

const LoginScreen = () => {
  const { authRequest } = useRequests();
  const navigator = useNavigate();

  unsetAuthorizationToken()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
        password: '',
        email: '',
    },
    validate: {
        password: (value) => {
          const valid = false
  
          if (!value.length) return 'Name is required';
          if (value.length < 2) return 'Name is too short';
  
          return valid;
        },
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleLogin = () => {
    if (form.validate().hasErrors) return;
    authRequest({...form.getValues()});
  };

  const handleGoToCreatePage = () => {
    navigator('/create-user');
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={handleGoToCreatePage}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="jon@doe.com"
          key={form.key('email')}
            {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required mt="md"
          key={form.key('password')}
            {...form.getInputProps('password')}
        />
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginScreen;
