import "../../statics/table.css";

export default async function Members() {
  const res = await fetch("http://124.223.196.177:8181/api/member");
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return (
    <div className='frame flex flex-col items-center justify-center'>
      <table className='table'>
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
          {data.data.map((item) => (
            <tr key={item.id}>
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
  );
}
