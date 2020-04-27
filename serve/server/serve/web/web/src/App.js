// page
import { PageGraph, PageChat, PageBlog } from './pages';

import React from "react";
import {
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import 'antd/dist/antd.css';
import "./App.css";

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: window.location.pathname
    }
  }

  onNavActivite = ({ key }) => {
    this.setState({ currentLocation: key });
  }

  render() {
    console.log('location');
    return (
      <Layout className="app">
        <Header>
          <div className="logo" />
          <Menu className="app-nav" theme="dark" mode="horizontal" onSelect={this.onNavActivite} selectedKeys={this.state.currentLocation}>
            <Menu.Item key="/chat">
              <NavLink to="/chat">聊天</NavLink>
            </Menu.Item>
            <Menu.Item key="/graph">
              <NavLink to="/graph">可视化</NavLink>
            </Menu.Item>
            <Menu.Item key="/blog">
              <NavLink to="/blog">博客编辑</NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/">
                <div>我是首页</div>
                <Redirect to={{ pathname: '/chat', state: { from: 'home' } }}></Redirect>
              </Route>
              <Route path="/chat">
                <PageChat />
              </Route>
              <Route path="/graph">
                <PageGraph />
              </Route>
              <Route path="/blog">
                <PageBlog />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <footer className="app-footer" key="footer">
            <a className="keep-on-record" href="http://www.beian.miit.gov.cn/" target="_blank">京ICP备19051314号-1</a>
          </footer>
        </Footer>
      </Layout>
    );
  }
}

export default App;
