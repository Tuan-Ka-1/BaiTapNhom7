import RegisterForm from "./RegisterForm";

export default function HomePage() {
  return (
    <main style={{ padding: "50px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h2>Thực hành Form Đăng Ký (Nhóm 7)</h2>
      <RegisterForm/>
    </main>
  );
}