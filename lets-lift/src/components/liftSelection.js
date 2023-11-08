
import { useState } from "react";


const muscles = [
  "Back",
  "Abs",
  "Quads",
  "Hamstrings",
  "Biceps",
  "Triceps",
  "Shoulders",
  "Calves",
  "Chest",
];
// Import the useRouter hook

//create state
// track state of selected lifts
//track state of location
export default function LiftSelection({ setSelected: setSelectedFromProps }) {
  const [selected, setSelected] = useState([]);
  const setter = (selected) => {
    setSelectedFromProps(selected);
    setSelected(selected);
  };
  return (
    <div>
      <div className="grid grid-cols-3 max-w-sm bg-gray-900 ">
        {muscles.map((muscle) => (
          <LiftSelectorButton
            key={muscle}
            muscle={muscle}
            selected={selected}
            setSelected={setter}
          />
        ))}
      </div>
    </div>
  );
}

function LiftSelectorButton({ muscle, selected, setSelected }) {
  const selectedClass = selected.includes(muscle)
    ? "bg-blue-300 text-gray-900 border-blue-300"
    : "bg-gray-900 text-blue-300 border-gray-900";
  return (
      <button
        onClick={() => {
          if (selected.includes(muscle)) {
            setSelected(selected.filter((item) => item !== muscle));
          } else {
            setSelected([...selected, muscle]);
          }
        }}
        className={
          "cursor-pointer  border-2 py-3 px-6 font-bold transition-colors duration-900 ease-in-out " +
          selectedClass
        }
      >
        {muscle}
      </button>
  );
}
