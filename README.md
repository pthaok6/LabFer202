# Lab 4 & 5 — Next.js Rendering, API Routes & Supabase Favorites

Dự án Next.js App Router phát triển tiếp từ Lab 3, gồm xác thực Supabase, trang chi tiết render từ server, API sản phẩm, tìm kiếm qua URL và danh sách yêu thích lưu trong Supabase.

## Chức năng

- Trang chủ hiển thị 6 sản phẩm từ `data/products.ts` bằng component `ProductCard`.
- Trang chủ lọc theo `q` và `category` từ URL; HTML kết quả được render ở server.
- Trang `/products/[id]` được tạo sẵn khi build, có metadata riêng và trả 404 cho id không tồn tại.
- API `/api/products` và `/api/products/[id]` dùng chung dữ liệu sản phẩm.
- `FavoritesContext` dùng `useReducer` để tải, thêm, xóa yêu thích với cập nhật lạc quan và rollback khi Supabase từ chối.
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
| `/products/[id]` | Chi tiết sản phẩm render từ server |
| `/api/products` | Danh sách JSON; hỗ trợ `q` và `category` |
| `/api/products/[id]` | Một sản phẩm JSON hoặc 404 |
| `/favorites` | Danh sách yêu thích của người đã đăng nhập |

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

## Bảng favorites

Chạy nguyên script trong [`supabase/favorites.sql`](supabase/favorites.sql) bằng SQL Editor của **cùng project Supabase Lab 3**. Script tạo bảng `public.favorites`, bật RLS và đúng ba policy `read own`, `insert own`, `delete own` cho vai trò `authenticated`. Không dùng service-role key trong ứng dụng.

Sau đó thử đăng nhập, bấm nút trái tim ở trang chủ/trang chi tiết, tải lại `/favorites`, và đăng xuất. Yêu thích được lưu theo `user_id`; khách chưa đăng nhập bấm nút sẽ được đưa tới `/login`.

Ví dụ kiểm tra API:

```text
/api/products
/api/products?q=glass
/api/products?category=Decor
/api/products?q=marble&category=Decor
/api/products/1
/api/products/9999
```

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

## Test hooks Lab 3–5

- `/login`, `/register`: `error-auth`
- Header đã đăng nhập: `user-email`, `btn-logout`
- `/account`: `account-page`, `account-email`
- `/products/[id]`: `product-detail`, `detail-name`, `detail-price`, `detail-description`, `detail-category`, `link-back`
- `/`: `link-detail`, `btn-favorite`, `search-input`, `category-select`, `btn-search`, `no-results`
- Header đã đăng nhập: `link-favorites`, `favorites-count`
- `/favorites`: `favorites-page`, `favorite-item`, `favorites-empty`
- Loading, error và 404: `loading`, `error-boundary`, `btn-retry`, `not-found`

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
├── api/products/route.ts
├── api/products/[id]/route.ts
├── favorites/page.tsx
├── login/page.tsx
├── products/[id]/page.tsx
├── register/page.tsx
├── error.tsx
├── layout.tsx
├── loading.tsx
├── not-found.tsx
└── page.tsx
components/
├── ui/
├── AuthForm.tsx
├── FavoriteButton.tsx
├── HeaderAuthActions.tsx
└── ProductCard.tsx
contexts/
├── AuthContext.tsx
└── FavoritesContext.tsx
data/
└── products.ts
lib/
├── supabaseClient.ts
└── utils.ts
public/
└── products/
supabase/
└── favorites.sql
.env.example
components.json
```
