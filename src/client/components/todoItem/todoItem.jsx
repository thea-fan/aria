import React from 'react';
import PropTypes from 'prop-types';

//------------------------COMPONENT-----------------------------

class TodoItem extends React.Component {
    render() {
        let index=this.props.index;
        let item=this.props.item;
        let checkboxClass = <input type="checkbox" onClick={() => {this.props.checkItem(index)}}/>;
        if (item.checked) {
            checkboxClass = <input type="checkbox" onClick={() => {this.props.checkItem(index)}} checked/>;
        }

        let itemDisplay = <span>{checkboxClass} {item.text}</span>;
        return (
            <div>
                <p>
                {itemDisplay} <br/> <small>Posted on {item.created_at}</small>
                </p>
            </div>
        )
    }
}


export default TodoItem;

TodoItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  checkItem: PropTypes.func
};