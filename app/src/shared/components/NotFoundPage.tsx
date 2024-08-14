import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from '../styles/Ilustration';
import classes from '../styles/notFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigator = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Group justify='center'>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
          </Group>
          <Group justify="center">
            <Button size="md" onClick={() => navigator(`/`)}>Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}

export default NotFoundPage;