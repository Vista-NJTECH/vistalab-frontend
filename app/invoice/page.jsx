import "../../statics/table.css";

export default async function Page() {
  const res = await fetch("http://124.223.196.177:8181/api/allinvoice");
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return (
    <div className='frame flex flex-col items-center justify-center'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoicename</th>
            <th>Applicant</th>
            <th>Amount</th>
            <th>Remark</th>
            <th>Category</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.invoicename}</td>
              <td>{item.applicant}</td>
              <td>{item.amount}</td>
              <td>{item.remark}</td>
              <td>{item.category}</td>
              <td>{item.time}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
