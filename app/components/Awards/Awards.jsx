import AwardsClient from "./AwardsClient";

async function fetchData() {
  const res = await fetch(`${process.env.BACKEND_URL}api/achievement`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export default async function Awards() {
  const awardsData = await fetchData();

  return <AwardsClient awardsData={awardsData.data} />;
}
