import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"), // Bổ sung thêm trường Tên
  email: z.string().email("Email không hợp lệ"),
  password: z.string()
    .min(8, "Tối thiểu 8 ký tự")
    .regex(/[A-Z]/, "Cần ít nhất 1 chữ hoa")
    .regex(/[0-9]/, "Cần ít nhất 1 số"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  //.refine() để đối chiếu 2 mật khẩu
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"], // Lỗi sẽ được gắn vào ô confirmPassword
});

export type FormData = z.infer<typeof formSchema>;