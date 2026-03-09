# Happy Birthday Next.js App

Ứng dụng Happy Birthday được xây dựng với Next.js 16 và Tailwind CSS 4.

## Tính năng

- 🎉 Hiệu ứng confetti và snowflakes
- 🎂 Animation bánh sinh nhật
- ⌨️ Typing effect với typed.js
- 🎵 Phát nhạc nền (nếu có file music.mp3)
- 🎈 Animation bóng bay
- 📱 Responsive design với Tailwind CSS
- 🔗 Tùy chỉnh tên qua URL parameter

## Cài đặt

```bash
npm install
```

## Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Tùy chỉnh tên

Bạn có thể tùy chỉnh tên người nhận lời chúc bằng cách thêm parameter vào URL:

```
http://localhost:3000?name=YourName
```

Ví dụ: `http://localhost:3000?name=Maria`

## Thêm nhạc nền

Để thêm nhạc nền, đặt file nhạc có tên `music.mp3` vào thư mục `public/`.

## Build cho Production

```bash
npm run build
npm start
```

## Công nghệ sử dụng

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety
- **typed.js** - Typing animation
- **canvas-confetti** - Confetti effects

## Cấu trúc thư mục

```
hpbd/
├── app/
│   ├── components/
│   │   ├── Confetti.tsx      # Component hiệu ứng confetti
│   │   ├── Snowflakes.tsx    # Component hiệu ứng tuyết rơi
│   │   └── TypedText.tsx     # Component typing animation
│   ├── globals.css            # Styles toàn cục
│   ├── layout.tsx             # Layout chính
│   └── page.tsx               # Trang chủ
├── public/                    # Hình ảnh và assets
│   ├── back.png              # Background cho màn hình start
│   ├── banner.png            # Banner Happy Birthday
│   ├── cake.gif              # Ảnh bánh sinh nhật
│   ├── Balloon-Border.png    # Viền bóng bay
│   └── music.mp3             # (Optional) Nhạc nền
└── package.json
```

## Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa trong `globals.css`:
- Màu background: `bg-[#FFDAB9]` trong `page.tsx`
- Màu text: `text-[#C4515C]` trong `page.tsx`

### Thay đổi nội dung typing

Chỉnh sửa trong `TypedText.tsx`:
```typescript
strings: [
  `Happy Birthday <i>${name}</i>`,
  'Have a wonderful day',
  'Filled with joy and happiness.'
]
```

### Thay đổi hình ảnh

Thay thế các file trong thư mục `public/` với hình ảnh của bạn.

## License

MIT
