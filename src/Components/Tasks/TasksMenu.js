import React, { createRef, useEffect } from "react";

function TasksMenu({ selected, setSelected }) {
  const menuItems = [
    { name: "Due Today", id: 0 },
    { name: "Upcoming", id: 1 },
    { name: "Overdue", id: 2 },
  ];

  const underlineRef = createRef();
  useEffect(() => {
    const underlineElement = underlineRef.current;
    if (underlineElement) {
      const newPosition = `${selected * (100 / menuItems.length)}%`;
      underlineElement.style.marginLeft = newPosition;
    }
  }, [selected]);
  return (
    <div
      className={
        "absolute top-0 left-0 right-0 h-[80px] bg-gray-100 border-grey border-b-[1px] "
      }
    >
      <div className="flex justify-around items-center h-full">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 h-full justify-center cursor-pointer"
            onClick={() => setSelected(item.id)}
          >
            <p className={selected === item.id ? "text-l font-bold" : "text-l"}>
              {item.name}
            </p>
          </div>
        ))}
        <div className="absolute bottom-0 right-0 left-0 bg-gray-200 h-1">
          <div
            ref={underlineRef}
            className={` w-1/3 h-1 bg-gray-600 transition-all`}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksMenu;
