import { PageContainer, ModalForm, ProFormRadio, ProFormDigit, ProFormText, ProTable, ProForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Button, Select, Tabs, FloatButton, Drawer, Table, Space, Tag, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PlusCircleTwoTone, MinusCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';



/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */




const Order: React.FC = () => {

  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const { orderSubmitList } = useModel('order')
  const [orders, setOrders] = useState([])
  const [chart, setChart] = useState({})
  const [isLoading, setIsLoading] = useState(false)



  const fetchData = async () => {
    const data = await fetch(`${process.env.API_URL}/api/orderList`, {
      method: 'GET',
    }).
      then((response) => {
        return response.json();

      })
    setOrders(data)
    setIsLoading(false)
  }


  useEffect(() => {
    setIsLoading(true)

    // 在客戶端建立 WebSocket 連線
    const ws = new WebSocket(`ws://${process.env.WS_URL}`);

    //firebase
    // const q = query(collection(getFirestore(firebaseApp), "Order"), orderBy('time', 'desc'));
    // // limet(數字) 限制回傳的數量
    // onSnapshot(q, (querySnapshot) => {
    //   const data = querySnapshot.docs.map((i, index) => ({ ...i.data(), key: index }))
    //   console.log(data)
    //   setOrders(data)
    //   setIsLoading(false)
    // })

    //node.js api
    fetchData()

    ws.onopen = () => {
      console.log('Connected to server');
    };
    ws.onmessage = (event) => {
      // 接收伺服器傳來的資料
      const data = JSON.parse(event.data);
      // 處理資料的變化，例如更新頁面上的資料
      setOrders(data)
    };
    ws.onclose = () => {
      console.log('Disconnected from server');
    };

  }, [])

  const deleteHandle = async (id) => {
    console.log(id)

    //firebase
    // try {
    //   await deleteDoc(doc(getFirestore(firebaseApp), "Order", id));

    // }
    // catch (e) {
    //   console.error("Error adding document: ", e);
    //   return message.error({
    //     content: `伺服器發生錯誤，請稍後再試`,
    //     duration: 5
    //   })
    // } finally {

    // }

    //node.js api
    await fetch(`${process.env.API_URL}/api/orderList/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Error deleting order');
      }
      message.success({
        content: `訂單已成功刪除`,
        duration: 5
      })
      return "OK"
    }).then(() => {

    }).catch(error => {
      console.error('Error:', error.message); // 錯誤處理
      message.error({
        content: `伺服器發生錯誤或訂單已刪除，請稍後再試`,
        duration: 5

      })
      return "FAIL"
    });

  }


  const columns = [
    {
      title: '訂購人',
      dataIndex: 'name',
      key: 'name',
      render: (_, text) => {
        return <>
          <div style={{ color: '#4096ff' }}>{_}</div>
          <div>{text.contact}</div>
          <Popconfirm
            title="刪除訂單"
            description={<>您確定要刪除此訂單</>}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async () => deleteHandle(text.id)}
            placement="bottom"
          >
            <Button size='small' type='primary' danger>刪除</Button>
          </Popconfirm>
        </>
      }
    },
    {
      title: '方式',
      dataIndex: 'method',
      key: 'method',
      render: (_, text) => {
        console.log(text.time)
        const time = new Date(text.time).toLocaleString().split(' ')
        return <>
          <div>{text.selectedRestaurant}</div>
          <div>{time[0]}</div>
          <div>{time[1]}</div>
          <div>{_}</div>
        </>
      }
    },
    {
      title: '金額',
      dataIndex: 'total',
      key: 'total',
    },
  ]
  const expandedRowRender = (record, index) => {
    console.log(record, index)
    const expandedRowRenderColumns = [
      {
        title: '品項',
        dataIndex: 'title',
        key: 'title',
        render: (record, text) => {
          console.log(record, text)

          return <>
            <div style={{ color: '#4096ff' }}>{record} ({text.size})</div>
          </>
        },
      },
      {
        title: '內容',
        align: 'center',
        dataIndex: 'size',
        key: 'size',
        render: (record, text, index) => {
          // console.log(record, text, index)
          return <div >
            {text.size} * {text.count}
          </div>
        }
      },
      {
        title: '備註',
        key: 'memo',
        dataIndex: 'memo',
      },
    ];

    return <Table
      size='small'
      columns={expandedRowRenderColumns}
      dataSource={orders[index].order}
      pagination={{ pageSize: 5 }}
    />;
  };

  useEffect(() => {
    const tempList = [...orders]
    const reversed = tempList.reverse();

    const chartOtion = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['早午餐店', '在地麵攤', '台南牛肉湯']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: '保存圖片',
          },

        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: reversed.map(i => new Date(i.time).toLocaleString())
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '早午餐店',
          type: 'line',
          // stack: 'Total',
          data: reversed.map(i => {
            if (i.selectedRestaurant === '早午餐店') {
              return i.total
            }
            return 0
          })
        },
        {
          name: '在地麵攤',
          type: 'line',
          // stack: 'Total',
          data: reversed.map(i => {
            if (i.selectedRestaurant === '在地麵攤') {
              return i.total
            }
            return 0
          })
        },
        {
          name: '台南牛肉湯',
          type: 'line',
          // stack: 'Total',
          data: reversed.map(i => {
            if (i.selectedRestaurant === '台南牛肉湯') {
              return i.total
            }
            return 0
          })
        },

      ],
    };

    setChart(chartOtion)
  }, [orders])



  return (<>
    <PageContainer style={{ position: 'relative' }}>

      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
        }}
      >
        {/* <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            display: 'flex',
            marginBottom: 10
          }}
        >
          訂單列表
        </div> */}
        <Table
          loading={isLoading}
          size='small'
          columns={columns}
          dataSource={orders}
          pagination={{ pageSize: 5 }}
          expandable={{
            // defaultExpandAllRows: true,
            expandedRowRender,
            // defaultExpandedRowKeys: ['1'],

          }}
          rowKey="id"
        />

      </div>
      <h3>營業額概覽</h3>
      <ReactECharts
        option={chart}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}

      />
    </PageContainer>

  </>
  );
};

export default Order;
