import { useEffect, useContext } from "react";

import MainContext from "../../contexts/main";

import apiService from "../../services/api.service";
import { Radio } from 'antd';
const Radioa = ({ itemId, checked = false }) => {

  const { setTodos } = useContext(MainContext);

  const completeTodo = async () => {
    await apiService.updateTodo(itemId, { "is_completed": !checked });
    const response = await apiService.getTodo();
    setTodos(response.data);
    if (!checked) document.getElementById("audio").play();
  };
  return <Radio checked={checked} onClick={() => completeTodo()}></Radio>
  // <div className={checked ? "app-radio-checked" : "app-radio"} onClick={() => completeTodo()}>
  //   {checked && <span />}
  // </div>;
};

export default Radioa;
