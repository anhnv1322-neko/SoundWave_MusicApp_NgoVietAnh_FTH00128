# SoundWave – Website HTML5, CSS3 và JavaScript phía frontend

SoundWave là dự án giao diện nền tảng âm nhạc được xây dựng theo hướng website MP3 cổ điển, ưu tiên tính thực dụng và khả năng đọc nội dung. Giao diện sử dụng nền sáng, kiểu chữ hệ thống, liên kết màu xanh, bảng dữ liệu, đường viền mảnh và bố cục gọn. Không sử dụng gradient, hiệu ứng phát sáng, bóng đổ lớn hoặc framework giao diện.

## 10 trang theo đề bài

1. `index.html` – Trang khung chính, Navbar và trình phát nhạc dùng chung.
2. `search.html` – Tìm kiếm, lọc và sắp xếp bài hát.
3. `song-detail.html` – Chi tiết bài hát và lời bài hát.
4. `artist-songs.html` – Bài hát theo ca sĩ.
5. `composer-songs.html` – Bài hát theo tác giả/nhạc sĩ.
6. `album-songs.html` – Bài hát theo album.
7. `detail.html` – Tin tức / bài viết.
8. `about.html` – Về chúng tôi.
9. `contact.html` – Liên hệ & đóng góp.
10. `policy-terms.html` – Chính sách & điều khoản.

`home.html` là tệp nội dung trang chủ được `index.html` nạp vào iframe để giữ trình phát nhạc liên tục; đây không phải trang chức năng thứ 11.

## Công nghệ

- HTML5 Semantic.
- CSS3, Flexbox, CSS Grid và media queries.
- Responsive cho desktop, tablet và mobile.
- HTML `<iframe>` để chuyển nội dung trang mà không tải lại khung chính.
- HTML5 `<audio controls>` để phát nhạc.
- JavaScript thuần ở frontend cho tìm kiếm, lọc thể loại, lọc năm phát hành, sắp xếp và đếm kết quả.
- Không sử dụng Backend, Database, thư viện giao diện hoặc framework.

## Chức năng tìm kiếm bài hát

Trang `search.html` sử dụng file `assets/js/search.js` để xử lý dữ liệu mẫu ngay trên trình duyệt.

Các chức năng gồm:

- Tìm theo tên bài hát, nghệ sĩ, tác giả/nhạc sĩ, album hoặc thể loại.
- Tìm kiếm không phân biệt chữ hoa, chữ thường và dấu tiếng Việt.
- Lọc theo thể loại và năm phát hành.
- Sắp xếp theo ngày phát hành mới nhất hoặc lượt nghe nhiều nhất.
- Cập nhật số lượng kết quả ngay khi nhập từ khóa hoặc thay đổi bộ lọc.
- Hiển thị thông báo khi không có bài hát phù hợp.
- Nút “Xóa bộ lọc” đưa các điều kiện tìm kiếm về mặc định.

### Tự thêm dữ liệu bài hát

Mở `assets/js/search.js`, tìm mảng `songData` ở đầu file. Mỗi bài hát là một object có các trường:

- `title`: tên bài hát.
- `artist`: nghệ sĩ trình bày.
- `composer`: tác giả/nhạc sĩ.
- `album`: album.
- `genre`: thể loại.
- `year`: năm phát hành.
- `releaseDate`: ngày phát hành theo định dạng `YYYY-MM-DD`.
- `plays`: số lượt nghe dạng số.
- `duration`: thời lượng, ví dụ `3:45`.
- `cover`: đường dẫn ảnh bìa.

Bạn có thể sao chép một object trong mảng, thay thông tin và thêm dấu phẩy giữa các object. Các giá trị thể loại và năm muốn lọc phải có option tương ứng trong các thẻ `<select>` tại `search.html`.

Dữ liệu chỉ nằm trong JavaScript phía frontend, không được lưu lên máy chủ và không cần Backend để xử lý tìm kiếm. Ảnh bìa mẫu hiện sử dụng đường dẫn Unsplash nên cần Internet để tải ảnh.

## Cách chạy

1. Giải nén toàn bộ dự án.
2. Mở thư mục `soundwave` bằng VS Code.
3. Mở `index.html` bằng Live Server.
4. Dùng thanh điều hướng ở phía trên để chuyển giữa các trang.

Nên chạy bằng Live Server thay vì mở trực tiếp file HTML bằng `file://` để tránh một số giới hạn của trình duyệt.

## Trình phát nhạc liên tục

`index.html` chứa duy nhất một thẻ `<audio>` nằm ngoài iframe. Các trang nội dung được nạp trong iframe có tên `contentFrame`; liên kết nội bộ trỏ vào khung này. Vì vậy, khi chuyển trang, iframe thay đổi nội dung nhưng trang `index.html` và thẻ audio không bị tải lại, nên nhạc không bị ngắt.

Trình phát hỗ trợ phát, tạm dừng, tua, chỉnh âm lượng và phát lại bằng điều khiển gốc của trình duyệt. Thuộc tính `controlslist="nodownload"` yêu cầu trình duyệt ẩn nút tải xuống nếu được hỗ trợ; nó không bảo vệ tuyệt đối tệp MP3.

## Tệp nhạc

- Thư mục: `sounddemo/`
- Tệp đang phát: `sounddemo/badders.mp3`
- Muốn thay nhạc, chép tệp khác vào `sounddemo/` và sửa đường dẫn trong thẻ `<source>` ở `index.html`.