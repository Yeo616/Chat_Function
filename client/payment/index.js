// import axios from "axios";
// import axios from "./node_modules/axios/dist/esm/axios.min.js";

const form = document.querySelector("form");
form.addEventListener("submit", requestPay);

var merchant1 = document.getElementById("merchant1");
var merchant2 = document.getElementById("merchant2");
var merchant3 = document.getElementById("merchant3");

var kcp = document.getElementById("kcp");
var tosspay = document.getElementById("tosspay");
var nice = document.getElementById("nice");
var kakaopay = document.getElementById("kakaopay");
var naverpay = document.getElementById("naverpay");
var payco = document.getElementById("payco");

//   const selectedPG = document.getElementById("selectPG");
//   var selectPG = selectedPG.value;

var IMP = window.IMP;
IMP.init("imp67011510");

var today = new Date();
var hours = today.getHours(); // 시
var minutes = today.getMinutes(); // 분
var seconds = today.getSeconds(); // 초
var milliseconds = today.getMilliseconds();
var makeMerchantUid = hours + minutes + seconds + milliseconds;

function requestPay(event) {
  event.preventDefault();

  var data = new FormData(form);

  var selectedMerchant = data.get("merchant");
  console.log(selectedMerchant);
  var merchant = "";
  var price = 0;
  switch (selectedMerchant) {
    case "merchant1":
      merchant = "merchant1";
      price = 1;
      console.log("merchant: " + merchant);
      break;
    case "merchant2":
      merchant = "merchant2";
      price = 2;
      console.log("merchant: " + merchant);
      break;
    case "merchant3":
      merchant = "merchant3";
      price = 3;
      console.log("merchant: " + merchant);
      break;
    default:
      console.log("선택된 상품이 없습니다.");
      break;
  }

  var selectedPayment = data.get("payment");
  console.log(selectedPayment);

  var payment = "";
  var pay_method = "";

  switch (selectedPayment) {
    case "kcp":
      payment = "kcp";
      pay_method = "card";
      console.log("payment: " + payment);
      break;
    case "tosspay":
      payment = "tosspay";
      pay_method = "tosspay";
      console.log("payment: " + payment);
      break;
    case "nice":
      payment = "nice";
      pay_method = "card";
      console.log("payment: " + payment);
      break;
    case "kakaopay":
      payment = "kakaopay";
      pay_method = "kakaopay";
      console.log("payment: " + payment);
      break;
    case "naverpay":
      payment = "naverpay";
      pay_method = "naverpay";
      console.log("payment: " + payment);
      break;
    case "payco":
      payment = "payco";
      pay_method = "card";
      console.log("payment: " + payment);
      break;
    default:
      console.log("선택된 결제 방법이 없습니다.");
      return;
  }

  IMP.request_pay(
    {
      pg: payment,
      pay_method: pay_method,
      merchant_uid: "IMP" + makeMerchantUid,
      name: merchant,
      amount: parseInt(price),
      buyer_email: "guswls9281@bitsol.kr",
      buyer_name: "아임포트 기술지원팀",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 삼성동",
      buyer_postcode: "123-456",
    },
    (rsp) => {
      console.log("rsp: " + rsp);
      if (rsp.success) {
        // axios로 HTTP 요청
        axios({
          url: `http://${window.location.hostnam}:8000/payment/redirect`,
          //   url: `http://127.0.0.1:8000/payment/redirect`,
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          },
        }).then((data) => {
          // 서버 결제 API 성공시 로직
          console.log("결제 성공 : ", data);
        });
      } else {
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    }
  );
}
