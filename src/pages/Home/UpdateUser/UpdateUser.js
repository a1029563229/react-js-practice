import React, { Component } from "react";
import "./UpdateUser.css";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import { updateUserInfo, pullUserInfo } from "../../../actions/userActions";
import { uploadFile } from "../../../actions/commonActions";
import { CommonMixin } from "../../../plugins/mixin";
import { mixin } from 'lodash-decorators';

@mixin(CommonMixin)
class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: {}
        };
    }

    componentDidMount() {
        this.props.pullUserInfo();
    }

    componentWillReceiveProps(props) {
        this.enableBtn.call(this);
        let user_info = props.user_info;
        let file = props.file;

        if (!this.isEmpty(user_info)) {
            this.setState({
                user_info
            });
        } else {
            this.props.getUserInfo(this.props);
        }

        if (file) {
            this.setState({
                user_info: Object.assign({}, this.state.user_info, { avatar: file })
            });
        }
    }

    componentDidUpdate() {
        let file = document.getElementById("file");
        if (file.has_event) return true;

        file.has_event = true;
        file.addEventListener(
            "change",
            (e) => {
                let file = e.target.files[0];
                this.props.uploadFile(file);
            },
            false
        );
        return true;
    }

    _selectAvatar = () => {
        let file = document.getElementById("file");
        file.click();
    }

    _updateUserInfo = () => {
        if (this.state.cool_down) return;
        this.disableBtn.call(this);
        this.props.updateUserInfo(this.state.user_info);
    }

    render() {
        const style = {
            display: "none"
        }
        let content = this.state.user_info.name
            ? <div ref="form" className="el-form update-form">
                <div className="el-form-item">
                    <Input name="name" className="el-input" defaultValue={this.state.user_info.name} placeholder="昵称" type="text" onChange={e => this.onChangeHandler(e, 'user_info')} />
                </div>
                <div className="el-form-item">
                    <Input name="password" className="el-input" defaultValue={this.state.user_info.password} placeholder="新密码" type="password" onChange={e => this.onChangeHandler(e, 'user_info')} />
                </div>
                <div className="el-form-item">
                    <Input name="re_password" className="el-input" defaultValue={this.state.user_info.re_password} placeholder="重复密码" type="password" onChange={e => this.onChangeHandler(e, 'user_info')} />
                </div>
                <div className="el-form-item">
                    <Button className="el-button" type="primary" onClick={this._updateUserInfo} disabled={this.state.cool_down}>更新资料</Button>
                </div>
            </div>
            : null

        return (
            <section className="update-user">
                <div className="title">Update user</div>
                <div>
                    <img className="avatar" src={this.state.user_info.avatar} alt="" onClick={this._selectAvatar} />
                    <input style={style} id="file" type="file" />
                    {content}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user_info: state.user.user_info,
    file: state.common.file
})

export default connect(mapStateToProps, { pullUserInfo, updateUserInfo, uploadFile })(UpdateUser);