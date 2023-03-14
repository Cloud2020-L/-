import React, { useEffect, useState } from 'react';
import './less/ListTable.less';
import { Space, Table, Button, message } from 'antd';
import { ArticleListApi, ArticleDelApi } from '../request/Api';
import moment from 'moment';
import MyTitle from '../components/MyTitle';
import { useNavigate } from 'react-router-dom';



const ListTable = () => {
    // 分页
    const [mypagination, setMypagination] = useState({
        // current：第几页 pageSize：一页显示多少条数据 total：一页请求数据的总数
        current: 1,
        pageSize: 10,
        total: 0
    })
    const navigate = useNavigate();

    // 提取请求的代码
    const getArticleListApi = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                // console.log(res.data);

                // 修改pagination
                let { count, num, total } = res.data;
                setMypagination({
                    current: num,
                    pageSize: count,
                    total
                });

                // 复制拷贝后端请求返回的原数组
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                // 声明一个空数组
                let myarr = [];
                // 1. 渲染Table列表数据结构得需要一个key属性，所以我们要把newArr里面的每个元素添加一项key，让key=id
                // 2.需要有一套标签结构，赋予一个属性
                newArr.map(item => {
                    //     item.key = item.id;
                    //     // 修改原数组里面的每个元素的date
                    //     item.date = moment(item.date).format('YYYY-MM-DD hh:mm:ss');
                    //     item.mytitle = `
                    //     <div>
                    //         <Link className='table_title' to='/'>${item.title}</Link>
                    //         <p style={{ color: '#999' }}>${item.subTitle}</p>
                    //     </div>
                    // `;

                    // 每循环遍历一个元素就创建一个obj对象，并把想要的属性赋值上去
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
                        mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle}></MyTitle>
                    }
                    // 把创建的每个对象赋值到新数组里面
                    myarr.push(obj)
                });
                // 把新数组放进state中
                setArr(myarr);
                // console.log(myarr);
            }
        })
    };

    // 删除按钮的回调函数
    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            console.log(res);
            if (res.errCode === 0) {
                message.success(res.message);
                // 删除成功，重新刷新页面
                getArticleListApi(1, mypagination.pageSize);
            }
        })

    }

    // 请求回来的数据
    useEffect(() => {
        // 页面渲染完毕调用请求代码
        getArticleListApi(mypagination.current, mypagination.pageSize);
    }, [])

    // 要真正从后端拿数据，替换掉这个data数组
    const [arr, setArr] = useState([]);

    // 列的头部
    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '67%',
            // text就是key获取对应属性的值
            render: (text) => (
                // dangerouslySetInnerHTML 注入标签 比较危险不建议使用
                // <div dangerouslySetInnerHTML={{ __html: text }} >
                //     {/* {text} */}
                // </div >
                <div>
                    {text}
                </div>
            ),
        },
        {
            dataIndex: 'date',
            key: 'date',
            // text 存的就是数组元素里面date的值
            render: (text) => (
                <div>
                    {text}
                </div>
            ),
        },
        {
            key: 'action',
            render: (record) => {
                // console.log(record);
                return (
                    <Space size="middle" >
                        <Button type='primary' onClick={() => navigate('/edit/' + record.key)}>编辑</Button>
                        <Button type='danger' onClick={() => delFn(record.key)}>删除</Button>
                    </Space >
                )
            },
        },
    ];

    // 获取onChange事件函数中的分页对象，控制一个表格显示多少条数据
    const pageChange = (pagination) => {
        // console.log(123);
        // 拿到分页对象
        console.log(pagination);
        getArticleListApi(pagination.current, pagination.pageSize);
    }


    return (
        <div className='list_table'>
            {/* columns 列    dataSource数据  showHeader是否显示表头，传的是布尔值*/}
            <Table
                showHeader={false}
                columns={columns}
                dataSource={arr}
                onChange={pageChange}
                pagination={mypagination}
            />
        </div>
    );
};

export default ListTable;


