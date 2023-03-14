import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

const Bread = () => {
    // 存储当前路由的名字
    const [breadName, setBreadName] = useState();

    // 获取当前路由
    const { pathname } = useLocation();
    // console.log(pathname);

    // 每次变化时的路由
    useEffect(() => {
        // 如果当前的路由等于pathname 变化的路由
        switch (pathname) {
            case '/listlist':
                setBreadName('查看文章列表List');
                break;
            case '/listtable':
                setBreadName('查看文章列表Table');
                break;
            case '/edit':
                setBreadName('文章编辑');
                break;
            case '/means':
                setBreadName('修改资料');
                break;
            default:
                setBreadName(pathname.includes('edit') ? '文章编辑' : '')
                break;
        }
    }, [pathname])

    return (
        <Breadcrumb style={{ height: '30px', lineHeight: '30px' }}>
            {/* 图标 */}
            <Breadcrumb.Item href='/' >
                <HomeOutlined />
            </Breadcrumb.Item>
            {/* 显示的页面 */}
            <Breadcrumb.Item >{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default Bread;