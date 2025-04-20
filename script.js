// form địa chỉ
const diachiButtons = document.querySelectorAll('.buy_now');
const closeform = document.querySelector("#diachi-form-close");

diachiButtons.forEach(button => {
    button.addEventListener('click', function () {
        document.querySelector('.diachi-form').style.display = "flex";
    });
});

closeform.addEventListener('click', function () {
    document.querySelector('.diachi-form').style.display = "none";
});

fetch('products.json')
    .then(res => res.json())
    .then(products => {
        const productList = document.getElementById("product-list");
        products.forEach((p) => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <img src="${p.image}" alt=""><br>
                <p><a href="#">${p.name}</a></p>
                <h4>${p.price}</h4>
                <del>${p.oldPrice}</del><br>
                <button class="thong_tin">Thông tin</button>
                <button class="buy_now">Mua ngay</button>
                <div class="cart-icon">
                     <i class='bx bx-info-circle' id="chamThan"></i> 
                   <i class='bx bx-heart' id="tim"></i>  
                    <i class='bx bx-cart-add themGioHang' id="themGioHang" onclick="countSpp()"></i>
                </div>
            `;
            productList.appendChild(div);

            div.querySelector('.themGioHang').addEventListener('click', function () {
                addToCart(p);
                alert("Thêm vào giỏ hàng thành công!");
                updateCartCount();
            });

            div.querySelector('.buy_now').addEventListener('click', function () {
                document.querySelector('.diachi-form').style.display = "flex";
            });

            div.querySelector('.thong_tin').addEventListener('click', function () {
                if (p.loai === "HP") {
                    window.location.href = `HP.html?id=${p.id}`;
                } else if (p.loai === "phone") {
                    window.location.href = `phone.html?id=${p.id}`;
                }
            });
        });
    });


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            cart[i].quantity = (cart[i].quantity || 1) + 1;
            found = true;
            break;
        }
    }

    if (!found) {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById("countSp").innerHTML = totalItems;
}



var xacNhanDc = document.getElementById("xacnhandc");
xacNhanDc.addEventListener("click", () => {
    event.preventDefault();
    document.querySelector('.diachi-form').style.display = "none";

    document.getElementsByClassName("danhGia")[0].style.display = "flex";
});

// vote sao
const output = document.querySelector(".outputDG");
const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
    star.starValue = index + 1;
    star.addEventListener("click", starRate);
});

function starRate(event) {
    const countStar = event.target.starValue;
    const thank = feedBack(countStar);

    output.innerHTML = `Bạn đã đánh giá sản phẩm này ${countStar} sao!<br><br>${thank}
        <br><span class="countdown">Cửa sổ sẽ đóng sau 5 giây...</span>`;

    output.style.display = "block"
    stars.forEach((star, index) => {
        if (index < countStar) {
            star.classList.add("orange");
        } else {
            star.classList.remove("orange");
        }
    });

    let countdown = 5;
    const countdownElement = document.querySelector(".countdown");
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownElement.innerText = `Cửa sổ sẽ đóng sau ${countdown} giây...`;
        } else {
            clearInterval(interval);
            document.querySelector(".danhGia").style.display = "none";
        }
    }, 1000);
}

function feedBack(soSao) {
    if (soSao === 1) {
        return "Trời đất ơi, chúng tôi sẽ khai tử sản phẩm này ngay!";
    } else if (soSao === 2) {
        return "Tháng sau chúng tôi khai tử...";
    } else if (soSao === 3) {
        return "Tháng sau nữa chúng tôi khai tử...";
    } else if (soSao === 4) {
        return "Cảm ơn bạn, chúng tôi sẽ cải thiện!";
    } else if (soSao === 5) {
        return "Cảm ơn bạn đã đánh giá tốt! Chúc bạn một ngày tốt lành 💛";
    }
}



//time
function getTime() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s

    return `${h}:${m}:${s}`;

}
function updateTime() {
    let time = getTime();
    document.getElementById("time").innerHTML = time;
}
setInterval(updateTime, 1000);
updateTime();


// banner control
const images = document.querySelectorAll('.banner-left img');
let currentIndex = 0;

function showSlide(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

function nextSlide() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

let viTri = 0;
const danhSachAnh = document.querySelectorAll('.banner-left img');

function hienThiAnh() {
    danhSachAnh.forEach(img => img.classList.remove('active'));
    danhSachAnh[viTri].classList.add('active');
}

function anhKeTiep() {
    viTri = (viTri + 1) % danhSachAnh.length;
    hienThiAnh();
}

function anhTruocDo() {
    viTri = (viTri - 1 + danhSachAnh.length) % danhSachAnh.length;
    hienThiAnh();
}

setInterval(anhKeTiep, 10000);


showSlide(currentIndex);
hienThiAnh();

// CHAT TU Dong
function guiTinNhan() {
    let oNhap = document.getElementById("oNhap");
    let khungNoiDung = document.getElementById("khungNoiDung");
    let tinNhan = oNhap.value.trim();

    if (tinNhan !== "") {
        khungNoiDung.innerHTML += `<p><strong>Anh chị:</strong> ${tinNhan}</p>`;
        oNhap.value = "";
        traLoiTuDong(tinNhan);
        khungNoiDung.scrollTop = khungNoiDung.scrollHeight;
    }
}

function traLoiTuDong(tinNhan) {
    let khungNoiDung = document.getElementById("khungNoiDung");
    let traLoi = "Em Tư chưa hiểu ý anh chị, anh chị có thể nói rõ hơn không?";

    if (tinNhan.includes("chào")) {
        traLoi = "Chào anh chị! Em Tư có thể giúp gì ạ?";
    } else if (tinNhan.includes("giá")) {
        traLoi = "Anh chị muốn hỏi về giá của sản phẩm nào ạ?";
    } else if (tinNhan.includes("liên hệ")) {
        traLoi = "Anh chị có thể liên hệ qua số 0353802738 nhé!";
    }

    setTimeout(() => {
        khungNoiDung.innerHTML += `<p><strong>Em Tư:</strong> ${traLoi}</p>`;
        khungNoiDung.scrollTop = khungNoiDung.scrollHeight;
    }, 1000);
}



const emoij = document.getElementById("chat")
const close_chat = document.getElementById("close_chat")
emoij.addEventListener("click", function () {
    emoij.style.display = 'none'
    document.querySelector(".khung-chat").style.display = 'block'
})
close_chat.addEventListener('click', function () {
    document.querySelector(".khung-chat").style.display = 'none'
    emoij.style.display = 'flex'
})




let thoiGianConLai = 5 * 60;

function capNhatDongHo() {
    const phut = Math.floor(thoiGianConLai / 60);
    const giay = thoiGianConLai % 60;
    document.getElementById('dongHo').textContent =
        `${String(phut).padStart(2, '0')}:${String(giay).padStart(2, '0')}`;
    if (thoiGianConLai > 0) {
        thoiGianConLai--;
    } else {
        clearInterval(boDemThoiGian);
        document.getElementById('hopUuDai').style.display = 'none';
        dongHopUuDai.remove()
    }
}

const boDemThoiGian = setInterval(capNhatDongHo, 1000);
capNhatDongHo();

function dongHopUuDai() {
    document.getElementById('hopUuDai').style.display = 'none';
}

function nhanNgayPopup() {
    alert("Chúc mừng bạn đã nhận được voucher")
    document.getElementById('hopUuDai').style.display = "none"
}

var darkBtn = document.getElementById("dark")
var daToi = false
darkBtn.addEventListener("click", function () {
    if (!daToi) {
        document.body.classList.toggle("dark-mode");
    } else {
        document.body.classList.toggle("dark-mode");
    }
})


