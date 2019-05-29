import React, { Component } from "react";
import Validator from "validator";
import { message } from "antd";
import { connect } from "react-redux";
import { loginByEmail } from "../../actions/userActions";
import "./Login.css";
import axios from "../../plugins/axios";
import { mixin } from "lodash-decorators";
import { CommonMixin } from "../../plugins/mixin";

@mixin(CommonMixin)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: {
                email: "",
                password: ""
            }
        }
    }

    componentWillReceiveProps(props) {
        let token = props.token;
        if (token) {
            this._loginSuccessHandler(token);
        }
    }

    _loginSuccessHandler = token => {
        localStorage.token = token;
        axios.defaults.headers = {
            Authorization: localStorage.token
        };
        message.success("登录成功");
        this.props.history.push("/home/main");
    }

    login = () => {
        let email = this.state.form_data.email;
        let password = this.state.form_data.password;
        if (!Validator.isEmail(email)) {
            message.warning("邮箱格式错误");
            return;
        }

        if (!Validator.isLength(password, { min: 6, max: 30 })) {
            message.warning("密码格式错误");
            return;
        }

        this.props.loginByEmail(email, password);
    }

    keyUpHandler = e => {
        if (e.keyCode === 13) {
            this.login();
        }
    }

    render() {
        return (
            <section className="login-wrapper">
                <form>
                    <h1>LOGIN</h1>
                    <div className="form-group">
                        <div className="form-item">
                            <div>EMAIL</div>
                            <input name="email"
                                defaultValue={this.state.form_data.email}
                                onChange={e => this.onChangeHandler(e, 'form_data')}
                                type="email"
                                placeholder="YOUR EMAIL" />
                        </div>
                        <div className="form-item">
                            <div>PASSWORD</div>
                            <input
                                name="password"
                                defaultValue={this.state.form_data.password}
                                onChange={e => this.onChangeHandler(e, 'form_data')}
                                type="password"
                                placeholder="YOUR PASSWORD"
                                onKeyUp={this.keyUpHandler} />
                        </div>
                    </div>
                    <button type="button" onClick={this.login}>
                        <div>
                            <span>LOGIN</span>
                            <img src="~assets/images/common/icon_star.png" alt="" />
                        </div>
                    </button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token
});

export default connect(mapStateToProps, { loginByEmail })(Login);