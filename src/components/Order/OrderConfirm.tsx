import { PageContainer, ModalForm, ProFormRadio, ProFormDigit, ProFormText, ProTable, ProForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Button, Select, Tabs, FloatButton, Drawer, Table, Space, Tag, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PlusCircleTwoTone, MinusCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { v4 } from 'uuid'
import moment from 'moment';



interface DataType {
    M?: number;
    L?: number;
    index: number;
    price: object;
    title: string;
}

export default function OrderConfirm(props) {
    const { orderDrawerOpen, setOrderDrawerOpen, selectedRestaurant } = props
    const { orderList, setOrderList, orderSubmitList, setOrderSubmitList } = useModel('order')
    const [orderListCount, setOrderListCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const editHandle = (index, mode) => {
        const tempOrderList = [...orderList]
        const order = tempOrderList[index]
        if (order.count === 1 && mode === 'min') {
            return message.warning('數量不能為0')
        } else {
            const tempCount = mode === 'plus' ? tempOrderList[index].count + 1 : tempOrderList[index].count - 1
            const tempOrder = { ...order, count: tempCount }
            tempOrderList.splice(index, 1, tempOrder)
        }
        // tempOrderList[index].count = mode === 'plus' ? tempOrderList[index].count + 1 : tempOrderList[index].count - 1
        setOrderList(tempOrderList)
    }

    const deleteHandle = (index) => {
        const tempOrderList = [...orderList]
        tempOrderList.splice(index, 1)
        setOrderList(tempOrderList)

        if (tempOrderList.length === 0) {
            setOrderDrawerOpen(false)
        }
    }


    const columns = [
        {
            title: '品項',
            dataIndex: 'title',
            key: 'title',
            render: (record, text) => {
                return <>
                    <div style={{ color: '#4096ff' }}>{record} ({text.size})</div>
                    <div>${text.price[text.size]}</div>
                </>
            },
        },
        // {
        //     title: '價格',
        //     dataIndex: 'price',
        //     key: 'price',
        //     // render:(text)=> text.map(i=>i)
        // },
        {
            title: '內容',
            align: 'center',
            dataIndex: 'size',
            key: 'size',
            render: (record, text, index) => {
                // console.log(record, text, index)
                return <div >
                    <Space style={{ display: 'flex', justifyContent: 'center' }}>
                        <MinusCircleTwoTone onClick={() => editHandle(index, 'min')} />
                        {text.count}
                        {/* {orderList[index].count} */}
                        <PlusCircleTwoTone onClick={() => editHandle(index, 'plus')} /></Space>
                    <div
                        style={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
                        <Popconfirm
                            title="刪除品項"
                            description={<>您確定要刪除 <div style={{ color: '#4096ff' }}>{text.title}({text.size})?</div></>}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => deleteHandle(index)}
                            placement="bottom"
                        >
                            <Button size='small' type='primary' danger>刪除</Button>
                        </Popconfirm>


                    </div>
                </div>
            }
        },
        // {
        //     title: '數量',
        //     dataIndex: 'count',
        //     key: 'count',
        // },
        {
            title: '備註',
            key: 'memo',
            dataIndex: 'memo',
        },
    ];



    useEffect(() => {
        if (orderDrawerOpen && orderList.length !== 0) {
            const total = orderList.reduce((accumulator, currentValue) => {
                const size = currentValue.size

                return accumulator + (currentValue.count * currentValue.price[size])
            }, 0)

            setOrderListCount(total)

        }
    }, [orderList, orderDrawerOpen])

    const orderSubmit = async (values) => {
        const tempSubmitList = [...orderSubmitList]
        // const time = new Date().toLocaleString()
        const time = moment().format("YYYY-MM-DD HH:mm:ss")
        const tempOrder = {
            ...values,
            selectedRestaurant,
            time,
            'id': v4(),
            'total': orderListCount,
            'order': [...orderList]
        }
        // const order = [tempOrder, ...tempSubmitList].map((item, index) => {
        //     item.key = index
        //     return item
        // })

        // firebase
        // try {
        //     await setDoc(doc(getFirestore(firebaseApp), "Order", tempOrder.id), tempOrder)
        //     setIsLoading(false)
        //     setOrderList([])
        //     setOrderDrawerOpen(false)
        //     return message.success({
        //         content: `訂單成功建立 金額為${orderListCount}`,
        //         duration: 5
        //     })

        // }
        // catch (e) {
        //     console.error("Error adding document: ", e);
        //     return message.error({
        //         content: `伺服器發生錯誤，請稍後再試`,
        //         duration: 5
        //     })
        // }

        //node.js api
        await fetch(`${process.env.REACT_APP_API_URL}/api/orderList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempOrder),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('伺服器發生錯誤，請稍後再試');
            }
            message.success({
                content: `訂單成功建立 金額為${orderListCount}`,
                duration: 5
            })
            setIsLoading(false)
            setOrderList([])
            setOrderDrawerOpen(false)
            return "OK"
        }).then(() => {

        }).catch(error => {
            console.error('Error:', error.message); // 錯誤處理
            message.error({
                content: `伺服器發生錯誤，請稍後再試`,
                duration: 5

            })
            return "FAIL"
        });



        // setOrderSubmitList(order)
    }

    return (
        <Drawer
            title='點餐明細'
            width={'100%'}
            open={orderDrawerOpen}
            onClose={() => setOrderDrawerOpen(false)}
        >
            <Table
                size='small'
                columns={columns}
                dataSource={orderList}
                pagination={{ pageSize: 5 }}
            />
            <div style={{ fontSize: 24, marginBottom: 20 }}>總價 : {orderListCount}</div>
            <div style={{ fontSize: 18, marginBottom: 10 }}>訂單確認</div>
            <ProForm
                submitter={{
                    render: (_, dom) => {
                        return <Space>
                            {/* {dom[1]} */}
                            <>
                                <Popconfirm
                                    title="送出訂單"
                                    description={<>
                                        <div>品項數 : {orderList.length}</div>
                                        <div>訂單金額 : {orderListCount}</div>
                                    </>}
                                    icon={<QuestionCircleOutlined style={{ color: 'blue' }} />}
                                    onConfirm={() => _.submit()}
                                    placement="bottom"
                                >
                                    <Button type="primary">送出訂單</Button>
                                </Popconfirm>
                            </>
                            <Button onClick={() => setOrderDrawerOpen(false)}>繼續選購</Button>
                        </Space>
                    },
                    // 配置按钮文本
                    searchConfig: {
                        submitText: '送出訂單',
                    },
                    // 配置按钮的属性
                    resetButtonProps: {
                        style: {
                            // 隐藏重置按钮
                            display: 'none',
                        },
                    },
                }}
                onFinish={async (values) => {
                    setIsLoading(true)
                    orderSubmit(values)
                }}
                loading={isLoading}
            >
                <ProFormText
                    name='name'
                    label='訂購人'
                    placeholder='請輸入訂購人'
                    rules={[{ required: true, message: '請輸入訂購人!' }]}
                />
                <ProFormText
                    name='contact'
                    label='聯絡方式'
                    placeholder='請輸入聯絡方式(手機)'
                    rules={[{ required: true, message: '請輸入聯絡方式!' }]}
                />
                <ProFormRadio.Group
                    name='method'
                    label='請選擇用餐方式'
                    options={[
                        {
                            label: '內用',
                            value: '內用'
                        },
                        {
                            label: '外帶',
                            value: '外帶'
                        },

                    ]}
                    rules={[{ required: true, message: '請選擇份量!' }]}
                    initialValue={'內用'}
                />
            </ProForm>

        </Drawer>
    )
}
