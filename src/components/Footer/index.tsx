import { GithubOutlined, FacebookOutlined ,LinkedinOutlined} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} aegis4206(white)`}
      links={[
        {
          key: 'GitHub',
          title: <GithubOutlined />,
          href: 'https://github.com/aegis4206',
          blankTarget: true,
        },
        {
          key: 'FaceBook',
          title: <FacebookOutlined />,
          href: 'https://www.facebook.com/aegis4206/',
          blankTarget: true,
        },
        {
          key: 'Linked',
          title: <LinkedinOutlined />,
          href: 'https://www.linkedin.com/in/%E4%BF%8A%E4%BD%91-%E9%99%B3-19150b266/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
