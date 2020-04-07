import React from "react";
import { Input, Button, message } from 'antd';
// socket
import IO from 'socket.io-client';

const { TextArea } = Input;

export default class PageChat extends React.PureComponent {

    socket = null

    state = {
        message: ''
    }

    componentDidMount() {
        this.connetListen();
    }

    componentWillUnmount() {
        console.log('卸载了', this.socket.close());
    }

    connetListen() {
        this.socket = IO.connect(`${window.location.origin}/chat`);
        this.socket.on('people-join', (data) => {
            message.info(data.message);
        });
        this.socket.on('response-all', (data) => {
            message.info(data.message);
        })
    }



    messageChange = (e) => {
        this.setState({ message: e.target.value });
    }

    sendMessage = () => {
        const { message } = this.state;
        this.socket.emit('one-request', { message });
    }

    render() {
        const { message } = this.state;
        return (
            <div className="page-chat">
                <TextArea value={message} onChange={this.messageChange} rows={4} />
                <Button type="primary" onClick={this.sendMessage}>发送</Button>
            </div>
        );
    }
}