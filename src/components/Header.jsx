// 头部组件
import React, { useEffect, useState } from 'react';
import LogoImg from '../assets/login.png';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';
import touXiang from '../assets/touxiang3.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    // 因为每个人的头像不是固定的，所以设置为state
    const [avatar, setAvatar] = useState(touXiang);

    // 存储名字
    const [username, setUsername] = useState('游客');

    // 使用用户设置的名字
    useEffect(() => {
        // 获取本地存储的用户名
        let username1 = localStorage.getItem('username');
        // 获取本地存储的头像
        let avatar1 = localStorage.getItem('avatar');
        // 判断本地是否有用户名
        if (username1) {
            setUsername(username1);
        }
        // 判断本地是否有头像
        if (avatar1) {
            // http://47.93.114.103:6688/
            setAvatar('http://47.93.114.103:6688/' + avatar1)
        }

    }, [localStorage.getItem('avatar')]);

    // 退出登录
    const logout = () => {
        localStorage.clear() // 清除localStorage中的数据
        message.success('退出成功，即将返回登录页')
        setTimeout(() => navigate('/login'), 1500)
    }

    const menu = (
        <Menu
            items={[
                {
                    // 每一项内容
                    key: '1',
                    label: (
                        <div>修改资料</div>
                    ),
                },
                {
                    // 分界线
                    type: 'divider',
                },
                {
                    key: '2',
                    label: (
                        <div onClick={logout}>退出登录</div>
                    ),
                },
            ]}
        />
    );
    return (
        <header>
            <img className='logo' src={LogoImg}></img>
            <div className='right'>
                <Dropdown overlay={menu}>
                    <a className='aLink' onClick={e => e.preventDefault()}>
                        <Space>
                            {/* 头像 */}
                            <img src={avatar} className='avatar'></img>

                            {/* 用户名 */}
                            <span>{username}</span>

                            {/* 图标字体 */}
                            <CaretDownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;