import { Store } from "react-notifications-component";

export const Toast = (title, message, type) => {
    Store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-full",
      animationIn: ["animate__bounceIn"],
      dismiss: {duration: 2000},
      onRemoval: (id, removedBy) => {
        Store.removeNotification(id)
        console.log(id);
      }
    });
  };