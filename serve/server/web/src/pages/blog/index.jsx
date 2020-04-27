import React from 'react';
import { Button } from 'antd';
import marked from 'marked';

import './style.css';

export default class PageBlog extends React.PureComponent {

    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            article: ''
        };
    }

    onEdit = (e) => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        const article = e.target.value;
        console.log('article', article.indexOf('\/n'));
        this.timer = setTimeout(() => {
            this.setState({ article });
        }, 500);
    };

    onSubmitArticle = () => {
        console.log(this.state.article);
    };

    render() {
        const { article } = this.state;
        return (
            <div className="page-blog">
                <div className="page-blog-operate">我是操作区
                    <Button type="primary" onClick={this.onSubmitArticle}>提交</Button>
                </div>
                <div className="page-blog-content">
                    <div className="page-blog-edit">
                        <textarea className="edit-box" onInput={this.onEdit}></textarea>
                    </div>
                    <div className="page-blog-view" dangerouslySetInnerHTML={{ __html: marked(article) }} /> 
                </div>
            </div>
        );
    }
}