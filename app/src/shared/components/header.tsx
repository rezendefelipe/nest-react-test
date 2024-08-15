import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from '../styles/header.module.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';

const links = [
  { link: '/', label: 'Home' },
  { link: '/login', label: 'Login' },
];

export function HeaderComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const { setSearchText } = useGlobalContext();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </a>
  ));

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
            {items}
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