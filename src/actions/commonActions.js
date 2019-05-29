import { UPLOAD_FILE } from "./types";
import { message } from "antd";
import axios from "../plugins/axios";

export const uploadFile = file => dispatch => {
    let form_data = new FormData();
    form_data.append(file.filename || 'filename', file.file || file);
    axios.post("common/upload",
        form_data,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(data => {
            dispatch({
                type: UPLOAD_FILE,
                payload: data.url
            })
        })
        .catch(reason => {
            message.error(reason.data.msg);
        });
}