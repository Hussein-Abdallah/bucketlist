import {Container, Dropdown, Nav, Navbar} from 'react-bootstrap';
import classNames from 'classnames';
import {AiFillCaretDown} from 'react-icons/ai';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

import {useAuth} from '../../foundation';
import styles from './Header.module.css';

export function Header() {
  const [, , removeCookie] = useCookies(['token']);
  const {setIsAuthenticated} = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    removeCookie('token');
    setIsAuthenticated(false);

    navigate('/');
  }

  return (
    <Navbar expand="md" className="p-4" variant="light">
      <Container>
        <Navbar.Brand href="/" className={styles.Logo}>
          <img src="assets/images/logo.png" alt="logo" />
          Bucket List
        </Navbar.Brand>
      </Container>
      <Container className="justify-content-end">
        <Nav>
          <Nav.Item>
            <Dropdown className={styles.DropdownToggle}>
              <Dropdown.Toggle active={false} bsPrefix="px-2 pt-2">
                <>
                  <img
                    src="assets/images/user.jpeg"
                    alt="user"
                    className={classNames(styles.Avatar, 'rounded-circle')}
                    loading="lazy"
                  />
                  <AiFillCaretDown
                    style={{color: '#fff', fontSize: '0.8rem'}}
                  />
                </>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => console.log('Manage profile')}>
                  Manage profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
