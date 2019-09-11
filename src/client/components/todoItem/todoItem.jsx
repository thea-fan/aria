import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//-----------------IMPORT COMPONENTS---------------------
import EditTodoItem from '../editTodoItem/editTodoItem';

//------------------------COMPONENT-----------------------------

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checkItem
        };
        this.checkItem=this.checkItem.bind(this);
    }

    checkItem(event){
        event.preventDefault();
        if (this.state.checked) {
            this.props.checkItem(event, this.props.index, this.state.checked)
        }
    }

    render() {
        let index=this.props.index;
        let item=this.props.item;
        let checkboxClass = <label className={styles.container}><input type="checkbox" onChange={() => {this.props.checkItem(index)}}/><span className={styles.checkmark}></span></label>

        if (item.checked) {
            checkboxClass = <label className={styles.container}><input type="checkbox" onChange={() => {this.props.checkItem(index)}} checked/><span className={styles.checkmark}></span></label>
        }

        let itemDisplay = <h5 className="m-0">{item.text}</h5>;

        if (item.editing) {
            itemDisplay = (
                <EditTodoItem
                    index={index}
                    todoItem={this.props.item.text}
                    updateItem={this.props.updateItem}>
                </EditTodoItem>
            );
        }

        return (
            <div className = {`text-left mb-3 row ${styles.indvdItem}`}>
                <div className = "col-10 pl-4 pr-0 my-2">
                    {itemDisplay}
                    <small>{item.created_at}</small>
                    <i className='mx-1 p-0 bx bx-edit-alt' onClick={() => {this.props.editItem(index)}}></i>
                    <i className='p-0 bx bx-trash' onClick={() => {this.props.removeItem(index)}}></i>
                </div>
                <div className = "col-1 d-flex justify-content-center align-items-center">
                    {checkboxClass}
                </div>
            </div>
        )
    }
}


export default TodoItem;

TodoItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  todoItem: PropTypes.string,
  updateItem: PropTypes.func,
  checkItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func
};