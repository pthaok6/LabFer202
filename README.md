# Product List & Form Validation

Dự án thực hành Next.js gồm trang danh sách sản phẩm, điều hướng phía client và hai form đăng nhập/đăng ký có kiểm tra dữ liệu bằng React state.

Đây là dự án giao diện mẫu. Dữ liệu sản phẩm được lưu cục bộ; form không kết nối cơ sở dữ liệu, API hoặc hệ thống xác thực thật.

## Chức năng

- Trang chủ hiển thị 6 sản phẩm bằng component `ProductCard` tái sử dụng.
- Dữ liệu sản phẩm nằm riêng trong `data/products.ts` và được render bằng `.map()`.
- Ảnh sản phẩm được lưu trong `public/products/`, có kích thước hiển thị đồng nhất và đầy đủ alt text.
- Điều hướng đến `/login` và `/register` bằng `next/link`.
- Hover Card trên mục Shop hiển thị thông tin nhanh về bộ sưu tập.
- Form là Client Component, sử dụng `useState` để quản lý giá trị, lỗi và trạng thái thành công.
- Validation chỉ chạy sau khi submit; lỗi biến mất khi dữ liệu tương ứng hợp lệ.
- Giao diện responsive: một cột trên mobile và tối thiểu ba cột trên màn hình lớn.
- Font Public Sans được sử dụng trên toàn bộ website.

## Routes

| Route | Nội dung |
| --- | --- |
| `/` | Danh sách 6 sản phẩm |
| `/login` | Form đăng nhập |
| `/register` | Form đăng ký |

## Validation

### Login

- Email trống: `Email is required`
- Email không hợp lệ: `Please enter a valid email address`
- Password trống: `Password is required`
- Thành công: `Login successful (demo)`

### Register

- Full name trống hoặc chỉ chứa khoảng trắng: `Full name is required`
- Email trống: `Email is required`
- Email không hợp lệ: `Please enter a valid email address`
- Password trống: `Password is required`
- Password ngắn hơn 6 ký tự: `Password must be at least 6 characters`
- Confirm password trống: `Confirm password is required`
- Password không khớp: `Passwords do not match`
- Thành công: `Registration successful (demo)`

## ShadCN UI

Dự án có `components.json` và sử dụng trực tiếp các component được tạo bởi ShadCN CLI:

- `Button`
- `Card`
- `HoverCard`
- `Input`
- `Label`

Các component nằm trong `components/ui/` và sử dụng hàm `cn()` tại `lib/utils.ts`.

## Công nghệ

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ShadCN UI và Radix UI
- Public Sans Variable

## Chạy dự án

Cài dependencies:

```bash
npm install
```

Khởi động môi trường development:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Kiểm tra chất lượng

```bash
npm run lint
npm run build
```

Chạy production build ở local:

```bash
npm run start
```

## Cấu trúc chính

```text
app/
├── login/page.tsx
├── register/page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
components/
├── ui/
├── AuthForm.tsx
└── ProductCard.tsx
data/
└── products.ts
lib/
└── utils.ts
public/
└── products/
components.json
```

## Test hooks

Các phần tử chính có `data-testid` cố định để phục vụ kiểm thử tự động, bao gồm:

- `btn-login`, `btn-register`
- `product-list`, `product-card`, `product-name`, `product-image`, `product-description`, `product-price`
- `login-form`, `login-email`, `login-password`, `login-submit`
- `register-form`, `register-name`, `register-email`, `register-password`, `register-confirm-password`, `register-submit`
- `error-name`, `error-email`, `error-password`, `error-confirm-password`, `form-success`
