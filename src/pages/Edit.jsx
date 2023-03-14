import React, { useEffect, useState } from 'react';
import { Button, PageHeader, Modal, Form, Input, message } from 'antd';
import moment from 'moment';
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/Api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// 富文本编辑器
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';



const Edit = () => {
    // 获取路径id
    const params = useParams();
    // console.log(params);

    // 获取当前页面的地址信息
    const location = useLocation();

    // editor 实例
    const [editor, setEditor] = useState(null);
    // 编辑器内容
    const [html, setHtml] = useState('<p></p>');

    // 渲染文章标题
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    // 路径跳转
    const navigate = useNavigate();

    // 请求成功后的提示框函数
    const delData = (errCode, msg) => {
        // 关闭对话框
        setIsModalOpen(false);
        if (errCode === 0) {
            // console.log(res);
            // 设置修改成功的提示框
            message.success(msg);
            setTitle(() => {
                navigate('/listlist');
            }, 1500)
        } else {
            // token过期的提示框
            message.error(msg);
        }
    };

    // 对话框变量
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    // 提交对话框
    const handleOk = () => { // 确认按钮的回调
        form
            .validateFields() // 校验inp框里的字段，如果正确就proims的状态就改为成功，并获取成功状态的值
            .then((values) => {
                // form.resetFields(); // 重置inp框中的内容
                // console.log(values);
                let { title, subTitle } = values;
                // console.log(html);

                // 判断地址栏有没有id，有就是更新一篇文章，没有就是添加一篇文章
                if (params.id) {
                    // 发送请求更新一篇文章
                    ArticleUpdateApi({ title, subTitle, content: html, id: params.id })
                        .then(res => {
                            delData(res.errCode, res.message);
                        })
                } else {
                    // 发送请求,添加一篇文章
                    ArticleAddApi({ title, subTitle, content: html })
                        .then(res => {
                            // console.log(res);
                            delData(res.errCode, res.message);
                        })
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        // 根据地址栏id做请求
        if (params.id) {
            ArticleSearchApi({ id: params.id }).then(res => {
                console.log(res);
                // 判断请求是否成功
                if (res.errCode === 0) {
                    // 结构获取文章数据
                    let { content } = res.data;
                    setHtml(content)
                    // editor.txt.html(res.data.content)
                    // 设置默认文章标题
                    setTitle(res.data.title);
                    setSubTitle(res.data.subtitle);
                }
            })
        } else {
            setHtml('');
            setTitle('');
            setSubTitle('');
        }
    }, [location.pathname])

    // 工具栏配置
    const toolbarConfig = {}
    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div>
            {/* 头部 */}
            <PageHeader
                ghost={false}
                onBack={params.id ? () => window.history.back() : null}
                title="文章编辑"
                subTitle={"当前日期：" + moment(new Date()).format('YYYY-MM-DD')}
                extra={<Button key="1" type="primary" onClick={() => setIsModalOpen(true)}>提交文章</Button>}
            >
            </PageHeader>

            {/* 引入如文本编辑器 */}
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>

            {/* 提交对话框 */}
            {/* onOk 提交按钮的回调  onCancel 取消按钮的回调 */}
            <Modal title="请填写文章标题" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} okText='提交' cancelText='取消'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 21,
                    }}
                    // 是否自动联想补全
                    autoComplete="off"
                    // 设置默认值
                    initialValues={{ title, subTitle }}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请填写标题!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="副标题"
                        name="subTitle"
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div >
    );
};

export default Edit;