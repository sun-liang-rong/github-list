import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
	state = {
		users: [],
		IsWelcome: true,
		IsLogin: false,
		IsError: ''

	}
	componentDidMount() {
		this.msgid = PubSub.subscribe('message', (_, data) => {
			this.setState(data)
		})
	}
	componentWillUnmount() {
		PubSub.unsubscribe(this.msgid)
	}
	render() {
		//解构赋值将this.state里面的所有属性都解析出来
		const { users, IsWelcome, IsLogin, IsError } = this.state
		return (
			<div className="row">
				{IsWelcome ? <h1>欢迎光临</h1> :
					IsLogin ? <h1>加载中请稍等</h1> :
						IsError ? <h1>{IsError.error}</h1> :
							users.map((obj) => {
								return (
									<div className="card" key={obj.id}>
										<a href={obj.html_url} target="_blank" rel="noreferrer">
											<img alt="pic" src={obj.avatar_url} style={{ width: '100px' }} />
										</a>
										<p className="card-text">{obj.login}</p>
									</div>)
							})

				}
			</div>
		)
	}
}
