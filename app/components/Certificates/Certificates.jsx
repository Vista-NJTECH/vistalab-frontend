import CertificatesClient from "./CertificatesClient";

async function fetchData() {
  const res = await fetch(`${process.env.BACKEND_URL}api/getcert`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export default async function Awards() {
  const certificatesData = await fetchData();

  return <CertificatesClient certificatesData={certificatesData} />;
}
