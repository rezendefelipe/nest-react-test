import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from '../styles/header.module.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { getAuthorizationToken, unsetAuthorizationToken } from '../functions/connections/auth';
import { connectionAPIGetWithToken } from '../functions/connections/connectionAPI';
import { URL_USER } from '../constants/urls';
import { UserType } from '../../modules/login/types/UserType';

const links = [
  { link: '/', label: 'Home' },
  { link: '/login', label: 'Login' },
];

const linksLogged = [
  { link: '/', label: 'Home' },
  { link: '/secret', label: 'Secret Page' },
  { link: '/login', label: 'Logout' },
];

export function HeaderComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const { setSearchText, setUser, user } = useGlobalContext();

  let items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </a>
  ));

  let itemsLogged = linksLogged.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </a>
  ));

  useEffect(() => {
    const token = getAuthorizationToken();

    if (token) {
      connectionAPIGetWithToken<UserType>(URL_USER)
        .then((resp) => {
          setUser(resp);
        }).catch(() => unsetAuthorizationToken());
    }
  }, [])

  useEffect(() => {
    if (value.length > 2) {
      setSearchText(value); 
    } else {
      setSearchText('')
    }
  }, [value]);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          LOGO
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {user ? itemsLogged : items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            visibleFrom="xs"
            data={[]} value={value} onChange={setValue}
          />
        </Group>
      </div>
    </header>
  );
}