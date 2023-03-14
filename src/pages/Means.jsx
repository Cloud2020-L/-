import React, { useEffect, useState } from 'react';
import './less/Means.less';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import { GetUserDataApi, ChangUserDataApi } from '../request/Api';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

// 上传前的回调函数
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 / 1024 < 2; // 限制一张图片的大小 图片大小只能是200kb
    if (!isLt2M) {
        message.error('请上传小于200kb的图!');
    }
    return isJpgOrPng && isLt2M;
};
const Means = () => {
    // 存储返回的用户数据
    // const [username1, setUsername1] = useState('');
    // const [password1, setPassword1] = useState('');
    useEffect(() => {
        // 发送请求获取用户数据
        GetUserDataApi().then(res => {
            // console.log(res);
            if (res.errCode === 0) {
                message.success(res.message);
                // 不生效显示的原因是State的回调函数是异步请求
                // setUsername1(res.data.username);
                // setPassword1(res.data.password)

                // 把获取到的用户名存储到浏览器的内存中
                sessionStorage.setItem('username', res.data.username);
            }
        })
    }, []);

    // 提交表单的事件
    const onFinish = (values) => {
        console.log(values);
        // 如果表单的username有值，并且不等于初始化拿到的username，同时密码非空，因为我们要做的是修改资料
        if (values.username && values.username !== sessionStorage.getItem('username') && values.password.trim() !== '') {
            // 做提交表单
            ChangUserDataApi({
                username: values.username,
                password: values.password
            }).then(res => {
                console.log(res);
            })
        }
    }

    // 上传头像
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        // 正在上传
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // 上传完成
        if (info.file.status === 'done') {
            console.log(info.file.response.data.filePath);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                // 存储用户上传的头像
                localStorage.setItem('avatar', info.file.response.data.filePath)
            });
        }
    };

    // 上传按钮
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <div className='means'>
            <Form
                style={{ width: '400px' }}
                onFinish={onFinish}
                name="basic"
                // initialValues={{
                //     username: username1,
                //     password: password1
                // }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="修改用户名"
                    name="username"
                    rules={[
                        {
                            // required: true,
                            message: '请输入新的用户名!',
                        },
                    ]}
                >
                    <Input placeholder='请输入新的用户名' />
                </Form.Item>

                <Form.Item
                    label="修 改 密 码"
                    name="password"
                    rules={[
                        {
                            // required: true,
                            message: '请输入新的用户密码!',
                        },
                    ]}
                >
                    <Input.Password placeholder='请输入新的密码' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>提交</Button>
                </Form.Item>
            </Form>

            <p>点击下方修改组件：</p>
            <Upload
                // 后端上传头像接口的对应属性
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                // 多图上传列表
                showUploadList={false}
                // 后端上传头像的接口地址
                action="/api/upload"
                // 上传前的操作
                beforeUpload={beforeUpload}
                onChange={handleChange}
                // 携带用户
                headers={{ 'cms-token': localStorage.getItem('cms-token') }}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </div >
    );
};

export default Means;