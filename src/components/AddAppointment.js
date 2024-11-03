import { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";

const AddAppointment = ({ onSendAppointment, lastId }) => {
  const clearData = {
    petName: "",
    ownerName: "",
    aptNotes: "",
    aptDate: "",
    aptTime: "",
  };
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState(clearData);

  const formDataPosted = () => {
    if (formData.petName && formData.ownerName && formData.aptDate) {
      const appointmentInfo = {
        id: lastId + 1,
        petName: formData.petName,
        ownerName: formData.ownerName,
        aptNotes: formData.aptNotes,
        aptDate: `${formData.aptDate} ${formData.aptTime}`,
      };
      onSendAppointment(appointmentInfo);
      setFormData(clearData);
      setToggleForm(!toggleForm);
    } else {
      alert("Please fill in the required fields.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setToggleForm(!toggleForm)}
        className={`bg-brown-500 text-beige-100 px-2 py-3 w-full text-left ${toggleForm ? "rounded-t-md" : "rounded-md"}`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top" /> Add Appointment
        </div>
      </button>
      {toggleForm && (
        <div className="border border-brown-300 rounded-b-md p-4 bg-beige-100">
          {["ownerName", "petName", "aptDate", "aptTime", "aptNotes"].map((field, index) => (
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start py-2" key={index}>
              <label htmlFor={field} className="text-sm font-medium text-brown-700">{field}</label>
              <input
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                value={formData[field]}
                id={field}
                name={field}
                className="block w-full shadow-sm text-sm border-brown-200 rounded-md"
                placeholder={`Enter ${field}`}
                required={["ownerName", "petName", "aptDate"].includes(field)}
                type={field.includes("Date") ? "date" : field.includes("Time") ? "time" : "text"}
              />
            </div>
          ))}
          <button
            type="submit"
            onClick={formDataPosted}
            className="mt-3 bg-brown-600 text-beige-100 px-4 py-2 rounded-md hover:bg-brown-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;
