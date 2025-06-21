function generatePaymentReference() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return `PAY${timestamp}${randomNum}`;
}

export default generatePaymentReference;
