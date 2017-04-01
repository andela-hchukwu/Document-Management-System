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
};
export default Helper;
