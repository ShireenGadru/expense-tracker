class ApiResponse {
  constructor(satusCode, message = "Success", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = satusCode < 400;
    this.data = data;
  }
}
export { ApiResponse };
