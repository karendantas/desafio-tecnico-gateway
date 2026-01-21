export function formatMoneyBR(value: number | string) {
  const number =
    typeof value === "string" ? Number(value.replace(/\D/g, "")) / 100 : value;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
