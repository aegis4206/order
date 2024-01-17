import { PageContainer, ModalForm, ProFormRadio, ProFormDigit, ProFormText, ProFormFieldSet } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Button, Select, Tabs, FloatButton, message, Space } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCartOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

import OrderConfirm from './OrderConfirm';
import { size } from 'lodash';

const InfoCard: React.FC<{
    title: string;
    index: number;
    desc: string;
    price: object;
    setMenuSelect: any;
    setMenuModalOpen: any
}> = (props) => {
    const { title, index, desc, price, setMenuSelect, setMenuModalOpen } = props
    const { useToken } = theme;

    const { token } = useToken();

    return (
        <div
            onClick={() => {
                setMenuSelect(props)
                setMenuModalOpen(true)
            }}
            style={{
                backgroundColor: token.colorBgContainer,
                boxShadow: token.boxShadow,
                borderRadius: '8px',
                fontSize: '14px',
                color: token.colorTextSecondary,
                lineHeight: '22px',
                // padding: '16px 19px',
                // minWidth: '300px',
                // maxWidth: '400px',
                width: '360px',
                display: 'flex',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    alignItems: 'center',
                    padding: '16px 0px 16px 19px',
                    flex: 3
                }}
            >
                <div
                    style={{
                        width: 48,
                        height: 48,
                        lineHeight: '22px',
                        backgroundSize: '100%',
                        textAlign: 'center',
                        padding: '8px 16px 16px 12px',
                        color: '#FFF',
                        fontWeight: 'bold',
                        backgroundImage:
                            "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
                    }}
                >
                    {index}
                </div>
                <div
                    style={{
                        fontSize: '16px',
                        color: token.colorText,
                        paddingBottom: 8,
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        fontSize: '14px',
                        color: token.colorTextSecondary,
                        textAlign: 'justify',
                        lineHeight: '22px',
                        marginBottom: 8,
                        marginTop: '10px',
                        display: 'block',
                        width: '100%'
                    }}
                >
                    {desc}
                </div>
                <Button onClick={() => {
                    // setMenuSelect(props)
                    // setMenuModalOpen(true)
                }}>
                    加入購物車
                </Button>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 10px 10px 0px', flex: 2, verticalAlign: 'middle' }}>
                <img src={`https://source.unsplash.com/200x200/?food&rnd=${index}`} alt='food' style={{ width: '100%', borderRadius: '8px', }} />
            </div>
        </div>
    );
};

const menu = {
    '早午餐店': [
        {
            key: 1,
            index: 1,
            title: "日式飯糰搭法棍",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 260 }
        },
        {
            key: 2,
            index: 2,
            title: "日式厚切炸豬排",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 260 }
        },
        {
            key: 3,
            index: 3,
            title: "香煎豬排",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 280 }
        },
        {
            key: 4,
            index: 4,
            title: "舒肥雞胸肉",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 280 }
        },
        {
            key: 5,
            index: 5,
            title: "香煎嫩雞腿排",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 300 }
        },
        {
            key: 6,
            index: 6,
            title: "嫩肩牛排",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 360 }
        },
        {
            key: 7,
            index: 7,
            title: "紅酒燉牛肉",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 360 }
        },
        {
            key: 8,
            index: 8,
            title: "兒童餐",
            desc: "生菜沙拉、飲料、濃湯",
            class: '主食套餐',
            price: { M: 200 }
        },
        {
            key: 9,
            index: 9,
            title: "白醬蘑菇培根",
            desc: "文創新興早午餐",
            class: '義大利麵',
            price: { M: 120 }
        },
        {
            key: 10,
            index: 10,
            title: "番茄肉醬",
            desc: "文創新興早午餐",
            class: '義大利麵',
            price: { M: 120 }
        },
        {
            key: 11,
            index: 11,
            title: "泰式打拋豬",
            desc: "文創新興早午餐",
            class: '義大利麵',
            price: { M: 120 }
        },
        {
            key: 12,
            index: 12,
            title: "紅酒燉牛肉",
            desc: "生菜沙拉、飲料、濃湯",
            class: '義大利麵',
            price: { M: 300 }
        },
        {
            key: 13,
            index: 13,
            title: "厚片土司",
            desc: "生菜沙拉、薯泥、濃湯",
            class: '輕食套餐',
            price: { M: 120 }
        },
        {
            key: 14,
            index: 14,
            title: "歐式麵包",
            desc: "生菜沙拉、薯泥、濃湯",
            class: '輕食套餐',
            price: { M: 130 }
        },
        {
            key: 15,
            index: 15,
            title: "厚片吐司",
            desc: "花生 草莓",
            class: '麵包',
            price: { M: 50 }
        },
        {
            key: 16,
            index: 16,
            title: "厚片法式吐司",
            desc: "文創新興早午餐",
            class: '麵包',
            price: { M: 60 }
        },
        {
            key: 17,
            index: 17,
            title: "丹麥吐司",
            desc: "文創新興早午餐",
            class: '麵包',
            price: { M: 50 }
        },
        {
            key: 18,
            index: 18,
            title: "日式厚切炸豬排",
            desc: "佐生菜",
            class: '單點',
            price: { M: 130 }
        },
        {
            key: 19,
            index: 19,
            title: "舒肥雞胸肉",
            desc: "佐生菜",
            class: '單點',
            price: { M: 160 }
        },
        {
            key: 20,
            index: 20,
            title: "小雞塊",
            desc: "文創新興早午餐",
            class: '單點',
            price: { M: 80 }
        },
        {
            key: 21,
            index: 21,
            title: "脆薯",
            desc: "文創新興早午餐",
            class: '單點',
            price: { M: 60 }
        },
        {
            key: 22,
            index: 22,
            title: "熱美式咖啡",
            desc: "文創新興早午餐",
            class: '咖啡',
            price: { M: 70 }
        },
        {
            key: 23,
            index: 23,
            title: "冷淬咖啡",
            desc: "文創新興早午餐",
            class: '咖啡',
            price: { M: 70 }
        },
        {
            key: 24,
            index: 24,
            title: "冷淬咖啡拿鐵",
            desc: "文創新興早午餐",
            class: '咖啡',
            price: { M: 80 }
        },
        {
            key: 25,
            index: 25,
            title: "原味拿鐵",
            desc: "文創新興早午餐",
            class: '咖啡',
            price: { M: 100 }
        },
        {
            key: 26,
            index: 26,
            title: "手沖咖啡",
            desc: "文創新興早午餐",
            class: '咖啡',
            price: { M: 120 }
        },
        {
            key: 27,
            index: 27,
            title: "冷淬烏龍紅茶",
            desc: "文創新興早午餐",
            class: '茶飲',
            price: { M: 70 }
        },
        {
            key: 28,
            index: 28,
            title: "冷淬烏龍紅奶茶",
            desc: "文創新興早午餐",
            class: '茶飲',
            price: { M: 80 }
        },
        {
            key: 29,
            index: 29,
            title: "伯爵紅茶",
            desc: "文創新興早午餐",
            class: '茶飲',
            price: { M: 70 }
        },
        {
            key: 30,
            index: 30,
            title: "伯爵鮮奶茶",
            desc: "文創新興早午餐",
            class: '茶飲',
            price: { M: 100 }
        },
        {
            key: 31,
            index: 31,
            title: "北埔擂茶",
            desc: "文創新興早午餐",
            class: '茶飲',
            price: { M: 90 }
        },
        {
            key: 32,
            index: 32,
            title: "若竹抹茶拿鐵",
            desc: "文創新興早午餐",
            class: '茶飲',
            price: { M: 120 }
        },
        {
            key: 33,
            index: 33,
            title: "可爾必思氣泡飲",
            desc: "文創新興早午餐",
            class: '氣泡飲',
            price: { M: 70 }
        },
        {
            key: 34,
            index: 34,
            title: "莓果氣泡飲",
            desc: "文創新興早午餐",
            class: '氣泡飲',
            price: { M: 70 }
        },
        {
            key: 35,
            index: 35,
            title: "綜合水果氣泡飲",
            desc: "文創新興早午餐",
            class: '氣泡飲',
            price: { M: 100 }
        },
        {
            key: 36,
            index: 36,
            title: "玫瑰果露氣泡飲",
            desc: "文創新興早午餐",
            class: '氣泡飲',
            price: { M: 100 }
        },
    ],
    '在地麵攤': [
        {
            key: 1,
            index: 1,
            title: "陽春乾麵",
            desc: "在地30年老店",
            class: '乾麵類',
            price: { M: 35, L: 45 }
        },
        {
            key: 2,
            index: 2,
            title: "乾米粉",
            desc: "在地30年老店",
            class: '乾麵類',
            price: { M: 35, L: 45 }
        },
        {
            key: 3,
            index: 3,
            title: "麻將麵",
            desc: "在地30年老店",
            class: '乾麵類',
            price: { M: 40, L: 50 }
        },
        {
            key: 4,
            index: 4,
            title: "榨菜肉絲乾麵",
            desc: "在地30年老店",
            class: '乾麵類',
            price: { M: 50, L: 60 }
        },
        {
            key: 5,
            index: 5,
            title: "餛飩乾麵",
            desc: "在地30年老店",
            class: '乾麵類',
            price: { M: 50, L: 60 }
        },
        {
            key: 6,
            index: 6,
            title: "陽春湯麵",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 35, L: 45 }
        },
        {
            key: 7,
            index: 7,
            title: "米粉湯",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 35, L: 45 }
        },
        {
            key: 8,
            index: 8,
            title: "榨菜肉絲湯麵",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 50, L: 60 }
        },
        {
            key: 9,
            index: 9,
            title: "餛飩湯麵",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 50, L: 60 }
        },
        {
            key: 10,
            index: 10,
            title: "酸辣湯麵",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 55, L: 65 }
        },
        {
            key: 11,
            index: 11,
            title: "牛肉湯麵(無肉)",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 50, L: 65 }
        },
        {
            key: 12,
            index: 12,
            title: "牛肉湯麵",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 90, L: 120 }
        },
        {
            key: 13,
            index: 13,
            title: "紅油炒手",
            desc: "在地30年老店",
            class: '湯麵類',
            price: { M: 45 }
        },
        {
            key: 14,
            index: 14,
            title: "肉燥飯",
            desc: "在地30年老店",
            class: '飯類',
            price: { M: 25, L: 35 }
        },
        {
            key: 15,
            index: 15,
            title: "瓜仔肉飯",
            desc: "在地30年老店",
            class: '飯類',
            price: { M: 25, L: 35 }
        },
        {
            key: 16,
            index: 16,
            title: "蛋花湯",
            desc: "在地30年老店",
            class: '湯類',
            price: { M: 20 }
        },
        {
            key: 17,
            index: 17,
            title: "榨菜肉絲湯",
            desc: "在地30年老店",
            class: '湯類',
            price: { M: 25 }
        },
        {
            key: 18,
            index: 18,
            title: "餛飩湯",
            desc: "在地30年老店",
            class: '湯類',
            price: { M: 30 }
        },
        {
            key: 19,
            index: 19,
            title: "酸辣湯",
            desc: "在地30年老店",
            class: '湯類',
            price: { M: 30 }
        },
        {
            key: 20,
            index: 20,
            title: "酸菜豬腸湯湯",
            desc: "在地30年老店",
            class: '湯類',
            price: { M: 30 }
        },
        {
            key: 21,
            index: 21,
            title: "海帶",
            desc: "在地30年老店",
            class: '小菜類',
            price: { M: 10 }
        },
        {
            key: 22,
            index: 22,
            title: "豆干",
            desc: "在地30年老店",
            class: '小菜類',
            price: { M: 5 }
        },
        {
            key: 23,
            index: 23,
            title: "豬耳朵",
            desc: "在地30年老店",
            class: '小菜類',
            price: { M: 30 }
        },
        {
            key: 24,
            index: 24,
            title: "豬頭皮",
            desc: "在地30年老店",
            class: '小菜類',
            price: { M: 30 }
        },
        {
            key: 25,
            index: 25,
            title: "豬肉水餃(一份10顆)",
            desc: "在地30年老店",
            class: '水餃類',
            price: { M: 50 }
        },
        {
            key: 26,
            index: 26,
            title: "韭菜水餃(一份10顆)",
            desc: "在地30年老店",
            class: '水餃類',
            price: { M: 50 }
        },
        {
            key: 27,
            index: 27,
            title: "牛肉水餃(一份10顆)",
            desc: "在地30年老店",
            class: '水餃類',
            price: { M: 70 }
        },
        {
            key: 28,
            index: 28,
            title: "冬瓜茶",
            desc: "在地30年老店",
            class: '冷飲類',
            price: { M: 20 }
        },
        {
            key: 29,
            index: 29,
            title: "麥茶",
            desc: "在地30年老店",
            class: '冷飲類',
            price: { M: 20 }
        },
        {
            key: 30,
            index: 30,
            title: "古早味紅茶",
            desc: "在地30年老店",
            class: '冷飲類',
            price: { M: 20 }
        },
    ],
    '台南牛肉湯': [
        {
            key: 1,
            index: 1,
            title: "牛肉湯",
            desc: "好吃牛肉店",
            class: '湯類',
            price: { M: 100, L: 150 }
        },
        {
            key: 2,
            index: 2,
            title: "牛腩湯",
            desc: "好吃牛肉店",
            class: '湯類',
            price: { M: 100 }
        },
        {
            key: 3,
            index: 3,
            title: "牛肝湯",
            desc: "好吃牛肉店",
            class: '湯類',
            price: { M: 100 }
        },
        {
            key: 4,
            index: 4,
            title: "麻油牛肉湯",
            desc: "好吃牛肉店",
            class: '湯類',
            price: { M: 150 }
        },
        {
            key: 5,
            index: 5,
            title: "芥蘭牛肉",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 110 }
        },
        {
            key: 6,
            index: 6,
            title: "苦瓜牛肉",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 110 }
        },
        {
            key: 7,
            index: 7,
            title: "青椒牛肉",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 110 }
        },
        {
            key: 8,
            index: 8,
            title: "炒麻油牛肉",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 150 }
        },
        {
            key: 9,
            index: 9,
            title: "炒麻油牛肝",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 110 }
        },
        {
            key: 10,
            index: 10,
            title: "蔥爆牛肉",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 110 }
        },
        {
            key: 11,
            index: 11,
            title: "炒青菜",
            desc: "好吃牛肉店",
            class: '炒類',
            price: { M: 50, L: 70 }
        },
        {
            key: 12,
            index: 12,
            title: "滷牛筋",
            desc: "好吃牛肉店",
            class: '小菜類',
            price: { M: 100 }
        },
        {
            key: 13,
            index: 13,
            title: "滷牛肚",
            desc: "好吃牛肉店",
            class: '小菜類',
            price: { M: 100 }
        },
        {
            key: 14,
            index: 14,
            title: "滷蛋",
            desc: "好吃牛肉店",
            class: '小菜類',
            price: { M: 10 }
        },
        {
            key: 15,
            index: 15,
            title: "油豆腐",
            desc: "好吃牛肉店",
            class: '小菜類',
            price: { M: 10 }
        },
        {
            key: 16,
            index: 16,
            title: "白飯",
            desc: "好吃牛肉店",
            class: '飯類',
            price: { M: 10 }
        },
        {
            key: 17,
            index: 17,
            title: "肉燥飯",
            desc: "好吃牛肉店",
            class: '飯類',
            price: { M: 30 }
        },
        {
            key: 18,
            index: 18,
            title: "紅燒牛肉燴飯",
            desc: "好吃牛肉店",
            class: '飯類',
            price: { M: 100 }
        },
        {
            key: 19,
            index: 19,
            title: "牛肉炒飯",
            desc: "好吃牛肉店",
            class: '飯類',
            price: { M: 100 }
        },
    ],
}



export default function MenuList() {
    const { token } = theme.useToken();
    const { initialState } = useModel('@@initialState');
    const tabsRef = useRef(null);

    const { orderList, setOrderList } = useModel('order')


    const [selectedRestaurant, setSelectedRestaurant] = useState(Object.keys(menu)[0])
    const [fixed, setFixed] = useState(false);
    const [tabsItem, setTabsItem] = useState([]);

    const [menuModalOpen, setMenuModalOpen] = useState(false)
    const [orderDrawerOpen, setOrderDrawerOpen] = useState(false)
    const [menuSelect, setMenuSelect] = useState({})
    const [orderListCount, setOrderListCount] = useState([])
    const orderModalForm = useRef()


    useEffect(() => {
        const tablist = menu[selectedRestaurant].map((item) => {
            return item.class
        })
        const tablistFilter = tablist.filter(function (element, index, arr) {
            return arr.indexOf(element) === index;
        });
        setTabsItem(tablistFilter)
        setOrderList([])
    }, [selectedRestaurant])


    useEffect(() => {
        const handleScroll = (window) => {
            const tabsElement = tabsRef && tabsRef.current?.offsetTop;
            // const rect = tabsElement.getBoundingClientRect();
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let isFixed = false
            if (isFixed) {
                isFixed = scrollTop - tabsElement >= tabsElement
            } else {
                isFixed = scrollTop >= tabsElement
            }
            // 判断Tabs是否超出屏幕顶部
            setFixed(isFixed);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (menuModalOpen && Object.keys(menuSelect).length !== 0) {
            console.log(menuSelect)
        }

    }, [menuSelect])

    const orderHandle = (values) => {
        const tempList = [...orderList]
        const { title, price, index } = menuSelect
        const { foodsize, foodcount, memo } = values
        // const findOldIndex = tempList.map((i) => i.title).indexOf(title)
        // if (findOldIndex >= 0) {
        //     const size = tempList[findOldIndex].hasOwnProperty(foodsize)
        //     console.log(size)
        //     const orderItem = {
        //         ...tempList[findOldIndex],
        //         memo,
        //         [foodsize]: size ? tempList[findOldIndex][foodsize] + foodcount : foodcount
        //     }
        //     tempList.splice(findOldIndex, 1, orderItem)
        // } else {
        //     const orderItem = {
        //         title, price, index,
        //         memo,
        //         [foodsize]: foodcount,
        //     }
        //     tempList.splice(0, 0, orderItem)
        // }
        const orderItem = {
            title, price, index,
            memo: memo ? memo : '無備註',
            size: foodsize,
            count: foodcount,
        }
        const keyHandle = [...tempList, orderItem].map((i, index) => {
            i.key = index
            return i
        })


        setOrderList(keyHandle)
        message.success(`${title}(${foodsize})已新增至購物車`)
        return true
    }

    // useEffect(() => {
    //     if (orderList.length !== 0) {
    //         const count = orderList.reduce((accumulator, currentValue) => {
    //             const M = currentValue.M ? currentValue.M : 0
    //             const L = currentValue.L ? currentValue.L : 0

    //             return accumulator + M + L
    //         }
    //             , 0)
    //         setOrderListCount(count)
    //     }

    // }, [orderList])

    const addOnHandle = (mode) => {
        const currentValue = orderModalForm.current.getFieldValue('foodcount')
        console.log(mode, currentValue)
        if (currentValue === 1 && mode === 'min') {
            return message.warning('數量不能為0')
        } else {
            const tempCount = mode === 'plus' ? currentValue + 1 : currentValue - 1
            orderModalForm.current.setFieldValue('foodcount', tempCount)
        }
    }

    return (

        <div>
            <div style={{
                display: 'flex',
                fontSize: '18px',
                color: token.colorTextSecondary,
                lineHeight: '22px',
                marginTop: 20,
                marginBottom: 0,
                // padding: '10px 40px 10px'
            }}>
                <p
                    style={{
                    }}
                >
                    請選擇餐廳
                </p>
                <Select
                    style={{ marginLeft: '10px', width: '180px' }}
                    options={
                        Object.keys(menu).map((item) => {
                            return {
                                label: item,
                                value: item
                            }
                        })
                    }
                    value={selectedRestaurant}
                    onChange={setSelectedRestaurant}
                />
            </div>
            <div ref={tabsRef}>
                <Tabs
                    tabBarGutter={20}
                    defaultActiveKey="0"
                    tabBarStyle={{ position: fixed ? 'sticky' : 'relative', top: fixed ? 55 : 0, zIndex: 999, backgroundColor: '#fafafa', opacity: 0.95, }}
                    items={tabsItem.map((tab, index) => {
                        const menuList = menu[selectedRestaurant].filter((i) => {
                            return i.class === tab
                        })

                        return (
                            {
                                label: tab,
                                key: index,
                                children:
                                    (<div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 16,
                                        }}
                                    >
                                        {menuList.map((item) => {
                                            const { key, index, price, title, desc } = item
                                            return (<InfoCard
                                                key={key}
                                                index={index}
                                                price={price}
                                                title={title}
                                                desc={desc}
                                                setMenuModalOpen={setMenuModalOpen}
                                                setMenuSelect={setMenuSelect}
                                            />)
                                        })}
                                    </div>)

                            }

                        )
                    })}
                >


                </Tabs>
            </div >

            {menuModalOpen && Object.keys(menuSelect).length !== 0 &&
                <ModalForm
                    formRef={orderModalForm}
                    open={menuModalOpen}
                    onOpenChange={setMenuModalOpen}
                    title={menuSelect.title}
                    onFinish={(values) => {
                        return orderHandle(values)

                    }}
                >
                    <ProFormRadio.Group
                        name='foodsize'
                        label='請選擇份量'
                        options={Object.keys(menuSelect.price).map((i, index) => {
                            console.log(i)
                            return {
                                key: index,
                                label: `${i} : $${menuSelect.price[i]}`,
                                value: i
                            }
                        })}
                        rules={[{ required: true, message: '請選擇份量!' }]}
                        initialValue={'M'}

                    />
                    <ProFormDigit
                        label="請選擇數量"
                        name='foodcount'
                        min={1}
                        initialValue={1}
                        rules={[{ required: true, message: '請選擇數量!' }]}
                        fieldProps={{
                            addonAfter: <PlusCircleTwoTone style={{ fontSize: 18 }} onClick={() => addOnHandle("plus")} />,
                            addonBefore: <MinusCircleTwoTone style={{ fontSize: 18 }} onClick={() => addOnHandle("min")} />,
                        }}
                        width={150}
                    />
                    <ProFormText
                        label="備註"
                        name='memo'
                    />
                </ModalForm>

            }

            <FloatButton
                style={{ width: '50px', height: '50px' }}
                // tooltip={<div>custom badge color</div>} 
                badge={{ count: orderList.length === 0 ? '' : orderList.length, color: 'red' }}
                onClick={() => {
                    if (orderList.length !== 0) {
                        setOrderDrawerOpen(true)
                    } else {
                        return message.warning('尚未選購餐點')
                    }

                }}
                icon={<ShoppingCartOutlined />}
            />
            <OrderConfirm setOrderDrawerOpen={setOrderDrawerOpen} orderDrawerOpen={orderDrawerOpen} selectedRestaurant={selectedRestaurant} />
        </div>
    )
}
