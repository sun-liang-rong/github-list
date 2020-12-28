import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {
	keyWord = React.createRef()
	search = () => {
		//获得输入框里的值
		const { value } = this.keyWord.current
		//判断输入框里的值是否合理
		if (!value.trim()) return alert('请不要输入空值')
		//进去是出现欢迎界面只出现一次  当搜索按钮按下欢迎界面消失出现请等待画面
		//  当数据返回时请等待界面消失出现数据列表 
		//当出现错误时显示错误
		PubSub.publish('message', { IsWelcome: false, IsLogin: true })
		axios.get(`/search/users?q=${value}`).then(
			response => {
				console.log(response.data.items);
				const { items } = response.data
				PubSub.publish('message', { users: items, IsLogin: false })
			},
			error => {
				console.log(error);
				PubSub.publish('message', { IsLogin: false, IsError: error })
			}
		)

	}
	render() {

		return (
			<section className="jumbotron">
				<h3 className="jumbotron-heading">github用户搜索</h3>
				<div>
					<input type="text" placeholder="请输入搜索关键词" ref={this.keyWord} />&nbsp;
					<button onClick={this.search}>搜索</button>
				</div>
			</section>
		)
	}
}
