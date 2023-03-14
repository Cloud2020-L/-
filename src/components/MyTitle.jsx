import React from 'react';
// 标题组件
const MyTitle = (props) => {
    return (
        <div>
            <a className='table_title' href={'http://codesohigh.com:8765/article/6836' + props.id} target='_blank'>{props.title}</a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    );
};

export default MyTitle;