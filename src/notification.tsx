import { notification } from "antd";

export const initNotificationConfig = () => {
  notification.config({ placement: "bottomRight", duration: 2 });
};
