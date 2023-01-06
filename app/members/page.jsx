import "./style.css";

export default async function Members() {
  const res = await fetch(`${process.env.BACKEND_URL}member/getall`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return (
    <div className='frame w-full flex flex-col items-start justify-center'>
      <div className='w-full overflow-auto'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Colleage</th>
              <th>Specialty</th>
              <th>Phonenum</th>
              <th>Research</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.colleage}</td>
                <td>{item.specialty}</td>
                <td>{item.phonenum}</td>
                <td>{item.research}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
