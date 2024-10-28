// Import thư viện cần thiết
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const configViewEngine = require("../src1/config/view_engines")
require('dotenv').config();

// Import các route (chưa sử dụng trong mã này)
const authRoute = require("../routers/auth")
const userRoute = require("../routers/user")
const jobRoute = require("../routers/job")
const bookmarkRoute = require("../routers/bookmark")

// Cấu hình server và database
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((err) => { console.log(err) })

app.use(express.json());
configViewEngine(app);


// Sử dụng thư mục `public` cho các file tĩnh

// Định nghĩa route cho trang chính
app.use("/api/",authRoute);
app.use("/api/user/",userRoute);
app.use("/api/jobs/",jobRoute);
app.use("/api/bookmarks/",bookmarkRoute);


// Bắt đầu lắng nghe trên cổng và hostname
app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`);
});