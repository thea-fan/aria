import React from 'react';
import PropTypes from 'prop-types';

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
            <div>
                <h4>To-do Items</h4>
                <div>
                    {listItems}
                </div>
            </div>
        )
    }
}


export default ItemList;

ItemList.propTypes = {
  todoList: PropTypes.array,
  checkItem: PropTypes.func
};