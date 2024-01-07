import React, { useEffect } from "react";
import { useCounterValue, useCounterDispatch } from "../NotificationContext";

const Notification = () => {
  const { message, isVisible } = useCounterValue();
  const dispatch = useCounterDispatch();

  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isVisible, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: isVisible ? 'block' : 'none',
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
