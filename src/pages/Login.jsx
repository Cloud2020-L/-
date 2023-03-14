import React from 'react';
import { Button, Form, Input, message } from 'antd';
import './less/Login.less';
import logoImg from '../assets/login.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../request/Api';

const Login = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        LoginApi({
            username: values.username,
            password: values.password
        }).then(res => {
            console.log(res);
            if (res.errCode === 0) {
                // 登录成功
                message.success(res.message);

                // 拿到成功返回的数据之后就要存储到本地
                localStorage.setItem('avatar', res.data.avatar); // 存储头像
                localStorage.setItem('cms-token', res.data['cms-token']); // 存储登录账号的token 相当于账号的身份证
                localStorage.setItem('editable', res.data.editable); // 存储编辑权限
                localStorage.setItem('player', res.data.player); // 存储登录账号是什么角色，是管理员还是普通用户
                localStorage.setItem('username', res.data.username); // 存储登录账号的用户名

                // 登录成功跳到根路径
                navigate('/');
            } else {
                // 登录失败
                message.error(res.message);
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <div className='login_box'>
                <img src={logoImg} alt="" />
                <Form
                    name="basic"

                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ]}
                    >
                        <Input size='large' prefix={<UserOutlined />} placeholder='请输入用户名' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    >
                        <Input.Password size='large' prefix={<LockOutlined />} placeholder='请输入密码' />
                    </Form.Item>

                    <Form.Item>
                        <Link to='/register'>还没账号？立即注册</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' type="primary" htmlType="submit" block>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;