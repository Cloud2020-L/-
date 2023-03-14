import React from 'react';
import './assets/base.less';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Asider from './components/Asider';
import Bread from './components/Bread';

const App = () => {
    return (
        <Layout id='app'>
            {/* 头部导航 */}
            <Header></Header>
            {/* 中间内容 */}
            <div className='container'>
                {/* 左部导航菜单 */}
                <Asider></Asider>
                {/* 显示的主要内容 */}
                <div className='container_box'>
                    {/* 面包屑 */}
                    <Bread></Bread>
                    <div className='container_content'>
                        {/* 子级路由 */}
                        <Outlet></Outlet>
                    </div>
                </div>

            </div>
            {/* 底部文字 */}
            <footer>Respect | Copyright &copy; 2022 Author clouds~</footer>
        </Layout>

    );
};

export default App;