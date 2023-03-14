import React, { useEffect, useState } from 'react';
import './less/ListTable.less';
import { List, Skeleton, Pagination, Button, message } from 'antd';
import { ArticleListApi, ArticleDelApi } from '../request/Api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const ListList = () => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    // 总数据
    const [total, setTotal] = useState(0);
    // 当前页数
    const [current, setCurrent] = useState(1);
    // 每页要显示的条数
    const [pageSize, setPageSize] = useState(10);
    // state的回调函数是异步执行的

    // 添加一个删除变量
    const [updata, setUpdata] = useState(1)


    // 请求封装
    const getList = (num) => {
        ArticleListApi({
            num,
            count: pageSize
        }).then(res => {
            // 请求成功
            if (res.errCode === 0) {
                // 结构出来想要的属性
                const { arr, count, num, total } = res.data;
                // 把数组设置成state
                setList(arr);

                setTotal(total);
                setCurrent(num);
                setPageSize(count);
            }
        })
    }

    // 请求列表数据
    useEffect(() => {
        getList(current);
    }, [updata]);

    // 分页
    const myPager = (pages) => {
        console.log(pages);
        getList(pages)
    }

    // 删除按钮的回调函数
    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            console.log(res);
            if (res.errCode === 0) {
                message.success(res.message);
                // 删除成功，重新刷新页面
                setUpdata(updata + 1);
            }
        })

    }


    return (
        <div className='list_table' style={{ padding: '20px' }}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type='primary' onClick={() => navigate('/edit/' + item.id)}>编辑</Button>,
                            <Button type='danger' onClick={() => delFn(item.id)}>删除</Button>
                        ]}
                    >
                        {/* loading={false}关闭骨架屏 */}
                        <Skeleton loading={false} avatar title={false} active>
                            <List.Item.Meta
                                title={<a href="#">{item.title}</a>}
                                description={item.subTitle}
                            />
                            <div>{moment(item.date).format('YYYY-MM-DD hh-mm-ss')}</div>
                        </Skeleton>
                    </List.Item>
                )
                }
            />
            {/* 分页器 */}
            <Pagination style={{ float: 'right', marginTop: '20px' }} onChange={myPager} total={total} current={current} pageSize={pageSize} />
        </div >
    );
};

export default ListList;