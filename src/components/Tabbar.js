import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import './Tabbar.css'

export default class Tabbar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to="/home">
                            <Button type="primary" size={'large'}>
                                主页
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order">
                            <Button type="primary" size={'large'}>
                                菜单
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/center">
                            <Button type="primary" size={'large'} style={{backgroundImage: {src: "./img/button_background.png"}}}>
                                我的
                            </Button>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
