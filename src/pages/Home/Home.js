import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux"
import { getUserInfo } from "../../actions/userActions";
import { Switch, Route } from "react-router-dom";
import Main from "./Main/Main";
import UpdateUser from "./UpdateUser/UpdateUser";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: {}
        }
    }

    componentDidMount() {
        this.props.getUserInfo(this.props);
    }

    componentWillReceiveProps(props) {
        let user_info = props.user_info;
        this.setState({
            user_info
        });
    }

    render() {
        let path_name = this.props.location.pathname;

        return (
            <section className="home">
                <div className="navigator">
                    <div className="user-info-wrapper">
                        <img className="avatar" src={this.state.user_info.avatar} alt="" />
                        <div className="user-info">
                            <h2>{this.state.user_info.name}</h2>
                            <p>{this.state.user_info.email}</p>
                        </div>
                    </div>
                    <div className="settings-bar">
                        {path_name !== '/home/main' && <p onClick={() => this.props.history.push('/home/main')}>回到首页 &gt;&gt;</p>}
                        {path_name !== '/home/update' && <p onClick={() => this.props.history.push('/home/update')}>账号设置 &gt;&gt;</p>}
                    </div>
                </div >
                <div className="content-wrapper">
                    <Switch>
                        <Route path="/home/main" component={Main} />
                        <Route path="/home/update" component={UpdateUser} />
                    </Switch>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user_info: state.user.user_info
})

export default connect(mapStateToProps, { getUserInfo })(Home);