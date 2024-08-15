import { useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Anchor,
  Container,
  Center,
  Box,
  Space,
} from '@mantine/core';
import classes from '../styles/createUser.module.css';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useForm } from '@mantine/form';

const CreateUserScreen = () => {
    const { createUserRequest } = useRequests();
    const navigator = useNavigate();

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
          name: '',
          password: '',
          email: '',
      },
      validate: {
          name: (value) => {
            const valid = false

            if (!value.length) return 'Name is required';
            if (value.length < 2) return 'Name is too short';

            return valid;
          },
          password: (value) => {
            const valid = false

            if (!value.length) return 'Name is required';
            if (value.length < 2) return 'Name is too short';

            return valid;
          },
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
    });

    const handleCreate = () => {
      if (form.validate().hasErrors) return;
        createUserRequest({...form.getValues()});
    };

    const handleGoToCreatePage = () => {
        navigator('/login');
    }

    return (
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Create your account!
          </Title>
    
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Name"
              placeholder="Jon Doe"
              key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <Space h="sm" />
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

            <Button fullWidth mt="xl" onClick={handleCreate}>
              Sign up
            </Button>

            <Space h="xl" />

            <Anchor c="dimmed" size="sm" className={classes.control} onClick={handleGoToCreatePage}>
              <Center inline>
                <IconArrowLeft stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>

          </Paper>
        </Container>
      );
}

export default CreateUserScreen;