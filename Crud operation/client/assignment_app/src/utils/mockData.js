import { setItem } from "./localStorage";

const mockUsers = [
  {
    name: "Vinay sharma",
    age: "41",
    userName: "vinay",
    password: "v123",
    token: "vinaysharma41",
  },
  {
    name: "Swarn Tiyagi",
    age: "22",
    userName: "swarn",
    password: "s123",
    token: "swarntyagi22",
  },
];

export const authenticateUser = (un, pass) => {
  return new Promise((resolve, reject) => {
    const user = mockUsers.filter((item) => {
      return item.userName === un && item.password === pass;
    });
    if (user.length) {
      setItem("user", JSON.stringify(user[0]));
      resolve({ success: true });
    } else {
      reject({ success: false, error: "Invalid User Name/ Password" });
    }
  });
};
