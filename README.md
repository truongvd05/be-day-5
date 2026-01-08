## Environment Setup

Create a `.env` file based on `.env.example` and update the values.

<API Endpoints>
<Register>
POST /api/auth/register
Body {
  "email": "user@example.com",
  "password": "123456"
}

<Login>
POST /api/auth/login 
Body {
  "email": "user@example.com",
  "password": "123456"
}

<Get current user>
GET /api/auth/me
Header
Authorization: Bearer <access_token>

<tạo cuộc trò chuyên mới>
POST /api/conversations
Body {
"name": "user@example.com",
"type ": "dirct" || "group"
}

<Lấy danh sách tất cả conversations của user hiện tại>
GET /api/conversations

<Thêm user vào conversation (chỉ group chat)>
POST /api/conversations/:id/participants
{
"user_id": 3
}

<Gửi tin nhắn mới>
POST /api/conversations/:id/messages
body {
"content": "your content"
}

<Tìm kiếm user theo email>
GET /api/users/search?q=email
