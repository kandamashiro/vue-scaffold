/**
 * 取得当期彩票信息
 * @param ticketId
 * @param type
 * @param version
 * @param then
 * @param fail
 * @returns {*|Promise<T>}
 */
const getTicketInfoApi = ({ ticketId, type = 0, version = 1 }, then, fail) => {
  return $http({
    url: '/ticket/ticketmod/ticketinfo.json',
    data: {
      ticketId,
      type,
      version,
    },
  })
    .then(then)
    .catch(fail);
};

export {
  getTicketInfoApi,
};
