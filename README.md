# Lab 3 — Global Auth State with Supabase

Dự án Next.js App Router mở rộng từ Lab 2, gồm danh sách sản phẩm, xác thực email/password thật bằng Supabase Auth và trạng thái đăng nhập toàn cục bằng React Context.

## Chức năng

- Trang chủ hiển thị 6 sản phẩm từ `data/products.ts` bằng component `ProductCard`.
- Đăng ký và đăng nhập thật với Supabase Auth.
- `AuthContext` quản lý `user`, `session`, `loading`, `signUp`, `signIn` và `signOut`.
- Session được khôi phục bằng `getSession()` và đồng bộ bằng `onAuthStateChange()`.
- Header hiển thị Login/Register khi chưa đăng nhập; hiển thị email/Logout khi đã đăng nhập.
- Route `/account` chuyển về `/login` nếu chưa đăng nhập.
- Client-side validation và toàn bộ test hooks từ Lab 2 vẫn được giữ nguyên.
- Tailwind CSS, ShadCN UI, Public Sans và responsive product grid.

## Routes

| Route | Nội dung |
| --- | --- |
| `/` | Danh sách sản phẩm và header theo trạng thái đăng nhập |
| `/login` | Đăng nhập bằng Supabase |
| `/register` | Tạo tài khoản Supabase |
| `/account` | Trang tài khoản được bảo vệ |

## Cài đặt

```bash
npm install
```

Sao chép `.env.example` thành `.env.local` và điền thông tin tại **Supabase → Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Chỉ sử dụng anon/public key. Không sử dụng hoặc commit `service_role`/secret key.

Khởi động dự án:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Cấu hình Supabase bắt buộc

1. Mở **Authentication → Providers → Email**.
2. Bật đăng ký bằng email/password.
3. Tắt **Confirm email** và lưu thay đổi.
4. Đăng ký một tài khoản thử nghiệm bằng route `/register`.
5. Kiểm tra đăng nhập đúng, đăng nhập sai mật khẩu, refresh session và Logout.
6. Thêm hai biến môi trường tương tự vào Vercel rồi redeploy production.

## Kiến trúc xác thực

```text
lib/supabaseClient.ts
        │
        ▼
contexts/AuthContext.tsx
        │
        ├── components/AuthForm.tsx
        ├── components/HeaderAuthActions.tsx
        └── app/account/page.tsx
```

`AuthProvider` được đặt trong root layout. Các component đọc trạng thái thông qua `useAuth()`; thông tin người dùng không được truyền qua props.

## Validation

Client-side validation chạy trước khi gọi Supabase:

- `Email is required`
- `Please enter a valid email address`
- `Password is required`
- `Full name is required`
- `Password must be at least 6 characters`
- `Confirm password is required`
- `Passwords do not match`

Lỗi do Supabase trả về được render riêng trong `data-testid="error-auth"`. Đăng ký thành công hiển thị `Registration successful` trong `data-testid="form-success"`; đăng nhập thành công chuyển về `/`.

## Test hooks Lab 3

- `/login`, `/register`: `error-auth`
- Header đã đăng nhập: `user-email`, `btn-logout`
- `/account`: `account-page`, `account-email`

Các test hooks Lab 2 như `product-list`, `product-card`, `btn-login`, `btn-register`, các input và lỗi client vẫn được giữ nguyên.

## ShadCN UI

Các component được sử dụng trực tiếp từ `components/ui/`:

- `Button`
- `Card`
- `HoverCard`
- `Input`
- `Label`

## Kiểm tra chất lượng

```bash
npm run lint
npm run build
```

## Cấu trúc chính

```text
app/
├── account/page.tsx
├── login/page.tsx
├── register/page.tsx
├── layout.tsx
└── page.tsx
components/
├── ui/
├── AuthForm.tsx
├── HeaderAuthActions.tsx
└── ProductCard.tsx
contexts/
└── AuthContext.tsx
data/
└── products.ts
lib/
├── supabaseClient.ts
└── utils.ts
public/
└── products/
.env.example
components.json
```
