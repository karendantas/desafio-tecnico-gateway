export function listingTypeTranslate(listingType: "RENT" | "SALE") {
  if (listingType === "RENT") return "Alugada";
  else return "Á venda";
}
