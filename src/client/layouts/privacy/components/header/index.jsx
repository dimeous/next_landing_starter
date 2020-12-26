import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import classnames from 'classnames';

import Logo from '~/public/static/logo.svg';

import styles from './styles.pcss';

class Header extends Component {
  isActiveLink(href) {
    const { router } = this.props;
    return router.pathname === href;
  }

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <a href="/" label="Logo"><Logo /></a>
          </Link>
        </div>

        <ul className={styles.links}>
          <li className={styles.linkItem}>
            <Link href="/privacy-policy">
              <a
                className={classnames(styles.link, {
                  [styles.linkActive]: this.isActiveLink('/privacy-policy'),
                })}
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link prefetch href="/terms">
              <a
                className={classnames(styles.link, {
                  [styles.linkActive]: this.isActiveLink('/terms'),
                })}
                href="/terms"
              >
                Terms of Service
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
