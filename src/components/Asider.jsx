// 侧边栏组件
import { CopyOutlined, ReadOutlined, EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
// 引入路由
import { useNavigate, useLocation } from 'react-router-dom';

// 列表项需要传递的值
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// 渲染每个列表项
const items = [
    getItem('查看文章列表List', 'listlist', <ReadOutlined />),
    getItem('查看文章列表Table', 'listtable', <ReadOutlined />),
    getItem('文章编辑', 'edit', <EditOutlined />),
    getItem('修改资料', 'means', <CopyOutlined />)
];

const Asider = () => {
    // 引入路由
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 获取当前页面的地址
        let path = location.pathname;
        // 把这个地址去掉斜杠,返回的是一个数组所以直接选中
        let key = path.split('/')[1];
        setCurrent(key);
    }, [location.pathname]);

    // 存储侧边栏主题
    const [theme, setTheme] = useState('dark');

    // 默认选中哪个列表项
    const [current, setCurrent] = useState('');

    // e 拿到的是列表项的整个对象
    const onClick = (e) => {
        // console.log('click ', e.key);
        navigate(`/${e.key}`)
        setCurrent(e.key)
    };

    return (
        <Menu
            theme={theme}
            onClick={onClick}
            // 侧边栏宽度
            style={{
                width: 200,
            }}
            className='aside'
            // 默认选中的key,就是选中的列表项
            selectedKeys={[current]}
            mode="inline"
            items={items}
        />
    );
};

export default Asider;