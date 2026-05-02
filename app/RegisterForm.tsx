"use client"; 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "./schema";
import { registerAction } from "./actions";

export default function RegisterForm() {
  const {
    register, // Dùng thay cho onChange và useState
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // Kết nối Zod với React Hook Form
    mode: "onChange", //yêu cầu UX: Real-time validation khi người dùng gõ
  });

  const onSubmit = async (data: FormData) => {
    // 1. In ra console để xem dữ liệu gửi đi có đúng không
    console.log("Dữ liệu chuẩn bị gửi:", data); 

    try {
      const result = await registerAction(data);
      
      // 2. In ra kết quả từ server trả về
      console.log("Kết quả từ server:", result);

      // 3. Dùng dấu ? (Optional Chaining) để không bị lỗi undefined
      if (result?.success) {
        alert(result.message); 
      } else {
        alert(result?.message || "Lỗi: Server không trả về dữ liệu!"); 
      }
    } catch (error) {
      console.error("Lỗi khi gọi Server Action:", error);
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      
      {/* Cấu trúc Input cơ bản */}
      <div>
        <input 
          {...register("name")} // Đăng ký input, loại bỏ hoàn toàn useState
          placeholder="Họ và tên" 
        />
        {errors.name && <p style={{ color: 'red', fontSize: '14px' }}>{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p style={{ color: 'red', fontSize: '14px' }}>{errors.email.message}</p>}
      </div>

      <div>
        <input type="password" {...register("password")} placeholder="Mật khẩu" />
        {errors.password && <p style={{ color: 'red', fontSize: '14px' }}>{errors.password.message}</p>}
      </div>

      <div>
        <input type="password" {...register("confirmPassword")} placeholder="Xác nhận mật khẩu" />
        {errors.confirmPassword && <p style={{ color: 'red', fontSize: '14px' }}>{errors.confirmPassword.message}</p>}
      </div>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
      </button>
      
    </form>
  );
}