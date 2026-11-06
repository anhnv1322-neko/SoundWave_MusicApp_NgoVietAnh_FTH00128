// Dummy data
const songData = [
    {
        id: 1,
        title: "Chạm vào mây",
        artist: "Minh An",
        composer: "Minh An",
        album: "Những ngày xanh",
        genre: "Indie Pop",
        year: 2026,
        releaseDate: "2026-10-18",
        plays: 154200,
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Ngày dịu êm",
        artist: "Hà My",
        composer: "Nguyễn Hà My",
        album: "Ngày dịu êm",
        genre: "Acoustic",
        year: 2025,
        releaseDate: "2025-09-11",
        plays: 89500,
        duration: "4:21",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Một mình giữa phố",
        artist: "The Moods",
        composer: "Lê Hoàng Nam",
        album: "Phố và những khoảng lặng",
        genre: "Lo-Fi",
        year: 2025,
        releaseDate: "2025-05-22",
        plays: 201300,
        duration: "5:22",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Phía cuối con đường",
        artist: "Nam Kha",
        composer: "Nam Kha",
        album: "Qua miền ký ức",
        genre: "Alternative",
        year: 2024,
        releaseDate: "2024-12-03",
        plays: 276400,
        duration: "6:23",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Đêm thành phố",
        artist: "DJ Nova",
        composer: "DJ Nova",
        album: "Neon Nights",
        genre: "EDM",
        year: 2026,
        releaseDate: "2026-07-07",
        plays: 388000,
        duration: "3:48",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Mùa hạ chưa quên",
        artist: "Minh An",
        composer: "Trần Minh An",
        album: "Những ngày xanh",
        genre: "Indie Pop",
        year: 2024,
        releaseDate: "2024-06-15",
        plays: 112500,
        duration: "3:56",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        title: "Khoảng lặng",
        artist: "Hà My",
        composer: "Hà My",
        album: "Ngày dịu êm",
        genre: "Acoustic",
        year: 2025,
        releaseDate: "2025-11-02",
        plays: 76200,
        duration: "4:04",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        title: "Nhịp điệu tự do",
        artist: "The Pulse",
        composer: "Lâm Phong",
        album: "Pulse",
        genre: "EDM",
        year: 2024,
        releaseDate: "2024-03-19",
        plays: 421000,
        duration: "3:31",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80"
    }
];

const searchForm = document.querySelector("#searchForm");
const keywordInput = document.querySelector("#q");
const genreSelect = document.querySelector("#genre");
const yearSelect = document.querySelector("#year");
const sortSelect = document.querySelector("#sort");
const resetButton = document.querySelector("#resetSearch");
const resultsContainer = document.querySelector("#searchResults");
const resultsCount = document.querySelector("#resultsCount");

// Chuẩn hóa văn bản để tìm kiếm không phân biệt chữ hoa, chữ thường và dấu tiếng Việt.
function normalizeText(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLocaleLowerCase("vi")
        .trim();
}

// Định dạng lượt nghe theo cách đọc số tiếng Việt.
function formatPlays(plays) {
    return `${plays.toLocaleString("vi-VN")} lượt nghe`;
}

// Tạo HTML cho một thẻ bài hát trong danh sách kết quả.
function createSongCard(song) {
    return `
        <article class="song-card">
            <a href="song-detail.html" target="contentFrame">
                <div class="cover-wrap">
                    <img
                        src="${song.cover}"
                        alt="Bìa bài hát ${song.title}"
                        loading="lazy">
                </div>
                <h3>${song.title}</h3>
            </a>
            <a
                class="artist-link"
                href="artist-songs.html"
                target="contentFrame">
                ${song.artist}
            </a>
            <div class="song-card-foot">
                <span>${song.genre}</span>
                <span>${song.duration}</span>
            </div>
            <div class="search-card-meta">
                <span>${song.year}</span>
                <span>${formatPlays(song.plays)}</span>
            </div>
        </article>
    `;
}

// Lọc và sắp xếp dữ liệu theo các điều kiện người dùng chọn.
function getFilteredSongs() {
    const keyword = normalizeText(keywordInput.value);
    const selectedGenre = genreSelect.value;
    const selectedYear = yearSelect.value;
    const selectedSort = sortSelect.value;

    const filteredSongs = songData.filter((song) => {
        const searchableContent = normalizeText([
            song.title,
            song.artist,
            song.composer,
            song.album,
            song.genre
        ].join(" "));

        const matchesKeyword = searchableContent.includes(keyword);
        const matchesGenre = selectedGenre === "all"
            || song.genre === selectedGenre;
        const matchesYear = selectedYear === "all"
            || String(song.year) === selectedYear;

        return matchesKeyword && matchesGenre && matchesYear;
    });

    if (selectedSort === "plays") {
        filteredSongs.sort((songA, songB) => songB.plays - songA.plays);
    } else {
        filteredSongs.sort((songA, songB) => {
            return new Date(songB.releaseDate) - new Date(songA.releaseDate);
        });
    }

    return filteredSongs;
}

// Hiển thị kết quả và cập nhật số lượng bài hát tìm được.
function renderSearchResults() {
    const filteredSongs = getFilteredSongs();
    const totalSongs = songData.length;
    const resultLength = filteredSongs.length;

    resultsCount.textContent = `Tìm thấy ${resultLength} / ${totalSongs} bài hát`;

    if (resultLength === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <strong>Không tìm thấy bài hát phù hợp.</strong>
                <p>Hãy thử từ khóa khác hoặc thay đổi bộ lọc của bạn.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = filteredSongs.map(createSongCard).join("");
}

// Tìm kiếm khi nhấn Enter hoặc nút Tìm kiếm.
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderSearchResults();
});

// Cập nhật kết quả ngay khi người dùng nhập từ khóa.
keywordInput.addEventListener("input", renderSearchResults);

// Cập nhật kết quả khi thay đổi một trong các bộ lọc.
genreSelect.addEventListener("change", renderSearchResults);
yearSelect.addEventListener("change", renderSearchResults);
sortSelect.addEventListener("change", renderSearchResults);

// Đưa các điều kiện tìm kiếm về trạng thái mặc định.
resetButton.addEventListener("click", () => {
    searchForm.reset();
    renderSearchResults();
});

// Hiển thị toàn bộ danh sách khi mở trang lần đầu.
renderSearchResults();
