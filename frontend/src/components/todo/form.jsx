import { Button, Input } from "antd";
import { useContext, useState } from "react";
import _, { set } from "lodash";

import * as Semantic from "semantic-ui-react";

import MainContext from "../../contexts/main";

import apiService from "../../services/api.service";

const Form = () => {

  const [error, setError] = useState(false);
  const {
    todo,
    setTodo,
    setTodos,
    update,
    setUpdate
  } = useContext(MainContext);

  const checkInput = () => {
    if (_.isNil(todo) || _.isEmpty(todo)) setError(true);
    setTimeout(() => setError(false), 2000);
  };

  const getTodos = async () => {
    const response = await apiService.getTodo();
    setTodos(response.data);
  };

  const addTodo = async () => {
    checkInput();
    if (!error && !_.isNil(todo) && !_.isEmpty(todo)) await apiService.addTodo(todo);
    await getTodos();
  };

  const updateTodo = async () => {
    checkInput();
    if (!error && !_.isNil(todo) && !_.isEmpty(todo)) await apiService.updateTodo(update, { content: todo });
    await getTodos();
    setUpdate(null);
  };

  const setTodoValue = (value) => {
    if (_.isEmpty(value)) {
      setUpdate(null);
      setTodo(null);
    }
    setTodo(value);
  };

  const ee = () => {
    if (error) {
      return "error"
    }
    else {
      return "success"
    }
  }
  const stuff = ee()
  return <Semantic.Form>
    <Semantic.Form.Group>
      {/* <Input
        onChange={(e) => setTodoValue(e.target.value)}
        error={error} >
        {_.isNil(todo) ? "" : todo}
      </Input> */}
      {console.log(ee())}
      <Input onChange={(e) => setTodoValue(e.target.value)} status={ee()} />
      {
        _.isNil(update) ?

          <Button type="primary" onClick={() => addTodo()} >add</Button> :
          <Button type="primary" danger onClick={() => updateTodo()}>update</Button>
      }
    </Semantic.Form.Group>
  </Semantic.Form>;
};

export default Form;
