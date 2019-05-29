import { LOGIN_BY_EMAIL, UPDATE_USER_INFO, PULL_USER_INFO } from "./types";
import { message } from "antd";
import axios from "../plugins/axios";

export const loginByEmail = (email, password) => dispatch => {
    axios.post("users/login", {
        email,
        password
    })
        .then((data) => {
            dispatch({
                type: LOGIN_BY_EMAIL,
                payload: data.token
            });
        })
        .catch(reason => {
            console.error(reason);
            if (reason.status === 400) {
                message.error(reason.data.msg);
            } else if (reason.status === 500) {
                message.error(reason.data.msg);
            }
        });
}

export const getUserInfo = props => dispatch => {
    axios.get("users/current")
        .then(user_info => {
            dispatch({
                type: UPDATE_USER_INFO,
                payload: user_info
            })
        })
        .catch(reason => {
            if (reason.status === 401) {
                props.history.push("/login");
                message.warning("请登录您的账号");
                localStorage.removeItem("token");
            }
        });
}

export const updateUserInfo = user_info => dispatch => {
    axios
        .put(`users/register/${user_info.id}`, user_info)
        .then(user_info => {
            message.success("修改成功");
            dispatch({
                type: UPDATE_USER_INFO,
                payload: user_info
            })
        })
        .catch(reason => {
            message.error(reason.data.msg);
        });
}

export const pullUserInfo = () => dispatch => {
    dispatch({
        type: PULL_USER_INFO,
        payload: null
    })
}