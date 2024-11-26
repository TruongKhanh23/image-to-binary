const fs = require("fs");
const path = require("path");

// Đường dẫn thư mục chứa hình ảnh
const imagesDirectory = path.join(__dirname, "images");

// Đường dẫn file JSON xuất ra
const outputFilePath = path.join(__dirname, "output", "images.json");

// Hàm chuyển đổi file ảnh sang Base64 với định dạng chuẩn "data:image/png;base64,..."
const convertImageToBase64 = (filePath, mimeType) => {
  const fileBuffer = fs.readFileSync(filePath); // Đọc file
  const base64 = fileBuffer.toString("base64"); // Convert sang Base64
  return `data:${mimeType};base64,${base64}`; // Định dạng Base64
};

// Đọc thư mục `images` và xử lý
const processImages = () => {
  try {
    // Đảm bảo thư mục output tồn tại
    if (!fs.existsSync(path.join(__dirname, "output"))) {
      fs.mkdirSync(path.join(__dirname, "output"));
    }

    // Lấy danh sách file từ thư mục images
    const files = fs.readdirSync(imagesDirectory);

    // Lọc file ảnh (chỉ lấy file có đuôi jpg, jpeg, png, gif)
    const imageFiles = files.filter((file) =>
      file.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    // Mảng chứa Base64 các hình ảnh
    const imagesBase64Array = imageFiles.map((file) => {
      const filePath = path.join(imagesDirectory, file);
      const mimeType = `image/${file.split(".").pop()}`; // Xác định kiểu MIME của hình ảnh
      return convertImageToBase64(filePath, mimeType);
    });

    // Ghi mảng Base64 vào file JSON
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(imagesBase64Array, null, 2)
    );
    console.log(`Đã lưu file JSON tại: ${outputFilePath}`);
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};

// Chạy chương trình
processImages();
