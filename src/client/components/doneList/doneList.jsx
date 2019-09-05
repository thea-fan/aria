import React from 'react';
import PropTypes from 'prop-types';

//-----------------IMPORT COMPONENTS---------------------
import TodoItem from '../todoItem/todoItem';

//------------------------COMPONENT-----------------------------

class DoneList extends React.Component {
    render() {
        let listItems = this.props.todoList.map((item, index) => {
            if (item.checked) {
                return (
                    <TodoItem
                        key={index}
                        item={item}
                        index={index}
                        checkItem={this.props.checkItem}>
                    </TodoItem>
                )
            }
        });
        return (
            <div className="checklist-current">
                <h4>Done Items</h4>
                <div className="list">
                    <ul className="list-group">
                        {listItems}
                    </ul>
                </div>
            </div>
        )
    }
}


export default DoneList;

DoneList.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  checkItem: PropTypes.func
};