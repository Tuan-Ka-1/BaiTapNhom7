"use server"; 

import { formSchema } from "./schema";

// Nhận dữ liệu từ form và xử lý
export async function registerAction(data: unknown) {
  // Dùng safeParse() để kiểm tra dữ liệu, không ném ra lỗi (throw Error)
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    // Trả về object kết quả nếu thất bại
    return {
      success: false,
      message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!",
  }

  // Trả về object kết quả nếu thành công
  return {
    success: true,
    message: "Đăng ký thành công!",
  };
}