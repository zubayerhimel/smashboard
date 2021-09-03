import { notification } from "antd";

const Notification = (message, description, type) => {
  notification[type]({
    message: message,
    description: description,
  });
};
export default Notification;
