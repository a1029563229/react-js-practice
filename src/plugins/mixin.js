export const CommonMixin = {
    cool_down: false,

    isEmpty(value) {
        return value === undefined || value === null
            || (typeof value === 'object' && Object.keys(value).length === 0)
            || (typeof value === 'string' && value.trim().length === 0)
    },

    onChangeHandler(e, form_data) {
        this.setState({
            [form_data]: {
                ...this.state[form_data],
                [e.target.name]: e.target.value
            }
        })
    },

    clearEmpty(obj) {
        let new_obj = {};
        for (let key in obj) {
            if (!this.isEmpty(obj[key])) {
                new_obj[key] = obj[key];
            }
        }
        delete new_obj.id;

        return new_obj;
    },

    disableBtn() {
        this.setState({
            cool_down: true
        });
    },

    enableBtn() {
        this.setState({
            cool_down: false
        });
    }
} 
