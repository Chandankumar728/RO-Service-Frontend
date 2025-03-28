export const apis = {
  photoApi: "https://api.slingacademy.com/v1/sample-data/photos",
  jsonApi: "https://jsonplaceholder.typicode.com/posts",
} as const;

export const authApi = {
  sendOtpLogin: "/auth/send-mobile-otp",
  verifyOtpLogin: "/auth/verify-mobile-otp",
  login: "/auth/login",
  loginWithOtp: "/auth/send-otp-via-mobile",
  loginVerifyOtp: "/auth/verify-otp-and-login",
  register: "/auth/register",
  sendOtpViaEmail: "/auth/send-otp",
  verifyOtp: "/auth/verify-otp",
  resetPassword: "/auth/reset-password",
  getUser: "/user/get-user",
  updateProfileImg: "/user/upload-image-url",
  updateProfile: "/user/update-profile",
  changePassword: "/user/change-password",
  adminChangePassword: "/change-pass/change-password",
} as const;

export const roApi = {
  // ════════════════════════════║  API OF USERS MASTER ║═════════════════════════════════
  // createUser: '/user/create-user',
  createUser: "/user/create-user-with-image",
  getAllUser: "/user/get-all-user",
  getAllUserMasterList: "/user/get-all-user-mater-list",
  getAllUserByUlb: "/user/get-all-user-by-ulb",
  updateUser: "/user/update-profile",
  deleteUser: "/user/delete-user",
  getUserById: "/user/edit",
  updateUserStatus: "/user/update-user-status",

  sendOtp: "/otp/send-otp",
  verifyEmailOtp: "/otp/verify-otp",

  createRole :"/role/create-role",
  getAllRole :"/role/get-all-role",
  getRoleById :"/role/get-role-by-id",
  updateRole :"/role/update-role",
  updateRoleStatus :"/role/update-role-status",
  deleteRole :"/role/delete-role",

  // service masters api
  createService :"/service/create-service-type",
  getAllService :"/service/get-all-service-type",
  getServiceById :"/service/get-service-type-by-id",
  updateService :"/service/update-service-type",
  updateServiceStatus :"/service/update-service-type-status",
  deleteService :"/service/delete-service-type",

  // users api list 
  createUserswithImage :"/user/create-user-with-img",
  updateUserwithImage:"/user/update-user-with-image",


  //===========================RO SERVICE API===============================
  roBokkingCitizen: "/guest-booking/citizen-booking",
  // ====================ro booking api=====================================
  getAllBookingList:"/booking/get-all-booking",
  findBookingRoService:"/booking/get-booking-by-id",
  updateBookingRoService:"/booking/update-booking-by-id",
  deleteBooking:"/booking/delete-booking-by-id",
  findBookingByApplicationNo:"/booking/track-applicationByNo",
  getBookingListByTechnicianId:"/booking/get-booking-list-by-technician-id",

  getAllTechnicianOnly: '/technician/get-all-technician',
} as const;
