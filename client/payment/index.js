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

var today = new Date();
var hours = today.getHours(); // 시
var minutes = today.getMinutes(); // 분
var seconds = today.getSeconds(); // 초
var milliseconds = today.getMilliseconds();
var makeMerchantUid = hours + minutes + seconds + milliseconds;

async function requestPay(event) {
  event.preventDefault();
  if (window == "undefined" && window.IMP == "undefined") {
    console.alert("imp가 없습니다");
    alert("error: imp가 없습니다");
    return;
  }
  var IMP = window.IMP;
  IMP.init("imp67011510");

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
  // 우선, 결제 정보 검증
  const merchant_uid = "IMP" + makeMerchantUid;
  await fetch(`https://api.iamport.kr/payments/prepare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_uid: merchant_uid,
      amount: parseInt(price),
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      console.log("사전검사 데이터 : ", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  IMP.request_pay(
    {
      pg: payment,
      pay_method: pay_method,
      merchant_uid: merchant_uid,
      name: merchant,
      amount: parseInt(price),
      buyer_email: "guswls9281@bitsol.kr",
      buyer_name: "아임포트 기술지원팀",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 삼성동",
      buyer_postcode: "123-456",
    },
    (rsp) => {
      console.log(`rsp: ${rsp}`);
      console.log(rsp);

      if (rsp.success) {
        // iframe으로 결제장 결과처리 fetch로 HTTP 요청
        //   url: `http://127.0.0.1:8000/payment/redirect`,
        fetch(`http://${window.location.hostname}:8000/payment/redirect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            pg: rsp.pg_provider,
            pay_method: rsp.pg_type,
            name: rsp.name,
            amount: parseInt(price),
            buyer_email: rsp.buyer_email,
            buyer_name: rsp.buyer_name,
            buyer_tel: rsp.buyer_tel,
            buyer_postcode: rsp.buyer_postcode,
            status: rsp.status,
          }),
        })
          .then((response) => {
            response.json();
          })
          .then((data) => {
            // 서버 결제 API 성공시 로직
            console.log("결제 성공 : ", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      }
    }
  );
}
