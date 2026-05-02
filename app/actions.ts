"use server";

import { formSchema } from "./schema";

export async function registerAction(data: unknown) {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!",
    };
  }

  return {
    success: true,
    message: "Đăng ký thành công!",
  };
}