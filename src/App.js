import { BiCalendar } from "react-icons/bi";
import { useEffect, useState, useCallback } from "react";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Search from "./components/Search";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointment = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    setAppointmentList([]); // Clear pre-existing appointments
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-light text-brown-900 bg-beige-100 p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-brown-700">
        <BiCalendar className="inline-block text-brown-500 mr-2" />
        Pet Appointments
      </h1>
      <AddAppointment
        onSendAppointment={(appointment) => {
          setAppointmentList([...appointmentList, appointment]);
        }}
        lastId={appointmentList.reduce(
          (pre, curr) => (Number(curr.id) > pre ? Number(curr.id) : pre),
          0
        )}
      />
      <Search
        query={query}
        onQueryChange={(event) => setQuery(event.target.value)}
        orderBy={orderBy}
        onOrderByChange={(val) => setOrderBy(val)}
        sortBy={sortBy}
        onSortBYChange={(val) => setSortBy(val)}
      />
      <ul className="divide-y divide-brown-300 mt-6">
        {filteredAppointment.map((appointment) => (
          <AppointmentInfo
            onDeleteAppointment={(appointmentId) => {
              setAppointmentList(
                appointmentList.filter((appointment) => appointmentId !== appointment.id)
              );
            }}
            appointment={appointment}
            key={appointment.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
