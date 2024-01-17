import { InfoCircleOutlined, GithubOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import React from 'react';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          height: 26,
        }}
        onClick={() => {
          window.open('https://github.com/aegis4206');
        }}
      >
        <GithubOutlined />
      </div>
      <div
        style={{
          display: 'flex',
          height: 26,
        }}
        onClick={() => {
          window.open('https://www.facebook.com/aegis4206/');
        }}
      >
        <FacebookOutlined />
      </div>
      <div
        style={{
          display: 'flex',
          height: 26,
        }}
        onClick={() => {
          window.open('https://www.linkedin.com/in/%E4%BF%8A%E4%BD%91-%E9%99%B3-19150b266/');
        }}
      >
        <LinkedinOutlined />
      </div>
    </>
    // <UmiSelectLang
    //   style={{
    //     padding: 4,
    //   }}
    // />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://my-blog-whites-projects.vercel.app/');
      }}
    >
      <InfoCircleOutlined />
    </div>
  );
};
