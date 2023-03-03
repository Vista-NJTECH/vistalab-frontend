import { Head, Awards, Stacks, Certificates, Activities } from "./components";

async function fetchData(path) {
  const res = await fetch(`${process.env.BACKEND_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export default async function Page() {
  const paths = ["api/achievement", "api/getcert"];
  const [awardsData, certificatesData] = await Promise.all(paths.map((item) => fetchData(item)));

  return (
    <div className='flex flex-col'>
      <Head />
      <Awards awardsData={awardsData.data} />
      <Certificates certificatesData={certificatesData} />
      <Stacks />
      <Activities />
    </div>
  );
}
