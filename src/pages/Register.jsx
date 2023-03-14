import React from 'react';
import { Button, Form, Input, message } from 'antd';
import './less/Login.less';
import logoImg from '../assets/login.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi } from '../request/Api';

const Register = () => {
    // 跳转
    const navigate = useNavigate();
    // 成功函数
    const onFinish = (values) => {
        console.log('Success:', values);
        const pormis = RegisterApi({ // 注意跨域
            username: values.username,
            password: values.password
        })
        pormis.then(res => {
            console.log(res);
            // 判断注册成功之后的逻辑
            if (res.errCode === 0) {
                message.success(res.message);
                // 实现注册成功跳转登录页
                setTimeout(() => navigate('/login'), 1500)
            } else {
                message.error(res.message);
            }
        })
    };
    // 失败函数
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        // 外部大容器
        <div className='login'>
            {/* 表单容器 */}
            <div className='login_box'>
                <img src={logoImg} alt="" />
                {/* 表单 */}
                <Form
                    name="basic"

                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* 用户名inp */}
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

                    {/* 密码inp */}
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

                    {/* 再次输入密码inp */}
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请输入相同密码！'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' prefix={<LockOutlined />} placeholder='请再次确认密码' />
                    </Form.Item>

                    {/* 登录链接*/}
                    <Form.Item>
                        <Link to='/login'>已有账号？立即登录</Link>
                    </Form.Item>

                    {/* 注册按钮 */}
                    <Form.Item>
                        <Button size='large' type="primary" htmlType="submit" block>立即注册</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;