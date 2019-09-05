import React from 'react';
import PropTypes from 'prop-types';



class EditTodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: true,
            word: this.props.todoItem
        };
        this.validate=this.validate.bind(this);
        this.updateItem=this.updateItem.bind(this);
    }
    validate(event) {
        let value = event.target.value;
        let validated = false;
        this.setState({word:value});
        if (value.length <= 0 || value.length > 50) {
            validated = false;
        } else {
            validated = true;
        }
        this.setState({
            validated: validated
        })
    }
    updateItem(event){
        event.preventDefault();
        if (this.state.validated) {
            this.props.updateItem(event, this.props.index, this.state.word)
        }
    }
    render(){
        let errorMessage = null;
        if (!this.state.validated) {
            errorMessage = <div role="alert">
                field must not be empty and must be &lt; 50 characters
            </div>
        } else {
            errorMessage = null;
        }
        return (
            <form className="edit-form">
                <input type="text" value={this.state.word} onChange={this.validate}></input>
                <button type="submit" onClick={this.updateItem}>Update</button>
                {errorMessage}
            </form>
        )
    }
}


export default EditTodoItem;


EditTodoItem.propTypes = {
  todoItem: PropTypes.string,
  index: PropTypes.number,
  item: PropTypes.object,
  updateItem: PropTypes.func,
  checkItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func
};