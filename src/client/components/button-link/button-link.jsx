import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Link from '~/components/link';
import Button, { sizes } from '~/components/button';

import styles from './button-link.styles.pcss';

const ButtonLink = ({
  href,
  children,
  className,
  ...props
}) => {
  const { size } = props;

  return (
    <Button
      {...props /* eslint-disable-line react/jsx-props-no-spreading */}
      className={classnames(styles.button, className)}
    >
      <Link
        href={href}
        className={classnames(styles.link, styles[size])}
      >
        {children}
      </Link>
    </Button>
  );
};

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
};

ButtonLink.defaultProps = {
  className: '',
  size: sizes.medium,
};

export default ButtonLink;
