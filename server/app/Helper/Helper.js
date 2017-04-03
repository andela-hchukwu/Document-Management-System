/*
* Controller's' helper
*/
const Helper = {

  /**
   * Get user's profile
   * @param {Object} data - data containing user,s details
   * @returns {Object} return user's data
   */
  userProfile(data) {
    return {
      id: data.id,
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.roleId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  },

  /**
   * get user's attribute
   * @returns {Array} return user's attribute
   */
  getUserAtrribute() {
    return [
      'id',
      'userName',
      'firstName',
      'lastName',
      'email',
      'createdAt'
    ];
  },

  /**
   * @param {Object} condition - pagination condition
   * @returns {Object} return an object
  */
  pagination(condition) {
    const next = Math.ceil(condition.count / condition.limit);
    const currentPage = Math.floor((condition.offset / condition.limit) + 1);
    const pageSize = condition.limit > condition.count
      ? condition.count : condition.limit;
    return {
      page_count: next,
      page: currentPage,
      page_size: Number(pageSize),
      total_count: condition.count
    };
  },

  /**
   * Get user's profile
   * @param {Object} data - object containing user's details
   * @returns {Object} return user's data
   */
  getUserProfile(data) {
    return {
      id: data.id,
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      enail: data.email
    };
  },
};
export default Helper;