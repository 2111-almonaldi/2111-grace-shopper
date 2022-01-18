export default function formatPrice(num) {
  return "$" + Number(num.toFixed(2)).toLocaleString() + " ";
}
