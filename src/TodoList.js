import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List} from 'antd';
import store from './store/index.js';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    render() {
        return (
        <div style={{marginTop: '10px',marginLeft: '10px'}}>
            <div>
                <Input 
                value = {this.state.inputValue} 
                placeholder='todo info' 
                style={{width : '300px',marginRight: '10px'}}
                onChange = {this.handleInputChange}
                />
                <Button type="primary">提交</Button>
            </div>
            <List
                style={{ marginTop: '10px', width: '300px' }}
                bordered
                dataSource={this.state.list}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </div>
        )
    }
    handleInputChange(e) {
        const action = {
            type: 'change_input_value', //描述要做什么事情
            value: e.target.value
        }
        store.dispatch(action);
        console.log(e.target.value);
    }

    handleStoreChange() {
        this.setState(store.getState());
        console.log('store changed');
    }
}

export default TodoList;