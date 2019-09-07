import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//-----------------IMPORT COMPONENTS---------------------
import TodoItem from '../todoItem/todoItem';


//------------------------COMPONENT-----------------------------

class ItemList extends React.Component {

  render() {
        let listItems = this.props.todoList.map((item, index) => {
            if (!item.checked) {
                return (
                    <TodoItem
                        key={index}
                        item={item}
                        index={index}
                        checkItem={this.props.checkItem}
                        editItem={this.props.editItem}
                        updateItem={this.props.updateItem}
                        removeItem={this.props.removeItem}>
                    </TodoItem>
                )
            }
        });
        return (
            <div className = {`mt-4 mr-2 ${styles.yscroll}`}>
              <div className = "mt-2 d-flex flex-column align-items-center">
                {listItems}
              </div>
            </div>
        )
    }
}


export default ItemList;

ItemList.propTypes = {
  todoList: PropTypes.array,
  checkItem: PropTypes.func,
  updateItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func
};