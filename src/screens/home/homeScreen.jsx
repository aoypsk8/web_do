import React from 'react';
import { Ripple } from 'primereact/ripple'; // PrimeReact Ripple effect

function HomeScreen({ onItemSelect }) {
  const items = [
    {
      label: "ການບໍລິການທາງຮ້ານ",
      items: [
        {
          label: "ຂາຍຫນ້າຮ້ານ",
          icon: "pi pi-arrow-circle-down",
          route: "sellFront",
        },
        {
          label: "ລາຍການສັ່ງຊື້",
          icon: "pi pi-arrow-circle-up",
          route: "listOrder",
        },
        {
          label: "ປະຫວັດການຂາຍ",
          icon: "pi pi-user",
          route: "historySold",
        },
      ],
    },
    {
      label: "ລາຍງານ",
      items: [
        {
          label: "ລາຍງານປະຫວັດການຂາຍ",
          icon: "pi pi-chart-pie",
          route: "report-history",
        },
        {
          label: "ລາຍງານລາຍຮັບ",
          icon: "pi pi-chart-pie",
          route: "report-in",
        },
        {
          label: "ລາຍງານລາຍຈ່າຍ",
          icon: "pi pi-chart-pie",
          route: "report-out",
        },
      ],
    },
  ];

  const handleCommand = (route) => {
    if (route) {
      onItemSelect(route); // Call the callback function with the route
    }
  };

  return (
    <div className="admin-menu mx-auto my-10 flex flex-col items-center w-full lg:w-800px px-72">
      {items.map((item, mainIndex) => (
        <div key={mainIndex} className="w-full px-4">
          <h3>{item.label}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-3 ">
            {item.items.map((subItem, subIndex) => (
              <div
                key={subIndex}
                onClick={() => handleCommand(subItem.route)}
                role="button"
                className="relative py-4 px-6 flex flex-col gap-3 select-none border-solid border-1px border-w-blue/50  
                hover:bg-w-blue/5 hover:shadow-lg hover:-translate-y-2 transition-translate duration-0.5s active:translate-y-0
                rounded-xl border border-ggColor"
              >
                <i className={`pi ${subItem.icon} text-w-blue`} style={{ fontSize: '42px' }} />
                <span>{subItem.label}</span>
                <Ripple />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeScreen;
