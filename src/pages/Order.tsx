import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Button, Select, Tabs } from 'antd';
import React, { useState, useRef, useEffect } from 'react';

import MenuList from '@/components/Order/MenuList';
import './simple.css'

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */




const Order: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  console.log("process.env", process.env)

  return (<>
    <PageContainer style={{ position: 'relative' }}>

      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            display: 'flex'
          }}
        >
          歡迎使用 點餐系統
        </div>
        <MenuList />


      </div>
    </PageContainer>

  </>
  );
};

export default Order;
