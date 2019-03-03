import request from "../../../utils/request";

const getRankData = () => {
  return request({
    url: "rank",
    method: "get"
  });
};

export default { getRankData }