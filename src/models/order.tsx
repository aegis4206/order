import { useState, useCallback, useEffect } from 'react';

export default () => {
    const [counter, setCounter] = useState(0);
    const increment = useCallback(() => setCounter((c) => c + 1), []);
    const decrement = useCallback(() => setCounter((c) => c - 1), []);

    const [orderList, setOrderList] = useState([]);
    const [orderSubmitList, setOrderSubmitList] = useState([]);


    


    return { counter, increment, decrement, orderList, setOrderList, orderSubmitList, setOrderSubmitList };
};